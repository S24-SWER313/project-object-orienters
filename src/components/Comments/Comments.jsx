import { useState, useEffect, useContext, useCallback } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { useToast, Box, VStack, Flex } from "@chakra-ui/react";
import { CommentsContext } from "./CommentsContext";

const Comments = () => {
  const toast = useToast();
  const { backendComments, setBackendComments } = useContext(CommentsContext);
  const [activeComment, setActiveComment] = useState(null);
  const { postId } = useContext(CommentsContext);

  const [replies, setReplies] = useState({});

  useEffect(() => {
    getCommentsApi(postId).then((data) => {
      setBackendComments(data);
    });
  }, [postId]);

  const getReplies = useCallback(async (commentId) => {
    if (!replies[commentId]) {
      const data = await getCommentsApi(commentId);
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: data,
      }));
    }
  }, [replies]);

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
      if (parentId) {
        getReplies(parentId); // Refresh replies for the parent comment
      }
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.contentID === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    deleteCommentApi(commentId)
      .then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.contentID !== commentId
        );
        setBackendComments(updatedBackendComments);
        toast({
          title: "Comment deleted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to delete comment.",
          description: `Error: ${error.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Flex className="comments">
      <VStack>
        <Box className="comment-form-title"></Box>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        <Box className="comments-container">
          {backendComments.map((rootComment) => (
            <Comment
              key={rootComment.contentID}
              comment={rootComment}
              replies={replies[rootComment.contentID] || []}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              fetchReplies={getReplies}
            />
          ))}
        </Box>
      </VStack>
    </Flex>
  );
};

export default Comments;
