import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Button, Input, Textarea, VStack, Flex, FormControl, FormLabel, InputGroup, CloseButton, Avatar, useToast, Icon, Text, List, ListItem, HStack, Card,
    CardBody,
    CardFooter, ModalFooter,
    CardHeader, Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import { AiOutlinePaperClip } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


function AddPost() {
    const [postText, setPostText] = useState('');
    const [files, setFiles] = useState([]);  // Store multiple files in an array
    const fileInputRef = useRef(null);
    const textAreaRef = useRef(null);  // Ensure this useRef is declared for textAreaRef
    const toast = useToast();
    const [privacy, setPrivacy] = useState('PUBLIC');  // Default privacy setting
    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });
    const navigate = useNavigate();


    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);  // Convert FileList to array
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('text', postText);
        formData.append('privacy', privacy);
        files.forEach(file => formData.append('files', file));

        const response = await fetch(`http://localhost:8080/profiles/${user}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        toast({
            title: 'Post created.',
            description: `${files.length} files uploaded with the post.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: `top`
        });

    };



    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const selectPrivacy = (newPrivacy) => {
        setPrivacy(newPrivacy);
    };

    // Function to automatically adjust textarea height
    const autoResizeTextArea = () => {
        const textArea = textAreaRef.current;
        if (textArea) {
            // Reset height temporarily to shrink if text is deleted
            textArea.style.height = 'auto';
            // Set height based on scroll height to expand to fit all content
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    };

    // Adjust textarea height whenever text changes
    useEffect(() => {
        autoResizeTextArea();
    }, [postText]);  // Dependency on postText to run effect whenever it changes

    return (
        // <Box display="flex" flexDirection="column" alignItems="center" m§={5} background={"lightblue"}>
        <Card
        // w="70%"

        // position="relative"
        // p={8}
        // shadow='md'
        // borderRadius='md'
        >
            {/* <CloseButton position="absolute" right="8px" top="-2px" onClick={() => alert('Card close button clicked!')} /> */}

            <CardHeader>
                <Flex alignItems="center" gap="4">
                    <Avatar name={profileData ? profileData.name : 'No Name'}
                        src={profileData ? profileData.profilePic?.fileUrl : 'path/to/default/avatar.png'}
                        size='lg' />
                    <Box>
                        <Text fontWeight="bold" fontSize="lg">{profileData ? profileData.name : 'No Name'}</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                {privacy}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => selectPrivacy('PUBLIC')}>PUBLIC</MenuItem>
                                <MenuItem onClick={() => selectPrivacy('PRIVATE')}>PRIVATE</MenuItem>
                                <MenuItem onClick={() => selectPrivacy('With Followers')}>With Followers</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </CardHeader>

            <CardBody>
                <Flex alignItems="start" gap="4">
                    <VStack spacing={4} flex="1">
                        <FormControl isRequired>
                            <Textarea
                                ref={textAreaRef}
                                id='post-text'
                                value={postText}
                                onChange={handlePostTextChange}
                                placeholder='Write something...'
                                size='sm'
                                minHeight="100px"  // Minimum height to start with
                                height='auto'  // Set height to auto to allow resize
                                overflow='hidden'  // Hide the scrollbar
                            />
                        </FormControl>
                    </VStack>
                </Flex>
            </CardBody>

            <CardFooter>
                <FormControl>
                    <FormLabel htmlFor='file'>Attach media</FormLabel>
                    <InputGroup>
                        <Input
                            type='file'
                            id='file'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="audio/*,video/*,image/*"
                            multiple  // Enable selection of multiple files
                            style={{ display: 'none' }}  // Hide the default input
                        />
                        <Button variant='outline' colorScheme='blue' leftIcon={<Icon as={AiOutlinePaperClip} />} onClick={triggerFileInput}>Choose File</Button>
                    </InputGroup>
                    {files.length > 0 && (
                        <List mt={2}>
                            {files.map((file, index) => (
                                <ListItem key={index}>
                                    <HStack spacing={4}>
                                        <Text flex="1">{file.name}</Text>
                                        <CloseButton onClick={() => handleRemoveFile(index)} />
                                    </HStack>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <ModalFooter>
                        <Button
                            colorScheme="blue" mr={-7} mb={-5} onClick={() => {
                                handleSubmit();
                                navigate("/home");
                            }}>POST</Button>
                    </ModalFooter>
                </FormControl>
            </CardFooter>
        </Card>
        // </Box>
    );
}

export default AddPost;

{/* <Box display="flex" flexDirection="column" alignItems="center" m={4}>
                <Box
                    w="60%"
                    position="relative"
                    p={8}
                    shadow='md'
                    borderWidth='1px'
                    borderRadius='md'
                    bg='lightgray'
                >
                    <CloseButton position="absolute" right="8px" top="-2px" onClick={() => alert('Card close button clicked!')} />
                    <Flex alignItems="start" gap="4">
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='lg' />
                        <VStack spacing={4} flex="1">
                            <FormControl isRequired>
                                <Textarea
                                    id='post-text'
                                    value={postText}
                                    onChange={handlePostTextChange}
                                    placeholder='Write something...'
                                    size='sm'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='file'>Attach media</FormLabel>
                                <InputGroup>
                                    <Input
                                        type='file'
                                        id='file'
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="audio/*,video/*,image/*"
                                        multiple  // Enable selection of multiple files
                                        style={{ display: 'none' }}  // Hide the default input
                                    />
                                    <Button variant='outline' colorScheme='blue' leftIcon={<Icon as={AiOutlinePaperClip} />} onClick={triggerFileInput}>Choose File</Button>
                                </InputGroup>

                                {files.length > 0 && (
                                    <List mt={2}>
                                        {files.map((file, index) => (
                                            <ListItem key={index}>
                                                <HStack spacing={4}>
                                                    <Text flex="1">{file.name}</Text>
                                                    <CloseButton onClick={() => handleRemoveFile(index)} />
                                                </HStack>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </FormControl>
                            <Button
                                colorScheme='blue'
                                onClick={handleSubmit}
                                disabled={!postText && !files.length}  // Check if files are selected
                            >Post</Button>
                        </VStack>
                    </Flex>
                </Box>
            </Box> */}






{/* <Box display="flex" flexDirection="column" alignItems="center" m={4}>
        <Card w="30%" background="lightblue">
          <CloseButton onClick={() => alert("Card close button clicked!")} />
          <CardHeader>

       <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Box alignItems="left">
                <Textarea
                  variant="outline"
                  placeholder="Add New Post"
                  rows={6}
                />
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Button
              flex="1"
              variant="outline"
              colorScheme="teal"
              leftIcon={<BiLike />}
            >
              Like
            </Button>
            <Button
              flex="1"
              variant="outline"
              colorScheme="teal"
              leftIcon={<BiChat />}
            >
              Comment
            </Button>
            <Button
              flex="1"
              variant="outline"
              colorScheme="teal"
              leftIcon={<BiShare />}
            >
              Share
            </Button>
          </CardBody>
          <CardFooter>
            <Button flex="1" variant="outline" colorScheme="teal">
              {" "}
              POST{" "}
            </Button>
          </CardFooter>
        </Card>
      </Box>  */}
