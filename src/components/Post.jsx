import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ungzip } from 'pako';
import { Buffer } from 'buffer';
import MediaContentData from './MediaContentData';
import moment from 'moment'; // Import moment library

const Post = forwardRef((props, ref) => {
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    const moment = require('moment');
    const specificDateTime = moment(props.timestamp, 'YYYY-MM-DD HH:mm:ss.SSS');
    const duration = moment(specificDateTime).fromNow();

    const toProperCase = (str) => {
        return str.toLowerCase().replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    useEffect(() => {
        if (props.authorProfilePic) {
            try {
                const base64DecodedData = Buffer.from(props.authorProfilePic, 'base64');
                let processedData;

                if (base64DecodedData[0] === 0x1f && base64DecodedData[1] === 0x8b) {
                    processedData = ungzip(base64DecodedData); 
                } else {
                    processedData = base64DecodedData;         
                }

                const mimeType = props.authorProfilePic.type || 'application/octet-stream';
                setProfilePicUrl(URL.createObjectURL(new Blob([processedData], { type: mimeType })));

            } catch (error) {
                console.error('Error decompressing profile picture:', error);
                setProfilePicUrl(null);
            }
        }
    }, [props.authorProfilePic]);

    return (
        <Card ref={ref} key={props.contentID} w={[0.88, 0.9, 0.8]} maxW={550} m='2'>
            <CardHeader marginBottom='-6'>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={props.authorName} src={profilePicUrl || undefined} />
                        <Box alignItems="left">
                            <Heading size='sm' textAlign={['left']}>{toProperCase(props.authorName)}</Heading>
                            <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(props.authorProfession)}</Text>
                            <Text fontSize='0.7em' textAlign={['left']} color={'gray'} >{duration}</Text>
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
                {props.mediaData !=[] && <MediaContentData style={{ margin: "auto"}} objectFit='cover' mediaData={props.mediaData}  />}
            </CardBody>
            <CardFooter
                marginTop='-9'
                marginBottom='-3'
                justify='space-between'
                flexWrap='nowrap'
                sx={{
                    '& > button': {
                        minW: '50',
                    },
                }}
               // width='100%'
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
});

export default Post;
