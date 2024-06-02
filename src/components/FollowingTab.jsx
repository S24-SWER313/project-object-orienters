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
    useColorModeValue,
    Flex,
    Avatar,
    Text,
    IconButton, useToast, Menu, MenuButton, MenuItem, MenuList, Button
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';


const toProperCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}


function FollowingTab({ profile }) {
    const [following, setFollowing] = useState([]);
    const [FollowingNumber, setFollowingNumber] = useState(0);
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const [followingStatus, setFollowingStatus] = useState({});

    const fetchIfFollowing = async (followingUsername) => {

        try {
            if (followingUsername === user) return;
            const response = await ApiCalls.get(`/profiles/${followingUsername}/follower?followerUserName=${encodeURIComponent(user)}`);
            if (response.status === 200) {
                setFollowingStatus(prev => ({ ...prev, [followingUsername]: response.data?.username === user }));
            }
        } catch (error) {

        }
    };


    const toggleFollower = async (followingProf) => {
        if (followingStatus[followingProf?.username]) {
            handleDeleteFollowing(followingProf);
        } else {
            handleAddFollower(followingProf);
        }
    }

    const handleAddFollower = async (followingProf) => {
        const follower = { username: user };
        ApiCalls.post(`/profiles/${followingProf.username}/followers`, follower)
            .then(response => {
                setFollowingStatus(prev => ({ ...prev, [followingProf.username]: true }));
                toast({
                    title: `Following ${followingProf.username}.`,
                    description: `You are now following ${followingProf.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error Following ${followingProf.username}.`,
                    description: `Unable to follow ${followingProf.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    };

    const handleDeleteFollowing = async (followingProf) => {
        const data = { deletedUser: followingProf.username };

        ApiCalls.delete(`/profiles/${user}/following`, { data: data })
            .then(response => {
                setFollowingStatus(prev => ({ ...prev, [followingProf.username]: false }));
                if (user === profile.username) {
                    setFollowing(following.filter(follower => follower?.username !== followingProf.username));
                }
                toast({
                    title: `Unfollowed ${followingProf.username}.`,
                    description: `You have unfollowed ${followingProf.username}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: `Error unfollowing ${followingProf.username}.`,
                    description: `Unable to unfollow ${followingProf.username} at this time.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            });
    };

    useEffect(() => {
        if (profile?._links?.following?.href) {
            async function fetchFollowing() {
                try {
                    const response = await ApiCalls.get(profile._links.following.href);
                    const data = response.data;
                    if (data._embedded?.profileList) {
                        setFollowing(data._embedded.profileList);
                        data._embedded.profileList.forEach(follower => {
                            fetchIfFollowing(follower.username);
                        });
                    }
                    setFollowingNumber(data.page.totalElements);
                } catch (error) {
                    console.error("Failed to fetch following:", error);
                }
            }
            fetchFollowing();
        }
    }, [user, profile]);


    return (
        <>
            <Card mb={1}>
                <CardHeader>
                    <Heading size='md'>Following Tab</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='8'>
                        {following.map(followingUser => (
                            <Flex key={followingUser.username} spacing='4'> {/* Assuming each user has a unique 'id' */}
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name={followingUser.name} src={followingUser.profilePic || undefined} onClick={() => navigate(`/profiles/${followingUser.username}`)} cursor={'pointer'} />
                                    <Box alignItems="left">
                                        <Heading size='sm' textAlign={['left']}>{toProperCase(followingUser.name)}</Heading>
                                        <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(followingUser.profession)}</Text>
                                    </Box>
                                </Flex>
                                {user !== followingUser.username && <Button
                                    fontSize={'lg'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                    _hover={{
                                        bg: followingStatus[followingUser.username] ? 'red' : 'blue.700'
                                    }}
                                    onClick={() => toggleFollower(followingUser)}
                                >
                                    {isHovering ? (followingStatus[followingUser.username] ? 'Unfollow' : 'Follow') : (followingStatus[followingUser.username] ? 'Following' : 'Follow')}
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
                                        <MenuItem onClick={() => navigate(`/profiles/${followingUser.username}`)}>View Profile</MenuItem>
                                        <MenuItem color={'red'} onClick={() => handleDeleteFollowing(followingUser)}>Delete Following</MenuItem>
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

export default FollowingTab;


