import React, { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Link,
  Checkbox
} from '@chakra-ui/react';
import { AuthContext, useAuth } from './AuthProvider';



const VARIANT_COLOR = 'red';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'http://localhost:8080/download/1716058187736_AI.jpg',
  },
  {
    name: 'Kent Dodds',
    url: 'http://localhost:8080/download/1716058187736_AI.jpg',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];


export const Blur = (props) => {

  return (
    <Icon
      width="100%"
      zIndex={-1}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function LogIn() {

  const avatarSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const iconSize = useBreakpointValue({ base: '44px', md: '60px' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction } = useAuth();

  
  const handleSubmitEvent = () => {
    if (username === "" || password === "") {
      alert("please provide a valid input");
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
    <Box position={'relative'} bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
      <Container
        as={SimpleGrid}
        maxW={'8xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Welcome back to Tech
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              S
            </Text>
            pot, where your tech journey continues!
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          w={'600px'}
          ml={'5%'} >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
              mb={'2'}
              mt={'-5'}>
              Login into Tech
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
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
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }
              }
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                                      
              />
              <Input
                h={'57'}
                placeholder="Password"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Stack>
            <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Checkbox>Remember Me</Checkbox>
              </Box>
              <Box>
                <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
              </Box>
            </Stack>
            <Button
              h={'57'}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              onClick={handleLogin}>
              Login
            </Button>
            <Stack isInline justifyContent='space-between' mt={4}>
            <Box>
              <Link color={`${VARIANT_COLOR}.500`} href='/signup'>New here? Join us now!</Link>
            </Box>
        </Stack>
          </Box>
        </Stack>
      </Container>


    </Box>
  );


}
