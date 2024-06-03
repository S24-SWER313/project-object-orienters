import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  VStack,useToast
} from '@chakra-ui/react';
import Comment from "../Commentss/Comment";
import ApiCalls from '../ApiCalls';
import { useAuth } from '../AuthProvider';

export default function CommentForm({ post }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const { user } = useAuth();
  const toast = useToast();
  async function getComments() {
    try {
      const response = await ApiCalls.get(post._links.comments.href);
      const data = response.data;
      setComments(data?._embedded?.commentList);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }

  async function addComment() {
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('commenter', user);
      const response = await ApiCalls.post(post._links.comments.href, formData);
      const data = response.data;
      console.log("data from frontend" + data);
      toast({
        title: 'Comment Added Successfully!',
        description: "Comment Added .",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: `top`
    });
      
    } catch (error) {
      toast({
        title: 'Error Occured.',
        description: "Unable to add comment at this time.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: `top`
    });
    }
  }



  // Fetch comments when the component mounts
  useEffect(() => {
    getComments();
  }, [post]);

  return (
    <Flex
      h={'90vh'}
      align={'center'}
      justify={'center'}
      p={'10px'}>

      <Box
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>

     
        <VStack
          spacing={4}
          overflowY="scroll" 
          maxH="60vh"
          pr={2} 
          w="full">
          {comments.map((comment) => (
            <Comment key={comment.contentID} comment={comment} />
          ))}
        </VStack>

    
        <Box py={4}>
          <hr />
        </Box>


        <Stack
          spacing={4}
          align={'flex-end'}
          direction={['row']}>

          <Input
            w={'75%'}
            placeholder="Write a comment..."
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={e => setText(e.target.value)}
          />

          <Button
            bg={'blue.400'}
            color={'white'}
            w="25%"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={()=> addComment()}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
