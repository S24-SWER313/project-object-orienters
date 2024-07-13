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


function DeleteShared({ sharedPost }) { 

    const { user, token } = useAuth();
    const toast = useToast();



    const deleteSharePost = async () => {
        try {
            const response = await ApiCalls.delete(`/profiles/${user}/posts/${sharedPost.contentID}`);
            toast({
                title: 'Shared Post Deleted.',
                description: "Successfully Deleted.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        } catch (error) {
            toast({
                title: 'Error Deleting Post.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        }
    }

    return (

        <Card>

            <CardBody>
                <Text>Are you sure you want to delete?</Text>
            <Flex justifyContent="flex-end" width="100%">
                    <Button onClick={() => deleteSharePost()} bg={'red'} color={'white'}>
                        Delete Shared Post
                    </Button>
                </Flex>
            </CardBody>

        </Card>

    );
}

export default DeleteShared;

