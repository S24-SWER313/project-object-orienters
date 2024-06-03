import React from 'react';
import { Avatar, Box, Text, Button, VStack, HStack } from "@chakra-ui/react";

function Comment() {
    return (
        <Box w={'380px'} shadow={'md'}>
          <HStack spacing={4} align="top" p={3}>
            <Avatar size="sm" name='' src=''/>
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">Name Commenter</Text>
              <Text fontSize="sm">Comment data</Text>
              <Button variant="link" size="sm">
                Edit
              </Button>
            </VStack>
          </HStack>
        </Box>
      );
}

export default Comment;
