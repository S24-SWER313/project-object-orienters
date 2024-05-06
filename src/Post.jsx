import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import {BiChat, BiLike, BiShare} from 'react-icons/bi';
import {BsThreeDotsVertical} from 'react-icons/bs';

// Assume these components are adjusted to fit Chakra UI components as needed
import MediaContentData from './MediaContentData'; // This would handle displaying the decompressed image

function Post() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState({name: '', profession: '', profilePic: ''});

    useEffect(() => {
        fetch('http://localhost:8080/profiles/rawan/posts')
            .then((res) => res.json())
            .then((data) => {
                if (data._embedded && data._embedded.postList) {
                    const postList = data._embedded.postList;
                    setPosts(postList);

                    if (postList.length > 0) {
                        const authorData = postList[0].contentAuthor;
                        setAuthor({
                            name: authorData.name,
                            profession: authorData.profession || 'Unknown Profession',
                            profilePic: authorData.profilePic?.data || '/default-profile.jpg',
                        });
                    }
                }
            })
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (<div style={{display: 'flex', flexWrap: 'wrap'}}>
            {posts.map((post) => (<Card key={post.contentID} w='30%' m='2'>
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={author.name} src={author.profilePic}/>
                                <Box>
                                    <Heading size='sm'>{author.name}</Heading>
                                    <Text>{author.profession}</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical/>}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            {post.textData}
                        </Text>
                        {/* Assuming MediaContentData handles the decompression/display of image data */}
                        <MediaContentData objectFit='cover' mediaData={post.mediaData}/>
                    </CardBody>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <Button flex='1' variant='ghost' leftIcon={<BiLike/>}>
                            Like
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiChat/>}>
                            Comment
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiShare/>}>
                            Share
                        </Button>
                    </CardFooter>
                </Card>))}
        </div>);
}

export default Post;
