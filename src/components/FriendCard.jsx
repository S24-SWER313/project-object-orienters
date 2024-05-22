import React from 'react';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

export default function FriendCard({name, jobTitle, avatarImageUrl, backgroundImage, followers, following}) {
    return (
        <Center>
            <Box
                h={'220px'}
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                rounded={'lg'}
                overflow={'hidden'}>
                <Image
                    alt={'Profile background'}
                    h={'50px'}
                    w={'full'}
                    src={backgroundImage} 
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-10} mb={-5}>
                    <Avatar
                        size={'lg'}
                        src={avatarImageUrl}
                        alt={'Profile picture'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={1.5}>
                        <Heading fontSize={'sm'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'xs'}>
                            {jobTitle}
                        </Text>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6} mb={-5}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontSize={'sm'} fontWeight={600}>{followers}</Text> {/* Display followers */}
                            <Text fontSize={'xs'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontSize={'sm'} fontWeight={600}>{following}</Text> {/* Display following */}
                            <Text fontSize={'xs'} color={'gray.500'}>
                                Following
                            </Text>
                        </Stack>
                    </Stack>

                    <Stack mt={8} direction={'row'} spacing={4} width="full">

                        <Button
                            size={'sm'}

                            fontSize={'xs'}
                            rounded={'full'}
                            _focus={{
                                bg: 'gray.200',
                            }}>
                            Message
                        </Button>
                        <Button
                            size={'sm'}
                            fontSize={'xs'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}>
                            Follow
                        </Button>
                    </Stack>

                </Box>
            </Box>
        </Center>
    );
}
