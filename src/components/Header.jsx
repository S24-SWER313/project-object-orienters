import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatIcon } from '@chakra-ui/icons';
import {
    useColorModeValue,
    Flex,
    HStack,
    IconButton,
    InputGroup,
    InputLeftElement,
    Input,
    Avatar,
    Heading,
    chakra,
    Button,
    Box,
    Text
} from '@chakra-ui/react';

import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';
import { MdOutlineLogout } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { useAuth } from './AuthProvider';
import useProfileLoading from './useProfileLoading';

function Header() {
    const navigate = useNavigate();
    const bg = useColorModeValue("white", "gray.800");
    const { user, logOut } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };


    return (
        <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} position="relative">
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <HStack display="flex" spacing={3} alignItems="center">
                    <chakra.a
                        onClick={() => navigate("/home")}
                        cursor="pointer"
                        title="TechSpot Home Page"
                        display="flex"
                        alignItems="center"
                    >
                        <Heading p={4} bg="white" as="h1" size="md" noOfLines={1} textAlign="center">
                            Tech
                            <Text
                                as={'span'}
                                bg={'blue.400'}
                                bgClip="text">
                                S
                            </Text>
                            pot
                        </Heading>
                    </chakra.a>
                    <HStack>
                        <Button
                            onClick={() => navigate("/messages")}
                            variant="ghost"
                            leftIcon={<ChatIcon />}
                            size="sm"
                            display={{ base: 'flex', md: 'inline-flex' }}
                        >
                            Messages
                        </Button>
                        <Button
                            onClick={() => navigate("/code")}
                            variant="ghost"
                            leftIcon={<FaCode />}
                            size="sm"
                            display={{ base: 'flex', md: 'inline-flex' }}
                        >
                            Code
                        </Button>
                    </HStack>
                </HStack>
                <HStack spacing={3} alignItems="center">
                    <Box display={{ base: 'none', md: 'flex' }}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AiOutlineSearch />
                            </InputLeftElement>
                            <Input type="tel" placeholder="Search..." />
                        </InputGroup>
                    </Box>
                    <Box display={{ base: 'flex', md: 'none' }}>
                        <IconButton
                            icon={<AiOutlineSearch />}
                            onClick={handleSearchClick}
                        />
                    </Box>

                    <chakra.a p={3} color="gray.800" _dark={{ color: "inherit" }} rounded="sm" _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}>
                        <IconButton icon={<AiOutlineBell />} />
                    </chakra.a>
                    <Avatar
                        onClick={() => navigate('/profiles/' + user)}
                        cursor="pointer"
                        size="sm"
                        name={profileData ? profileData.name : 'No Name'}
                        src={profileData ? profileData.profilePic?.fileUrl : ''}
                    />
                    <Button
                        rightIcon={<MdOutlineLogout size={'15px'} />}
                        onClick={logOut}
                        size="sm"
                        fontSize="12px"
                        w="100px"
                        colorScheme="red"
                        variant="outline"
                        rounded={11}
                    >
                        LogOut
                    </Button>
                </HStack>
            </Flex>

            {isSearchVisible && (
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    p={4}
                    bg={bg}
                    zIndex="10"
                    display={{ base: 'flex', md: 'none' }}
                    alignItems="center"
                >
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">

                        </InputLeftElement>
                        <Input type="tel" placeholder="Search..." />
                    </InputGroup>
                    <IconButton
                        ml={2}
                        icon={<AiOutlineSearch />}
                        onClick={() => setIsSearchVisible(false)}
                    />
                </Box>
            )}

        </chakra.header>
    );
}

export default Header;
