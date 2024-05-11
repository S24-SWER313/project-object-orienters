import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Input, Textarea, VStack, Flex, FormControl, FormLabel, InputGroup, CloseButton, Avatar, useToast, Icon, Text, List, ListItem, HStack, Card,
  CardBody,
  CardFooter,
  CardHeader, Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import { AiOutlinePaperClip } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";

function AddPost() {
    const [postText, setPostText] = useState('');
    const [files, setFiles] = useState([]);  // Store multiple files in an array
    const fileInputRef = useRef(null);
    const textAreaRef = useRef(null);  // Ensure this useRef is declared for textAreaRef
    const toast = useToast();
    const [privacy, setPrivacy] = useState('Public');  // Default privacy setting

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);  // Convert FileList to array
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        toast({
            title: 'Post created.',
            description: `${files.length} files uploaded with the post.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
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
        <Box display="flex" flexDirection="column" alignItems="center" m={0} background={"lightblue"}>
            <Card
                w="70%"
            
                position="relative"
                p={8}
                shadow='md'
                borderRadius='md'
            >
                <CloseButton position="absolute" right="8px" top="-2px" onClick={() => alert('Card close button clicked!')} />

                <CardHeader>
                    <Flex alignItems="center" gap="4">
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='lg' />
                        <Box>
                            <Text fontWeight="bold" fontSize="lg">Dan Abrahmov</Text>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    {privacy}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => selectPrivacy('Public')}>Public</MenuItem>
                                    <MenuItem onClick={() => selectPrivacy('Private')}>Private</MenuItem>
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
                        <Button
                            marginTop={5}
                            colorScheme='blue'
                            onClick={handleSubmit}
                            disabled={!postText && !files.length}  // Check if files are selected
                        >Post</Button>
                    </FormControl>
                </CardFooter>
            </Card>
        </Box>
    );
}

export default AddPost;
