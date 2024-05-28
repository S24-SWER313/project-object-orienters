import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Card,
    CardHeader,
    CardBody,
    useColorModeValue,
    Flex,
    Avatar,
    Text,
    IconButton
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';


const toProperCase = (str) => {
    if (!str) return ''; 
    return str.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}


function FollowingTab() {
    const [following, setFollowing] = useState([]);
    const [FollowingNumber, setFollowingNumber] = useState(0);
    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });

    useEffect(() => {
        if (profileData?._links?.following?.href) {
            fetch(profileData._links.following.href, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data._embedded?.profileList) {
                        setFollowing(data._embedded.profileList);
                    }
                    setFollowingNumber(data.page.totalElements);
                })
                .catch((error) => {
                    console.error("Failed to fetch following:", error);
                });
        }
    }, [user, profileData]);





    return (
        <>
            <Card mb={1}>
                <CardHeader>
                    <Heading size='md'>Following Tab</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='8'>
                        {following.map(user => (
                            <Flex spacing='4'> {/* Assuming each user has a unique 'id' */}
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name={user.name} src={user.profilePic || undefined} />
                                    <Box alignItems="left">
                                        <Heading size='sm' textAlign={['left']}>{toProperCase(user.name)}</Heading>
                                        <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(user.profession)}</Text>
                                    </Box>
                                </Flex>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </Flex>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
    
}

export default FollowingTab ;


