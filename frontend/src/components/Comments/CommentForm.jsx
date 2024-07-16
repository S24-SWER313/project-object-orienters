import { useState, useContext, useEffect } from 'react';
import { Button, Textarea, Box, useToast } from '@chakra-ui/react';
import { CommentsContext } from './CommentsContext';
import { set } from 'firebase/database';
import ApiCalls from '../ApiCalls';
import { useAuth } from '../AuthProvider';

const CommentForm = ({
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {



  const { currentCommentText, setcurrentCommentText, setBackendComments, backendComments } = useContext(CommentsContext);
  const [inputValue, setInputValue] = useState("");

  const { postId } = useContext(CommentsContext);
  const { user } = useAuth();

  const isTextareaDisabled = inputValue.length === 0;
  const toast = useToast();

  const onSubmit = (event) => {
    console.log("eee")
    event.preventDefault();
    if (!isTextareaDisabled) {
      console.log("iffffffffff")

      setcurrentCommentText(inputValue);
      let newcom = addComment();
      setBackendComments(() => [...backendComments, newcom]);

      setInputValue("");

      console.log("inputValue" + inputValue);
      toast({
        title: 'Comment created successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };


  const addComment = () => {

    console.log('adding comments')

    const createComment = async (contentID, text, commenter) => {
      console.log(text + "texttttttt");
      const url = `http://localhost:8080/content/${contentID}/comments`;
      const formData = new FormData();
      formData.append('text', text);
      formData.append('commenter', commenter);

      try {
        const response = await ApiCalls.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("comment create");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }

    };

    console.log(createComment(postId, inputValue, user));

  };

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Textarea
        placeholder="Write your comment..."
        value={inputValue}
        onChange={(e) => { setInputValue(() => e.target.value); }}
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
