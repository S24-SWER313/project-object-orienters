import React, { useEffect, useContext, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Text,
  Box,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast
} from '@chakra-ui/react';
import { AuthContext, useAuth } from './AuthProvider';
import { useNavigate } from "react-router-dom";


export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleIsSignedIn = () => {
    if (localStorage.getItem("token") != null) {
      navigate("/home");
    }
  }
  useEffect(() => {
    handleIsSignedIn();
  }, []);


  const handleSubmitEvent = () => {
    if (username === "" || password === "") {
      toast({
        title: 'Login Error',
        description: "please provide a valid input.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: `top`
      });
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (handleSubmitEvent()) {
      loginAction({ username, password });
    }
  };


  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack
          bg={'gray.100'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ xl: '2xl' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
              mb={'2'}
            >
              Login into Tech
              <Text
                as={'span'}
                bg={'blue.400'}
                bgClip="text">
                S
              </Text>
              pot
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
              Log in to TechSpot and reconnect with a community where technology enthusiasts and experts come together to shape tomorrow's innovations.            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                h={'57'}
                placeholder="Username"
                bg={'gray.300'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.900',
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                h={'57'}
                placeholder="Password"
                bg={'gray.300'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.900',
                }}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Stack>
            <Stack direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
              mt={4}>
              <Box>
                <Link color={'blue.400'} fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>Forgot your password?</Link>
              </Box>
            </Stack>
            <Button
              size={'lg'}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                boxShadow: '2xl',
              }}
              onClick={handleLogin}>
              Login
            </Button>
            <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Link color={'blue.400'} href='/signup'>New here? Join us now!</Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Flex
        display={{ base: 'none', lg: 'block' }}
        flex={1}
        align={'center'}
        justify={'center'}
        overflow={'hidden'}
      >
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
          w={'full'}
          h={'full'}
        />
      </Flex>


    </Stack>
  );
}
