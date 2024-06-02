import { useState } from 'react';
import { Button, Textarea, Box, useToast } from '@chakra-ui/react';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const toast = useToast(); 

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isTextareaDisabled) {
      handleSubmit(text);
      setText("");
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
        value={text}
        onChange={(e) => setText(e.target.value)}
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
