import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Assuming FriendCard, ApiCalls, and useAuth are defined elsewhere, import them:
import FriendCard from './FriendCard';
import ApiCalls from './ApiCalls';
import { useAuth } from './AuthProvider';

// Arrow component for fixed positioning
const Arrow = ({ direction, onClick, disabled }) => {
    const icon = direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />;
    const position = direction === 'left' ? { left: '1px' } : { right: '1px' };

    return (
        <IconButton
            icon={icon}
            onClick={onClick}
            disabled={disabled}
            isRound
            m="2"
            aria-label={`Scroll ${direction}`}
            position="absolute"
            {...position}
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
        />
    );
};

const LeftArrow = ({ onClick }) => (
    <Arrow direction="left" onClick={onClick} />
);

const RightArrow = ({ onClick }) => (
    <Arrow direction="right" onClick={onClick} />
);

function FriendsList() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const menuRef = useRef(null);

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

    const scrollLeft = () => {
        if (menuRef.current) {
            menuRef.current.scrollLeft -= 300;
        }
    };

    const scrollRight = () => {
        if (menuRef.current) {
            menuRef.current.scrollLeft += 300;
        }
    };

    const MenuItem = ({ user, itemId }) => (
        <Box
            rounded={'lg'}
            key={itemId}
            p={1}
            mx="2"
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            w={'200px'}
            flex="0 0 auto"
        >
            <FriendCard inUser={user} />
        </Box>
    );

    if (users.length === 0) return null; // This will not render anything if there are no users

    return (
        <Box
            w={[0.88, 0.9, 0.8]} maxW={550}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="white"
            boxShadow="lg"
            rounded="lg"
            m="2"
            p="4"
            h='301px'
            overflow="hidden"
            position="relative"
        >
            <Heading size="md" alignSelf="flex-start" mb="4">Followers Suggestions</Heading>
            <Flex alignItems="center" justifyContent="center" w="full" position="relative" overflowX="hidden">
                <LeftArrow onClick={scrollLeft} />
                <Box ref={menuRef} style={{ display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth', width: '100%' }}>
                    {users.map((user, index) => (
                        <MenuItem user={user} itemId={`user-${index}`} key={index} />
                    ))}
                </Box>
                <RightArrow onClick={scrollRight} />
            </Flex>
        </Box>
    );
}

export default FriendsList;
