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

// Update the component to accept more props
export default function FriendCard({name, jobTitle, avatarImageUrl, backgroundImage, followers, following}) {
    return (
        <Center py={7}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    alt={'Profile background'}
                    h={'70px'}
                    w={'full'}
                    src={backgroundImage} // Use backgroundImage prop
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-10}>
                    <Avatar
                        size={'lg'}
                        src={avatarImageUrl} // Use avatarImageUrl prop
                        alt={'Profile picture'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'l'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'sm'}>
                            {jobTitle}
                        </Text>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{followers}</Text> {/* Display followers */}
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{following}</Text> {/* Display following */}
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Following
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        size={'sm'}
                        w={'full'}
                        mt={8}
                        bg={useColorModeValue('#151f21', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        Follow
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}
