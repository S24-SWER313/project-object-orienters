import React, { useEffect, useState } from 'react';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ungzip } from 'pako';
import { Buffer } from 'buffer';
import MediaContentData from './MediaContentData';

function Post(props) {
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    useEffect(() => {
        if (props.authorProfilePic) {
            try {
                // Decode the base64 data and decompress it
                const base64DecodedData = Buffer.from(props.authorProfilePic, 'base64');
                const ungzipedData = ungzip(base64DecodedData);
                
                // Create a URL object from the decompressed data
                const objectUrl = URL.createObjectURL(new Blob([ungzipedData], {type: 'image/jpeg'})); // Assuming JPEG, adjust accordingly
                setProfilePicUrl(objectUrl);

                // Cleanup URL object after component unmount
                return () => URL.revokeObjectURL(objectUrl);
            } catch (error) {
                console.error('Error decompressing profile picture:', error);
                setProfilePicUrl(null);
            }
        }
    }, [props.authorProfilePic]); // Effect runs whenever the profile picture prop changes

    return (
        <Card key={props.contentID} w='35%' m='4'>
            <CardHeader marginBottom='-6'>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={props.authorName} src={profilePicUrl || undefined} />
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
                <Text marginBottom='4'>
                    {props.textData}
                </Text>
                <MediaContentData objectFit='cover' mediaData={props.mediaData} />
            </CardBody>
            <CardFooter
                marginTop='-9'
                marginBottom='-3'
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
