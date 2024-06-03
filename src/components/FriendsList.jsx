
import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Flex, IconButton, Stack, StackDivider } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Assuming FriendCard, ApiCalls, and useAuth are defined elsewhere, import them:
import FriendCard from './FriendCard';
import ApiCalls from './ApiCalls';
import { useAuth } from './AuthProvider';


function FriendsList({ users }) {
    return (
        <Box
            bg="white"
            boxShadow="lg"
            rounded="lg"
            // m="2"
            p="2"
            w="280px"
            h="auto"
            overflow="hidden"
        >
            <Heading size="md" mb="4">Friends Suggestions</Heading>
            <Stack
                divider={<StackDivider borderColor="gray.400" />}
                spacing={4}
            >
                {users.map((user, index) => (
                    <FriendCard key={`user-${index}`} {...user} />
                ))}
            </Stack>

        </Box>
    );
}

export default FriendsList;
