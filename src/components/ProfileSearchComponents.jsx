import { Flex, Heading, Text, Box, Avatar, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
function ProfileSearchComponents({ name, profession, avatarUrl , username}) {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    return (
        <Flex flex="1" gap="4" alignItems="center" onClick={() => navigate('/profiles/' + username)}>
            <Avatar src={avatarUrl} name={name} />
            <Box>
                <Heading size='sm' textAlign={['left']}>{name}</Heading>
                <Text fontSize='0.8em' textAlign={['left']}>{profession}</Text>
            </Box>
            {/* <Button
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
            </Button> */}
        </Flex>
    )
}

export default ProfileSearchComponents
