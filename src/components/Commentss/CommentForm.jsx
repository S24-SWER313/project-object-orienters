import React from 'react';
import {
  Button,
  Box,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import Comment from "../Commentss/Comment";

export default function CommentForm() {
  async function AddComment() {
    // Example: POST to backend to add a comment
  }

  return (
    <Flex
      h={'90vh'}
      align={'center'}
      justify={'center'}
      bg={'blue.900'}
      p={'10px'}>

      <Box
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>

        {/* Scrollable area for comments */}
        <VStack
          spacing={4}
          overflowY="scroll" // Enables vertical scrolling
          maxH="60vh" // Maximum height before scrolling
          pr={2} // Right padding to avoid scrollbar overlay on content
          w="full">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </VStack>

        {/* Divider to visually separate comments from the form */}
        <Box py={4}>
          <hr />
        </Box>

        {/* Form for adding a new comment */}
        <Stack
          spacing={4}
          align={'flex-end'}
          direction={['row']}>

          <Input
          w={'75%'}
            placeholder="Write a comment..."
            _placeholder={{ color: 'gray.500' }}
            type="text"
            // onChange={e => setCommentText(e.target.value)}
          />

          <Button
            bg={'blue.400'}
            color={'white'}
            w="25%"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={AddComment}>
            Add
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
