import React from 'react'
// Chakra UI components
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
    Heading
} from '@chakra-ui/react';

// Chakra UI utility for visually hidden components
import { VisuallyHidden } from '@chakra-ui/visually-hidden';

// React Icons
import { AiOutlineMenu, AiFillHome, AiOutlineInbox, AiOutlineSearch, AiFillBell } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';

// If you are using a custom Logo component, ensure it is imported
// import Logo from './path/to/Logo';

// If you are using a custom chakra factory function and it's not defined, make sure to import it
// import { chakra } from '@chakra-ui/system';
// Importing the chakra factory function
import { chakra } from '@chakra-ui/system';


// Import your custom Logo component if it's defined in another file
function Header() {


    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    return (
        <React.Fragment>
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
                            href="/"
                            title="TechSpot Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            {/* <Logo /> */}
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
                            <Input type="tel" placeholder="Search..." />
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
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );


}

export default Header
