import { useState, useContext, useEffect } from 'react';
import { Button, Textarea, Box, useToast } from '@chakra-ui/react';
import { CommentsContext } from './CommentsContext';

const CommentForm = ({
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {



  const { currentCommentText, setCurrentCommentText } = useContext(CommentsContext);
  const handleSubmit = () => { };
  


  const isTextareaDisabled = currentCommentText.length === 0;
  const toast = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isTextareaDisabled) {
      handleSubmit(currentCommentText);
      setCurrentCommentText("");
      toast({
        title: 'Comment created successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Textarea
        placeholder="Write your comment..."
        value={currentCommentText}
        onChange={(e) => setCurrentCommentText(e.target.value)}
        size="sm"
        resize="vertical"
        mb={2}
      />
      <Button
        colorScheme="blue"
        mr={3}
        type="submit"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </Button>
      {hasCancelButton && (
        <Button
          colorScheme="red"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default CommentForm;
