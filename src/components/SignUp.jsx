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
} from '@chakra-ui/react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  async function signup() {

    await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, name: name, email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }

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
          src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
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
            
            <Button
              h={'57'}
              fontFamily={'heading'}
              mt={8}
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
              bg='white'
              w={'full'}
              //color={'white'}
              _hover={{
                boxShadow: '2xl'
              }}>
              Signup With Google
            </Button>
            <Button
              h={'57'}
              fontFamily={'heading'}
              mt={3}
              w={'full'}
              bg='white'
              _hover={{
                boxShadow: '2xl'
              }}>
              Signup With Github
            </Button>
            <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Link color={'blue.400'} href='/login'>Already a member? Login here!</Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
}
