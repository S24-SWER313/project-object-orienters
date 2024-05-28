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




function ProfilePage({ backgroundImage, followers, following, posts }) {
    const { profile } = useParams();
    const navigate = useNavigate();
    console.log("Profile Page is rendering");
    console.log("Profile: ppjsx", profile);
    const { profileData } = useProfileLoading({ profile});
    const { user, token } = useAuth();
    const toast = useToast();
  

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
        });
    }
    
    
    


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
                                <Text fontSize={'lg'} fontWeight={600}>{posts}</Text>
                                <Button variant='link' color={'gray.500'}
                                    onClick={() => navigate('/posts-followers-following?tab=posts')}>
                                    Posts
                                </Button>

                            </Stack>


                            <Stack spacing={0} align={'center'}>
                                <Text fontSize={'lg'} fontWeight={600}>{followers}</Text>
                                <Button variant='link'
                                    onClick={() => navigate('/posts-followers-following?tab=followers')}>Followers</Button>

                            </Stack>


                            <Stack spacing={0} align={'center'}>
                                <Text fontSize={'lg'} fontWeight={600}>{following}</Text>
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
                                }}>
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
                                {profileData && profileData.profession ? profileData.profession : 'No Profession'}
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

