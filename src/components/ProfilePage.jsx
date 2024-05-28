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
import { useAuth } from './AuthProvider';




function ProfilePage({followerNumber}) {
    const { profile } = useParams();
    const navigate = useNavigate();
    const { profileData } = useProfileLoading({ profile });
    const { user, token } = useAuth();
    const toast = useToast();
    const [followers, setFollowers] = useState();
    const [FollowersNumber, setFollowersNumber] = useState(0);
    const [following, setFollowing] = useState();
    const [FollowingNumber, setFollowingNumber] = useState(0);
    const [posts, setPosts] = useState();
    const [PostsNumber, setPostsNumber] = useState(0);

    function handleBackgroundChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:8080/profiles/${profile}/backgroundImg`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
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
            });
    }

    function handleProfilePicChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:8080/profiles/${profile}/profilePic`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                toast({
                    title: 'Profile Picture Updated.',
                    description: 'What a nice picture!',
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
                    //description: 'What a nice picture!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    }

    useEffect(() => {
        if (profileData?._links?.followers?.href) {
            fetch(profileData._links.followers.href, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data._embedded?.profileList) {
                        setFollowers(data._embedded.profileList);
                    }
                    setFollowersNumber(data.page.totalElements);
                })
                .catch((error) => {
                    console.error("Failed to fetch followers:", error);
                });
        }
    }, [user, profileData]);

    useEffect(() => {
        if (profileData?._links?.Posts?.href) {
            fetch(profileData._links.Posts.href, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data._embedded?.postList) {
                        setPosts(data._embedded.postList);
                    }
                    setPostsNumber(data.page.totalElements);
                })
                .catch((error) => {
                    console.error("Failed to fetch posts:", error);
                });
        }
    }, [user, profileData]);


    useEffect(() => {
        if (profileData?._links?.following?.href) {
            fetch(profileData._links.following.href, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data._embedded?.profileList) {
                        setFollowing(data._embedded.profileList);
                    }
                    setFollowingNumber(data.page.totalElements);
                })
                .catch((error) => {
                    console.error("Failed to fetch following:", error);
                });
        }
    }, [user, profileData]);




    return (
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
                            <Button

                                fontSize={'lg'}
                                rounded={'full'}
                                _focus={{
                                    bg: 'gray.200',
                                }}
                                onClick={console.log(FollowersNumber)}>
                                Message
                            </Button>
                            <Button
                                fontSize={'lg'}
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                _focus={{
                                    bg: 'blue.500',
                                }}>
                                Follow
                            </Button>
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

            </CardBody>

            <CardFooter>


            </CardFooter>
        </Card>

    );
}

export default ProfilePage;

