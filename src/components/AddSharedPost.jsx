import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Button, Flex, Avatar, useToast, Text, Card,
    CardBody,
    CardFooter, ModalFooter,
    CardHeader, Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';


function AddSharedPost({ sharedPost }) {
    const [privacy, setPrivacy] = useState('PUBLIC');  // Default privacy setting
    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });
    const toast = useToast();

    const selectPrivacy = (newPrivacy) => {
        setPrivacy(newPrivacy);
    };


    const sharePost = async () => {
        try {
            const sharedPostData = {
                sharer: user,
                privacy: privacy,
            };
            const response = await ApiCalls.post(`/profiles/${profileData.username}/posts/${sharedPost.contentID}/share`, sharedPostData);
            toast({
                title: 'Share Post Successful!',
                description: "Post Shared.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        } catch (error) {
            toast({
                title: 'Error Sharing Post.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        }
    }

    return (

        <Card

        >
            <CardHeader>
                <Flex alignItems="center" gap="4">
                    <Avatar name={profileData ? profileData.name : 'No Name'}
                        src={profileData ? profileData.profilePic?.fileUrl : 'path/to/default/avatar.png'}
                        size='lg' />
                    <Text fontWeight="bold" fontSize="lg">{profileData ? profileData.name : 'No Name'}</Text>
                </Flex>
            </CardHeader>
            <CardBody>
                <Box>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {privacy}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => selectPrivacy('PUBLIC')}>PUBLIC</MenuItem>
                            <MenuItem onClick={() => selectPrivacy('PRIVATE')}>PRIVATE</MenuItem>
                            <MenuItem onClick={() => selectPrivacy('FRIENDS')}>With Followers</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </CardBody>
            <CardFooter>
                <Flex justifyContent="flex-end" width="100%">
                    <Button onClick={() => sharePost()} bg={'blue.400'} color={'white'}>
                        Share Post
                    </Button>
                </Flex></CardFooter>
        </Card>

    );
}

export default AddSharedPost;

