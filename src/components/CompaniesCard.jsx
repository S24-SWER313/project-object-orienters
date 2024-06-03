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

function CompaniesCard() {
    return (
        <Center>
        
            <Box
                h={'200px'}
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                rounded={'lg'}
                overflow={'hidden'}>
                <Image
                    alt={'Profile background'}
                    h={'50px'}
                    w={'full'}
                    src=""
                    objectFit={'cover'}
                />
                <Flex  mt={-10} mb={-5}>
                    <Avatar
                        size={'lg'}
                        src=""
                        alt={'Profile picture'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack>
                        <Heading fontSize={'sm'} fontWeight={500} fontFamily={'body'}>
                            Husam
                        </Heading>
                       
                            <Text fontSize={'sm'} fontWeight={600}>1000</Text>
                            <Text fontSize={'xs'} color={'gray.500'}>
                                Followers
                            </Text>
        
                    </Stack>

                    <Stack direction={'row'} spacing={4} width="full">

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
        
    )
}

export default CompaniesCard