import React, { useState } from 'react';
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
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const toast = useToast();
  const client_id = "Ov23liq6SrGiWeOzrddu";
  const redirect_uri = "http://localhost:8080/oauth2/code/github";
  const scope = "user";  // Adjust the scope based on what permissions you need (e.g., 'repo', 'user')
  const state = "random_string_to_prevent_csrf";  // Should be a securely generated random string

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  //&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  async function signup() {
    if (handleSubmitEvent()) {
      fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, name: name, email: email, password: password }),
      })
        .then((response) => response.json().then(data => ({

          status: response.status,
          data
        }))
        )
        .then(({ status, data }) => {
          if (status != 200) {
             throw new Error(data.errors.error || 'An error occurred.');
          }
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: `top`
          });
          navigate("/login");
        })
        .catch((error) => {
          toast({
            title: 'Signup Error',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: `top`
          });
        });
    }

  }

  const handleSubmitEvent = () => {
    if (username == "" || password == "" || name == "" || email == "") {
      toast({
        title: 'Signup Error',
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

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
        display={{ base: 'none', lg: 'block' }}
        flex={1}
        align={'center'}
        justify={'center'}
        overflow={'hidden'}
      >
        <Image
          alt={'Signup Image'}
          objectFit={'cover'}
          src={'/images/tech.jpg'}
          w={'full'}
          h={'full'}
        />
      </Flex>
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
              Join Tech
              <Text
                as={'span'}
                bg={'blue.400'}
                bgClip="text">
                S
              </Text>
              pot!
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
              Join TechSpot, where technology enthusiasts and experts unite to shape the future.</Text>
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
                placeholder="Name"
                bg={'gray.300'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.900',
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                h={'57'}
                placeholder="Email"
                bg={'gray.300'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.900',
                }}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Stack>
              <Button
                h={'57'}
                fontFamily={'heading'}
                mt={8}
                fontSize={"20px"}
                w={'full'}
                bg='blue.400'
                color={'white'}
                _hover={{
                  boxShadow: '2xl'
                }}
                onClick={
                  signup
                }
              >
                Signup
              </Button>
              <Button
                h={'57'}
                fontFamily={'heading'}
                mt={3}
                leftIcon={<FcGoogle size={"30px"} />}
                fontSize={"20px"}
                bg='white'
                w={'full'}
                //color={'white'}
                _hover={{
                  boxShadow: '2xl'
                }}
                onClick={
                  () => {
                    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
                  }
                }
              >
                Continue With Google
              </Button>
              <Button
                h={'57'}
                fontFamily={'heading'}
                fontSize={"20px"}
                leftIcon={<FaGithub size={"30px"} />}
                mt={3}
                w={'full'}
                bg='white'
                _hover={{
                  boxShadow: '2xl'
                }}
                onClick={() => {
                  window.location.href = githubAuthUrl;
                }}>
                Continue With Github
              </Button>
            </Stack>
            <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Link color={'blue.400'} href='/login'>Already a member? Login here!</Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex >
    </Stack >
  );
}
