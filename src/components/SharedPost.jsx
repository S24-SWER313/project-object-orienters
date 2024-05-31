import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
  Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './style.css'; // Import your custom CSS'
import Post from './Post';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';


const SharedPost = forwardRef(({ sharedPost }, ref) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);

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
    <Card ref={ref} key={sharedPost.contentID} w={[0.88, 0.9, 0.8]} maxW={550} m='2'>
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
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Post key={sharedPost.post.contentID} post={sharedPost.post}></Post>
      </CardBody>
      <CardFooter
        marginTop='-9'
        marginBottom='-3'
        justify='space-between'
        flexWrap='nowrap'
        sx={{
          '& > button': {
            minW: '50',
          },
        }}
      >
      </CardFooter>
    </Card >

  );

});

export default SharedPost;
