import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { useToast,Box, VStack, Flex } from "@chakra-ui/react";

const Comments = ({currentUserId }) => {
  const toast = useToast(); 
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
  
    if (true) { //window.confirm("Are you sure you want to remove this comment?")
      deleteCommentApi(commentId)
        .then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
          toast({
            title: 'Comment deleted successfully.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top', 
          });
        })
        .catch((error) => {
          // Handling errors if the API call fails
          toast({
            title: 'Failed to delete comment.',
            description: `Error: ${error.message}`,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
        });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (

    <Flex className="comments">
    
        <VStack>
      {/* <h3 className="comments-title">Comments</h3> */}
      <Box className="comment-form-title"></Box>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <Box className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </Box>
      </VStack>
    </Flex>  
 

    
  );
};

export default Comments;