import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import useProfileLoading from './useProfileLoading';
import ProfilePosts from './ProfilePosts';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';




function ProfilePage() {
    const { profile } = useParams();
    const navigate = useNavigate();
    const { profileData } = useProfileLoading({ profile });
    const { user, token } = useAuth();
    const toast = useToast();
    const [FollowersNumber, setFollowersNumber] = useState(0);
    const [FollowingNumber, setFollowingNumber] = useState(0);
    const [PostsNumber, setPostsNumber] = useState(0);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    // useEffect(() => {      /////////////////////////////BIG ERROR//////////////////////////
    //     if (profile !== user) {
    //         const fetchFollower = async () => {
    //             try {
    //                 const response = await ApiCalls.get(`/profiles/${profile}/followers/${user}`);
    //                 const data = await response.json();
    //                 setIsFollowing(data?.username === profile);
    //             } catch (error) {
    //                 console.error('Error:', error);
    //             }
    //         };
    //         fetchFollower();
    //     }
    // }, [profile, user]);


    useEffect(() => {
        console.log("profile " + profile);
        console.log("user " + user);
        if (profile === user) {
            setIsOwner(true);
        }
    }, [profile, user]);

    function handleBackgroundChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        ApiCalls.post(`/profiles/${profile}/backgroundImg`, formData, {
        })
            .then(response => {
                toast({
                    title: 'Background Image Updated.',
                    description: 'What a nice background!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error Updating Background Image.',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }


    function handleAddFollower() {
        const postData = { username: user };

        ApiCalls.post(`/profiles/${profile}/followers`, postData)
            .then(response => {
                setIsFollowing(true);
                toast({
                    title: 'Following user.',
                    description: 'You are now following the user.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error Following User.',
                    description: 'Unable to follow the user at this time.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }
    function handleProfilePicChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        ApiCalls.post(`/profiles/${profile}/profilePic`, formData, {
        })
            .then(response => {
                toast({
                    title: 'Profile Picture Updated.',
                    description: 'What a nice background!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error Updating Profile Picture.',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }

    useEffect(() => {
        const fetchFollowers = async () => {
            if (profileData?._links?.followers?.href) {
                try {
                    const response = await ApiCalls.get(profileData._links.followers.href);
                    const data = response.data;
                    setFollowersNumber(data.page.totalElements);
                } catch (error) {
                    console.error("Failed to fetch followers:", error);
                }
            }
        };

        fetchFollowers();
    }, [user, profileData]);

    useEffect(() => {
        const fetchFollowing = async () => {
            if (profileData?._links?.following?.href) {
                try {
                    const response = await ApiCalls.get(profileData._links.following.href);
                    const data = response.data;
                    setFollowingNumber(data.page.totalElements);
                } catch (error) {
                    console.error("Failed to fetch following:", error);
                }
            }
        };

        fetchFollowing();
    }, [user, profileData]);

    return (
        <>
            <Card>
                <CardHeader>
                    <Box
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        overflow={'hidden'}>
                        <div style={{ position: 'relative', width: 'full', height: '200px' }}>
                            <Image
                                alt={'Profile background'}
                                h={'200px'}
                                w={'full'}
                                src={profileData && profileData.backgroundImg ? profileData.backgroundImg.fileUrl : '/images/bg.jpg'}
                                objectFit={'cover'}
                            />
                            <label style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                cursor: 'pointer'
                            }}>
                                <img src="/images/edit.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleBackgroundChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        <Flex justify={'left'} mt={-10} ml={2}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Avatar
                                    size={'2xl'}
                                    name={profileData ? profileData.name : 'No Name'}
                                    src={profileData?.profilePic?.fileUrl}
                                    alt={'Profile picture'}
                                    css={{
                                        border: '2px solid white',
                                    }}
                                />
                                <label style={{
                                    position: 'absolute',
                                    top: '0', // Adjust as needed
                                    right: '0', // Adjust as needed
                                    cursor: 'pointer',
                                    background: 'rgba(255, 255, 255, 0.8)', // Light background to highlight the icon
                                    borderRadius: '50%', // Circle around the icon
                                    padding: '5px'
                                }}>
                                    <img src="/images/edit.png" alt="Edit" style={{ width: '24px', height: '24px' }} />
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleProfilePicChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>

                        </Flex>
                        <VStack align="left" p={6} spacing={4}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {profileData ? profileData.name : 'No Name'}
                            </Heading>
                            <Text fontSize={'xl'} color={'gray.500'}>
                                @{profileData && profileData.username ? profileData.username : 'No Profession'}
                            </Text>
                            <Text fontSize={'md'} color={'gray.500'}>
                                {profileData && profileData.profession ? profileData.profession : 'No Profession'}
                            </Text>


                            <Stack direction={'row'} spacing={6}>


                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'lg'} fontWeight={600}>{PostsNumber}</Text>
                                    <Button variant='link' color={'gray.500'}
                                        onClick={() => navigate('/posts-followers-following?tab=posts')}>
                                        Posts
                                    </Button>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'lg'} fontWeight={600}>{FollowersNumber}</Text>
                                    <Button variant='link'
                                        onClick={() => navigate('/posts-followers-following?tab=followers')}>Followers</Button>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontSize={'lg'} fontWeight={600}>{FollowingNumber}</Text>
                                    <Button variant='link'
                                        onClick={() => navigate('/posts-followers-following?tab=following')}>Following</Button>
                                </Stack>
                            </Stack>
                            <Stack mt={8} direction={'row'} spacing={4} width="full">
                                {!isOwner && (
                                    <><Button

                                        fontSize={'lg'}
                                        rounded={'full'}
                                        _focus={{
                                            bg: 'gray.200',
                                        }}
                                    >
                                        Message
                                    </Button><Button
                                        fontSize={'lg'}
                                        rounded={'full'}
                                        bg={'blue.400'}
                                        color={'white'}
                                        boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                        _hover={{
                                            bg: isFollowing ? 'green.500' : 'blue.500', // Conditional hover color
                                        }}
                                        _focus={{
                                            bg: isFollowing ? 'green.500' : 'blue.500', // Conditional focus color
                                        }}

                                        onClick={handleAddFollower}
                                    >
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button></>
                                )}
                            </Stack>
                            <Stack mt={7}>
                                <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                                    About
                                </Heading>
                                <Text fontSize={'sm'}>
                                    {profileData && profileData.about ? profileData.about : ''}
                                </Text>
                            </Stack>
                        </VStack>
                    </Box>
                </CardHeader>
                <CardBody>
                    <ProfilePosts postsURI={profileData?._links?.Posts?.href} />
                </CardBody>

                <CardFooter>


                </CardFooter>
            </Card>
        </>
    );
}

export default ProfilePage;

