import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ungzip } from 'pako';
import { Buffer } from 'buffer';
import MediaContentData from './MediaContentData';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './style.css'; // Import your custom CSS'
import { GithubSelector } from '@charkour/react-reactions';
import Popup from 'reactjs-popup';
import { YoutubeCounter } from '@charkour/react-reactions';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { dark, docco, dracula, gruvboxDark, lightfair, solarizedDark, solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Light } from 'react-syntax-highlighter';
import { coldarkCold, lucario, materialDark, solarizedlight, twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';




const Post = forwardRef((props, ref) => {
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    const moment = require('moment');
    const specificDateTime = moment(props.timestamp, 'YYYY-MM-DD HH:mm:ss.SSS');
    const duration = moment(specificDateTime).fromNow();
    const [isReacting, setIsReacting] = useState(false);


    const toProperCase = (str) => {
        return str.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    const handleMouseOver = () => {
        setTimeout(() => {
            setIsReacting(true);
        }, 1000);
    }

    // this function is called when the mouse out box A
    const handleMouseOut = () => {
        setTimeout(() => {
            setIsReacting(false);
        }, 1000);
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

                <Markdown remarkPlugins={[remarkGfm]} marginBottom='4' className="markdown" children={props.textData}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }} 
                />


                {props.mediaData != [] && <MediaContentData style={{ margin: "auto" }} objectFit='cover' mediaData={props.mediaData} />}
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
                <Popup trigger={
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        Like
                    </Button>}
                    position='top center'
                    on='hover'
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                >
                    <GithubSelector />
                </Popup>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                </Button>



                {/* {
                    'position': 'absolute',
                    'width': '30px',
                    'height': '30px',
                    'background-color': 'blue',
                    'border-radius': '50 %',
                    'animation': 'blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate'
                } */}


            </CardFooter>
            {/* {isReacting && <GithubSelector onMouseOver={handleMouseOver} style={{
                'position': 'absolute',
                'width': '30px',
                'height': '30px',
                'animation': 'blinker 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite alternate',
                '&:hover': {
                    animationPlayState: 'paused'
                }
            }} />} */}



        </Card >

    );
});

export default Post;
