import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  CloseButton,
  Textarea,
  ChakraProvider,
  Icon,
} from "@chakra-ui/react";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import "./App.css";
import PostList from "./PostList";
import AddPost from "./AddPost";

function App() {
  return (

    <>


      <Heading
        p={4}
        bg={"white"}
        as="h1"
        size="4xl"
        noOfLines={1}
        w={"99vw"}
        textAlign={"center"}
      >
        TechSpot
      </Heading>






      <AddPost />




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


      



      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        background={"lightblue"}
      >
        <PostList />
      </Box>




      








    </>
  );
}

export default App;
