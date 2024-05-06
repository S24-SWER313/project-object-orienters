import React from 'react';

import MediaContentData from './MediaContentData'; // This would handle displaying the decompressed image
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

function Post(props) {
    return (
        <Card key={props.contentID} w='30%' m='4'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={props.authorName} src={props.authorProfilePic} />
                        <Box alignItems="left">
                            <Heading size='sm' textAlign={['left']}>{props.authorName}</Heading>
                            <Text textAlign={['left']}>{props.authorProfession}</Text>
                            <Text fontSize='0.8em' textAlign={['left']} >{props.timestamp}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {props.textData}
                </Text>
                {/* Assuming MediaContentData handles the decompression/display of image data */}
                <MediaContentData objectFit='cover' mediaData={props.mediaData} />
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
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                    Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Post;