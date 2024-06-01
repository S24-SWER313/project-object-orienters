import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Card,
    CardHeader,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';


const toProperCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

function FollowersTab({profile}) {
    const [followers, setFollowers] = useState([]);
    const [FollowersNumber, setFollowersNumber] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        if (profile?._links?.followers.href) {
            async function fetchFollowers() {
                try {
                    const response = await ApiCalls.get(profile._links.followers.href);
                    const data = response.data;
                    if (data._embedded?.profileList) {
                        setFollowers(data._embedded.profileList);
                    }
                    setFollowersNumber(data.page.totalElements);
                } catch (error) {
                    console.error("Failed to fetch followers:", error);
                }
            }
            fetchFollowers();
        } else {
            console.log("Followers link unavailable");
        }
    }, [user, profile]);






    return (
        <>
            <Card mb={1}>
                <CardHeader>
                    <Heading size='md'>Followers Tab</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='8'>
                        {followers.map(follower => (
                            <Flex key={follower.username} spacing='4'>
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

export default FollowersTab;


