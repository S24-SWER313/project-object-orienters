import React from 'react';
import { Avatar, Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';

function Comment({ comment }) {
  return (
    <Box w={'380px'} shadow={'md'}>
      <HStack spacing={4} align="top" p={3}>
        <Avatar size="sm" name={comment.contentAuthor?.name} src={comment.contentAuthor?.profilePic?.fileUrl} />
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{comment.contentAuthor?.name}</Text>
          <Text fontSize="sm">{comment.textData}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default Comment;
