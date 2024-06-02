import { Avatar, Box, Text, Button, VStack, HStack,Flex } from "@chakra-ui/react";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <Box key={comment.id} p={4}>
      <HStack spacing={4}>
        <Avatar size="sm" name={comment.username} />
        <Text fontWeight="bold">{comment.username}</Text>
        <VStack align="start">     
          <Text fontSize="sm">{createdAt}</Text>
        </VStack>
      </HStack>
      <Box mt={2}>
        {!isEditing && <Text>{comment.body}</Text>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <HStack spacing={2} mt={2}>
          {canReply && (
            <Button variant='link' size="sm" onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>
              Reply
            </Button>
          )}
          {canEdit && (
            <Button variant='link' size="sm" onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>
              Edit
            </Button>
          )}
          {canDelete && (
            <Button variant='link' size="sm" colorScheme="red" onClick={() => deleteComment(comment.id)}>
              Delete
            </Button>
          )}
        </HStack>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
      </Box>
      <Flex justifyContent="flex-start" alignItems="flex-start" mt={4}>
        {replies.length > 0 && (
          <VStack align="start">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </VStack>
        )}
      </Flex>
    </Box>
  );
  
};

export default Comment;
