import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    Center
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';



export default function FriendCard({ inUser }) {

    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const toast = useToast();
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (inUser.username !== user) {
            const fetchFollower = async () => {
                try {
                    const response = await ApiCalls.get(`/profiles/${inUser.username}/follower?followerUserName=${encodeURIComponent(user)}`);
                    setIsFollowing(response.data?.username === user);
                } catch (error) {
                    //console.error('Error:', error);
                }
            };
            fetchFollower();
        }
    }, [inUser, user]);

    const toggleFollower = async () => {
        if (isFollowing)
            handleDeleteFollower();
        else
            handleAddFollower();
    }




    function handleAddFollower() {
        const follower = { username: user };

        ApiCalls.post(`/profiles/${inUser.username}/followers`, follower)
            .then(response => {
                setIsFollowing(true);
                toast({
                    title: `Following ${inUser.username}.`,
                    description: `You are now following ${inUser.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error Following ${inUser.username}.`,
                    description: `Unable to follow the ${inUser.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }

    function handleDeleteFollower() {
        const data = { deletedUser: user };

        ApiCalls.delete(`/profiles/${inUser.username}/followers`, { data: data })
            .then(response => {
                setIsFollowing(false);
                toast({
                    title: `Unfollowed ${inUser.username}.`,
                    description: `You have unfollowed ${inUser.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error unfollowing ${inUser.username}.`,
                    description: `Unable to unfollow ${inUser.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }
    return (
        <Center>
            <Box
                h={'200px'}
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                rounded={'lg'}
                overflow={'hidden'}>
                <Image
                    alt={'Profile background'}
                    h={'50px'}
                    w={'full'}
                    src={inUser && inUser.backgroundImg ? inUser.backgroundImg.fileUrl : '/images/bg.jpg'}
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-10} mb={-5}>
                    <Avatar
                        onClick={() => { navigate(`/profiles/${inUser.username}`) }}
                        size={'lg'}
                        cursor={'pointer'}
                        name={inUser ? inUser.name : 'No Name'}
                        src={inUser?.profilePic?.fileUrl}
                        alt={'Profile picture'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={1.5}>
                        <Heading fontSize={'sm'} fontWeight={500} fontFamily={'body'}>
                            {inUser.name}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'xs'}>
                            {inUser.profession}
                        </Text>
                    </Stack>

                    

                    <Stack mt={6} direction={'row'} spacing={4} width="full" paddingLeft={8}>

                        <Button
                            size={'sm'}

                            fontSize={'xs'}
                            rounded={'full'}
                            _focus={{
                                bg: 'gray.200',
                            }}
                            onClick={() => navigate(`/messages/${inUser.username}`)}
                        >
                            Message
                        </Button>
                        <Button
                            size={'sm'}
                            fontSize={'xs'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            _hover={
                                {
                                    bg: isFollowing ? 'Red' : 'blue.700',
                                }}
                            onClick={toggleFollower}
                        >
                            {isHovering ? (isFollowing ? 'Unfollow' : 'Follow') : (isFollowing ? 'Following' : 'Follow')}
                        </Button>
                    </Stack>

                </Box>
            </Box>
        </Center>
    );
}
