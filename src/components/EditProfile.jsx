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
import ApiCalls from './ApiCalls';


export default function EditProfile() {
  const { user, token } = useAuth();
  const [name, setName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [profession, setProfession] = useState(null);
  const [about, setAbout] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { profileData } = useProfileLoading({ profile: user });
  const fileInputRef = useRef(null);



  async function updateProfile() {
    const payload = {
      name,
      profession,
      gender,
      dob,
      password,
      about
    };

    try {
      await ApiCalls.put(`/profiles/${user}`, payload);
      toast({
        title: 'Profile Updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: 'Error Updating Profile, Please Try Again.',
        description: 'What a nice picture!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  function triggerFileInput() {
    fileInputRef.current.click();
  }

  async function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await ApiCalls.post(`/profiles/${user}/profilePic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // This is actually set automatically by Axios when formData is detected
        }
      });
      toast({
        title: 'Profile Picture Updated.',
        description: 'What a nice picture!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast({
        title: 'Error Updating Profile Picture.',
        description: `Status: ${error.response ? error.response.status : "No response"}`,
        status: 'error', // Changed from 'success' to 'error'
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  return (
    <Flex
      justify={'center'}
      
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          {profileData?.username} Profile Update
        </Heading>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
        />
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" name={profileData?.name} src={profileData?.profilePic?.fileUrl}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={triggerFileInput}>Update Profile Picture</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="Name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            defaultValue={profileData?.name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="Name" isRequired>
          <FormLabel>About</FormLabel>
          <Input
            placeholder="About"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            defaultValue={profileData?.about}
            onChange={e => setAbout(e.target.value)}
          />
        </FormControl>
        <FormControl id="Date of Birth" isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            placeholder="DOB"
            _placeholder={{ color: 'gray.500' }}
            type="date"
            defaultValue={profileData?.dob}
            onChange={e => setDob(e.target.value)}
          />
        </FormControl>

        <FormControl id="Gender" isRequired>
          <FormLabel>Gender</FormLabel>
          <RadioGroup name="gender" defaultValue={profileData?.gender} onChange={value => setGender(value)}>
            <Stack spacing={5} direction='row'>
              <Radio value='MALE'>
                Male
              </Radio>
              <Radio value='FEMALE'>
                Female
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="Profession" isRequired>
          <FormLabel>Profession</FormLabel>
          <Input
            placeholder="Profession"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            defaultValue={profileData?.profession}
            onChange={e => setProfession(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Re-Enter Password</FormLabel>
          <Input
            placeholder="Re-Enter Password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}

          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={updateProfile}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
