import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
  Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, ModalCloseButton,
  Modal, useDisclosure,
  ModalBody,
  ModalOverlay,
  ModalContent, Heading, IconButton, Size, Text, Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './style.css'; // Import your custom CSS'
import Post from './Post';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';
import DeleteShared from './DeleteShared';


const SharedPost = forwardRef(({ sharedPost }, ref) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const { isOpen: isOpenY, onOpen: onOpenY, onClose: onCloseY } = useDisclosure();
  const moment = require('moment');
  const specificDateTime = moment(sharedPost.timestamp, 'YYYY-MM-DD HH:mm:ss.SSS');
  const duration = moment(specificDateTime).fromNow();
  const [isReacting, setIsReacting] = useState(false);
  const { user, token } = useAuth();

  const toProperCase = (str) => {
    if (str == null) return;
    return str.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  useEffect(() => {
    if (sharedPost.contentAuthor.profilePic) {
      const mimeType = sharedPost.contentAuthor.profilePic.type || 'application/octet-stream';
      const url = sharedPost.contentAuthor.profilePic.fileUrl
      setProfilePicUrl(url);
    }
  }, [sharedPost.contentAuthor.profilePic]);

  return (
    <>
      <Card ref={ref} key={sharedPost.contentID}  m='5'>
        <CardHeader marginBottom='-6'>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={sharedPost.contentAuthor.name} src={profilePicUrl || undefined} />
              <Box alignItems="left">
                <Heading size='sm' textAlign={['left']}>{toProperCase(sharedPost.contentAuthor.name)}</Heading>
                <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(sharedPost.contentAuthor.profession)}</Text>
                <Text fontSize='0.7em' textAlign={['left']} color={'gray'} >{duration}</Text>
              </Box>
            </Flex>
            {user === sharedPost.contentAuthor?.username && (
              <Menu isLazy>
                <MenuButton
                  as={IconButton}
                  variant='ghost'
                  colorScheme='gray'
                  aria-label='See menu'
                  icon={<BsThreeDotsVertical />}
                />
                <MenuList>
                  <MenuItem color={'red'} onClick={onOpenY}>Delete Shared Post</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </CardHeader>
        <CardBody >
          <Center>
            <Post key={sharedPost.post.contentID} post={sharedPost.post}></Post>
          </Center>
        </CardBody>
      </Card >


      <Modal isOpen={isOpenY} onClose={onCloseY} isCentered>
        <ModalOverlay />
        <ModalContent maxW="32vw">
          <ModalCloseButton mr={'-10px'} mt={'2px'} />
          <ModalBody m={"10px"}>
            <DeleteShared sharedPost={sharedPost} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );

});

export default SharedPost;
