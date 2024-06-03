import React from 'react';
import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react';
import FriendCard from './FriendCard';

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
