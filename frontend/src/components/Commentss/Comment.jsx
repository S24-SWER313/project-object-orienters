import React from 'react';
import { Avatar, Box, Text, Button, VStack, HStack, useToast } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';
import ApiCalls from '../ApiCalls';

 function Comment({ comment, deleteFunction, editMode }) {
  const { user } = useAuth();
  console.log(comment);


  return (
    <Box w={'380px'} shadow={'md'}>
      <HStack spacing={4} align="top" p={3}>
        <Avatar size="sm" name={comment.contentAuthor?.name} src={comment.contentAuthor?.profilePic?.fileUrl} />
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{comment.contentAuthor?.name}</Text>
          <Text fontSize="sm">{comment.textData}</Text>
        </VStack>
        {comment?.contentAuthor?.username == user && <Button onClick={deleteFunction}>Delete</Button>}
        {comment?.contentAuthor?.username == user && <Button onClick={()=>{editMode(comment)}}>Edit</Button>}
      </HStack>
    </Box>
  );
}

export default Comment;
