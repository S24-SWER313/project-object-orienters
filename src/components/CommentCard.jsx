import { React, useState, useRef } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  RadioGroup,
  Radio,
  useToast
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


export default function CommentCard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { profileData } = useProfileLoading({ profile: user });
  const fileInputRef = useRef(null);



  async function AddComment() {
  
    //TODO: TODO AFTER ADDING COMMENTS GUI
    // const addComment = () => {
    //     console.log(props.reactionsUrl)
    //     fetch(props.commentsUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({              
                
    //         })
    //     })
    //         .then(response => response.json()) 
    //         .then(data => {
    //             console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
  }

  function triggerFileInput() {
    fileInputRef.current.click();
  }

  return  (
  <Flex
    h={'90vh'}
      align={'center'}
      justify={'center'}
      bg={'white'}
      // w={'600px'}
      p={"10px"}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        h={'full'}
        bg={useColorModeValue('black', 'gray.800')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        align={'flex-end'}
        my={12}
        direction={['row']}>
          <Input
            placeholder="Comment"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            //onChange={e => setPassword(e.target.value)}
          />

          <Button
            bg={'blue.400'}
            color={'white'}
            w="25%"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={AddComment}>
            Add
          </Button>
        </Stack>
    </Flex>
  );
}