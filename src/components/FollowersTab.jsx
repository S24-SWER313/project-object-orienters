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
    return str.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

function FollowersTab() {
    const [followers, setFollowers] = useState([]);
    const [FollowersNumber, setFollowersNumber] = useState(0);
    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });

    useEffect(() => {
        if (profileData?._links?.followers?.href) {
            fetch(profileData._links.followers.href, {
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
                        setFollowers(data._embedded.profileList);
                    }
                    setFollowersNumber(data.page.totalElements);
                })
                .catch((error) => {
                    console.error("Failed to fetch followers:", error);
                });
        }
    }, [user, profileData]);





    return (
        <>
            <Card mb={1}>
                <CardHeader>
                    <Heading size='md'>Followers Tab</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='8'>
                        {followers.map(follower => (
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name={follower.name} src={follower.profilePic || undefined} />
                                    <Box alignItems="left">
                                        <Heading size='sm' textAlign={['left']}>{toProperCase(follower.name)}</Heading>
                                        <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(follower.profession)}</Text>
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

export default FollowersTab ;


