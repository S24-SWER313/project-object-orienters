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
    chakra
} from '@chakra-ui/react';
import { VisuallyHidden } from '@chakra-ui/visually-hidden';
import { AiOutlineMenu, AiFillHome, AiOutlineInbox, AiOutlineSearch, AiFillBell } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';

function Header() {
    const navigate = useNavigate();  // Initialize the navigate function
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();

    const handleKeyPress = (e) =>{
        if (e.key === 'Enter') {
            this.search();
        }
    }

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
                            onClick={() => navigate('/profile')}
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
}

export default Header;
