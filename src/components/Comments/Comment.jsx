import { Avatar, Box, Text, Button, VStack, HStack, Flex, Toast } from "@chakra-ui/react";
import CommentForm from "./CommentForm";
import { useAuth } from "../AuthProvider";
import { useContext, useEffect, useState } from "react";
import useCommentsLoading from "./useCommentsLoading";
import ApiCalls from "../ApiCalls";
import { CommentsContext } from "./CommentsContext";
import { ConstructionOutlined } from "@mui/icons-material";

const Comment = ({
  comment,
  // replies,
  setActiveComment,
  activeComment,
  updateComment,
  addComment,
  parentId = null,
  // fetchReplies,
}) => {
  const { user } = useAuth();

  const isEditing =
    activeComment &&
    activeComment.contentID === comment.contentID &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.contentID === comment.contentID &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.timestamp) > fiveMinutes;
  const canReply = Boolean(user);
  const canEdit = user === comment.contentAuthor.username && !timePassed;
  const replyId = parentId ? parentId : comment.contentID;
  const createdAt = new Date(comment.timestamp).toLocaleDateString();
  const { postId } = useContext(CommentsContext);
  const comentId = comment.contentID;
  const canDelete = comment.contentAuthor.username == user;
  const { commentsList } = useCommentsLoading({ contentId: comentId });

  const [replies, setReplies] = useState(commentsList);


  useEffect(() => {
    if (commentsList) {
      setReplies(commentsList);
    }
  }, [commentsList, setReplies]);



  // useEffect(() => {
  //   commentsList(comment.contentID);
  // }, [comment.contentID, fetchReplies]);

  const deleteComment = async function () {
    console.log(`/content/${postId}/comments/${comment.contentID}`);
    let url = `content/${postId}/comments/${comment.contentID}`
    const response = await ApiCalls.delete(url);
    console.log(response.data);
    Toast({
      title: "Comment deleted successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

  }

  return (
    <Box key={comment.contentID} p={4}>
      <HStack spacing={4}>
        <Avatar size="sm" name={comment.contentAuthor.name} />
        <Text fontWeight="bold">{comment.contentAuthor.name}</Text>
        <VStack align="start">
          <Text fontSize="sm">{createdAt}</Text>
        </VStack>
      </HStack>
      <Box mt={2}>
        {!isEditing && <Text>{comment.textData}</Text>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.textData}
            handleSubmit={(text) => updateComment(text, comment.contentID)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <HStack spacing={2} mt={2}>
          {canReply && (
            <Button variant="link" size="sm" onClick={() => setActiveComment({ id: comment.contentID, type: "replying" })}>
              Reply
            </Button>
          )}
          {canEdit && (
            <Button variant="link" size="sm" onClick={() => setActiveComment({ id: comment.contentID, type: "editing" })}>
              Edit
            </Button>
          )}
          {canDelete && <Button variant="link" size="sm" colorScheme="red" onClick={() => deleteComment(comentId)}>
            Delete
          </Button>}
        </HStack>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
      </Box>
      <Flex justifyContent="flex-start" alignItems="flex-start" mt={4}>
        {replies && replies.length > 0 && (
          <VStack align="start">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.contentID}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                // deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.contentID}
              // replies={replies}
              // fetchReplies={fetchReplies}
              />
            ))}
          </VStack>
        )}
      </Flex>
    </Box>
  );
};

export default Comment;
