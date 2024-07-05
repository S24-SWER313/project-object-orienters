import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Textarea,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    VStack,
    InputGroup,
    Input,
    FormLabel,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,


} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlinePaperClip } from "react-icons/ai";
import AddPost from "./AddPost";
import useProfileLoading from './useProfileLoading';
import { useAuth } from "./AuthProvider";


function CallerAddPost() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [privacy, setPrivacy] = useState('PUBLIC');
    const {user} = useAuth();
    const { profileData } = useProfileLoading({ profile: user });

    const handleOpen = (e) => {
        e.stopPropagation();
        onOpen();
    };

    return (
        <>

            <Box display="flex" flexDirection="column" cursor="pointer"  onClick={handleOpen} w={'100%'}>
                <Card border={'1px'} height="190px" w={'100%'}>

                    <CardHeader>
                        <Flex alignItems="center" gap="4">
                            <Avatar name={profileData ? profileData.name : 'No Name'}
                                src={profileData ? profileData.profilePic?.fileUrl : ''} size='md' />
                            <Box>
                                <Text fontWeight="bold" fontSize="md">{profileData ? profileData.name : 'No Name'}</Text>
                                <Menu>
                                    <MenuButton h={'30px'} fontSize="xs" as={Button} rightIcon={<ChevronDownIcon />}>
                                        {privacy}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>PUBLIC</MenuItem>
                                        <MenuItem >PRIVATE</MenuItem>
                                        <MenuItem >With Followers</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </Flex>

                        <Flex alignItems="start" gap="4">
                            <VStack spacing={4} flex="1">
                                <FormControl isRequired>
                                    <Textarea
                                        readOnly
                                        id='post-text'
                                        placeholder='Write something...'
                                        size='sm'
                                        minHeight="40px"  // Minimum height to start with
                                        height='auto'  // Set height to auto to allow resize
                                        overflow='hidden'  // Hide the scrollbar
                                        margin={2}
                                    />
                                </FormControl>
                            </VStack>
                        </Flex>
                        <FormControl>
                            {/*<FormLabel fontSize={'sm'}>Attach media</FormLabel>*/}
                            <InputGroup>
                                <Input
                                    style={{ display: 'none' }}  // Hide the default input
                                />
                                <Button size={'xs'} readOnly variant='outline' colorScheme='blue' leftIcon={<Icon as={AiOutlinePaperClip} />} >Choose File</Button>
                            </InputGroup>

                        </FormControl>
                    </CardHeader>

                    <CardBody>

                    </CardBody>

                    <CardFooter>

                    </CardFooter>
                </Card>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW="80vw">
                    <ModalHeader>What's on your mind?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddPost />
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>POST</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CallerAddPost;
