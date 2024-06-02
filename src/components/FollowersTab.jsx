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
    IconButton, Menu, MenuButton, MenuItem, MenuList, Button, useToast
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';

const toProperCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

function FollowersTab({ profile }) {
    const [followers, setFollowers] = useState([]);
    const [followersNumber, setFollowersNumber] = useState(0);
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [followingStatus, setFollowingStatus] = useState({});
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const fetchFollower = async (followerUsername) => {

        try {
            if (followerUsername === user) return;
            const response = await ApiCalls.get(`/profiles/${followerUsername}/follower?followerUserName=${encodeURIComponent(user)}`);
            if (response.status === 200) {
                setFollowingStatus(prev => ({ ...prev, [followerUsername]: response.data?.username === user }));
            } else {
                //console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            // console.error('Error:', error);
        }
    };

    const toggleFollower = async (followerProf) => {
        if (followingStatus[followerProf?.username]) {
            handleDeleteFollowing(followerProf);
        } else {
            handleAddFollower(followerProf);
        }
    }

    const handleAddFollower = async (followerProf) => {
        const follower = { username: user };
        ApiCalls.post(`/profiles/${followerProf.username}/followers`, follower)
            .then(response => {
                setFollowingStatus(prev => ({ ...prev, [followerProf.username]: true }));
                toast({
                    title: `Following ${followerProf.username}.`,
                    description: `You are now following ${followerProf.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error Following ${followerProf.username}.`,
                    description: `Unable to follow ${followerProf.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    };


    const handleDeleteFollower = async (followerProf) => {
        const data = { deletedUser: followerProf.username };

        console.log(`/profiles/${user}/followers`);
        ApiCalls.delete(`/profiles/${user}/followers`, { data: data })
            .then(response => {
                if (user === profile.username) {
                    setFollowers(followers.filter(follower => follower?.username !== followerProf.username));
                }
                toast({
                    title: `Removed follower ${followerProf.username}.`,
                    description: `You have removed ${followerProf.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error removing follower ${followerProf.username}.`,
                    description: `Unable to remove ${followerProf.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    };


    const handleDeleteFollowing = async (followerProf) => {
        const data = { deletedUser: followerProf.username };

        ApiCalls.delete(`/profiles/${user}/following`, { data: data })
            .then(response => {
                setFollowingStatus(prev => ({ ...prev, [followerProf.username]: false }));

                toast({
                    title: `Unfollowed ${followerProf.username}.`,
                    description: `You have unfollowed ${followerProf.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error unfollowing ${followerProf.username}.`,
                    description: `Unable to unfollow ${followerProf.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    };

    useEffect(() => {
        if (profile?._links?.followers.href) {

            async function fetchFollowers() {
                try {
                    const response = await ApiCalls.get(profile._links.followers.href);
                    const data = response.data;
                    if (data._embedded?.profileList) {
                        setFollowers(data._embedded.profileList);
                        data._embedded.profileList.forEach(follower => {
                            fetchFollower(follower.username);
                        });
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
                                    <Avatar name={follower.name} src={follower.profilePic || undefined} onClick={() => navigate(`/profiles/${follower.username}`)} cursor={'pointer'} />
                                    <Box alignItems="left">
                                        <Heading size='sm' textAlign={['left']}>{toProperCase(follower.name)}</Heading>
                                        <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(follower.profession)}</Text>
                                    </Box>
                                </Flex>
                                {user !== follower.username && <Button
                                    fontSize={'lg'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                    _hover={{
                                        bg: followingStatus[follower.username] ? 'red' : 'blue.700'
                                    }}
                                    onClick={() => toggleFollower(follower)}
                                >
                                    {isHovering ? (followingStatus[follower.username] ? 'Unfollow' : 'Follow') : (followingStatus[follower.username] ? 'Following' : 'Follow')}
                                </Button>}
                                {(user === profile.username) && <Menu isLazy>
                                    <MenuButton
                                        as={IconButton}
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='See menu'
                                        icon={<BsThreeDotsVertical />}
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => navigate(`/profiles/${follower.username}`)}>View Profile</MenuItem>
                                        <MenuItem color={'red'} onClick={() => handleDeleteFollower(follower)}>Delete Follower</MenuItem>
                                    </MenuList>
                                </Menu>}
                            </Flex>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}

export default FollowersTab;
