import React from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate import
import {
    useColorModeValue,
    useDisclosure,
    Flex,
    HStack,
    Box,
    IconButton,
    VStack,
    CloseButton,
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Avatar,
    Heading,
    chakra,
    ModalBody,
    ModalCloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader
} from '@chakra-ui/react';
import { VisuallyHidden } from '@chakra-ui/visually-hidden';
import { AiOutlineMenu, AiFillHome, AiOutlineInbox, AiOutlineSearch, AiFillBell } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { useAuth } from './AuthProvider';
import useProfileLoading from './useProfileLoading';
import EditProfile from './EditProfile';


function Header() {
    const navigate = useNavigate();  // Initialize the navigate function
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logOut } = useAuth();
    const { profileData } = useProfileLoading({ profile: user});

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    const handleOpen = (e) => {     //TAKE THIS AND IMPORTS
        e.stopPropagation();
        onOpen();
    };

    return (
        <>
            <chakra.header

                bg={bg}
                w="full"
                px={{
                    base: 2,
                    sm: 4,
                }}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Box
                            display={{
                                base: "inline-flex",
                                md: "none",
                            }}
                        >
                            <IconButton
                                display={{
                                    base: "flex",
                                    md: "none",
                                }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{
                                    color: "inherit",
                                }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg={bg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    justifySelf="self-start"
                                    onClick={mobileNav.onClose}
                                />
                                <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                                    Dashboard
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<AiOutlineInbox />}
                                >
                                    Inbox
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BsFillCameraVideoFill />}
                                >
                                    Videos
                                </Button>
                            </VStack>
                        </Box>
                        <chakra.a
                            href="/home"
                            title="TechSpot Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <Heading p={4} bg={'white'} as='h1' size='md' noOfLines={1} textAlign={'center'}>
                                TechSpot
                            </Heading>
                        </chakra.a>
                        <HStack
                            spacing={3}
                            display={{
                                base: "none",
                                md: "inline-flex",
                            }}
                        >
                            <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                                Dashboard
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="brand"
                                leftIcon={<AiOutlineInbox />}
                                size="sm"
                            >
                                Inbox
                            </Button>
                            <Button
                                variant="ghost"
                                leftIcon={<BsFillCameraVideoFill />}
                                size="sm"
                            >
                                Videos
                            </Button>
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AiOutlineSearch />
                            </InputLeftElement>
                            <Input type="tel" placeholder="Search..."

                            //onKeyUp={this.handleKeyPress.bind(this)} 
                            />

                        </InputGroup>

                        <chakra.a
                            p={3}
                            color="gray.800"
                            _dark={{
                                color: "inherit",
                            }}
                            rounded="sm"
                            _hover={{
                                color: "gray.800",
                                _dark: {
                                    color: "gray.600",
                                },
                            }}
                        >
                            <IconButton aria-label='Notifications' icon={<AiFillBell />} />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a>

                        <Avatar
                            onClick={() => navigate('/profiles/' + user)}
                            size="sm"
                            name={profileData ? profileData.name : 'No Name'}
                            src={profileData ? profileData.profilePic?.fileUrl : 'path/to/default/avatar.png'}
                        />
                        <Button colorScheme='blue' onClick={handleOpen}>Update Prof</Button>
                        <Button colorScheme='blue' onClick={logOut}>Logout</Button>


                    </HStack>
                </Flex>

                <Modal isOpen={isOpen} onClose={onClose} isCentered >
                    <ModalOverlay />
                    <ModalContent maxW="32vw">
                        {/* <ModalHeader>Update Profile</ModalHeader> */}
                        <ModalCloseButton mr={'-10px'} mt={'2px'}/>
                        <ModalBody  m={"10px"} >
                            <EditProfile />
                        </ModalBody>
                        {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>POST</Button>
                    </ModalFooter> */}
                    </ModalContent>
                </Modal>
            </chakra.header>
        </>
    );
}

export default Header;
