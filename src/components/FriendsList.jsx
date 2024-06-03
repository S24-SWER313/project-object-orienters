
import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Flex, IconButton, Stack, StackDivider } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Assuming FriendCard, ApiCalls, and useAuth are defined elsewhere, import them:
import FriendCard from './FriendCard';
import ApiCalls from './ApiCalls';
import { useAuth } from './AuthProvider';


function FriendsList() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiCalls.get(`/feed?feedType=MUTUAL_FOLLOWING&value=${user}&offset=0&limit=10`);
                const data = response.data;
                if (data._embedded?.profileList) {
                    setUsers(data._embedded.profileList);
                }
            } catch (error) {
                console.error("Failed to fetch suggestions");
            }
        };
        fetchUsers();
    }, [user]);

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
                    <FriendCard key={`user-${index}`} inUser={user} />
                ))}
            </Stack>

        </Box>
    );
}

export default FriendsList;
