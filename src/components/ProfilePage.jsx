import React from 'react'
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
    VStack
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import useProfileLoading from './useProfileLoading';



function ProfilePage({backgroundImage, followers, following, posts}) {
    const navigate = useNavigate();
    console.log("Profile Page is rendering");
    const { profileData } = useProfileLoading();

    return (

        <Card>

            <CardHeader>
                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    overflow={'hidden'}>
                    <Image
                        alt={'Profile background'}
                        h={'170px'}
                        w={'full'}
                        src={backgroundImage} // Use backgroundImage prop
                        objectFit={'cover'}
                    />
                    <Flex justify={'left'} mt={-10} ml={2}>
                        <Avatar
                            size={'2xl'}
                            name={profileData ? profileData.name : 'No Name'}
                            src={profileData ? profileData.profilePic.fileUrl : 'path/to/default/avatar.png'}
                            alt={'Profile picture'}
                            css={{
                                border: '2px solid white',
                            }}
                        />
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
                            {profileData  && profileData.profession  ? profileData.profession : 'No Profession'}
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

