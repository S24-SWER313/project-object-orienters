import React, { useEffect, useState, forwardRef } from 'react';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Drawer, 
    DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, 
    Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text,
    ModalCloseButton,
    Modal,useDisclosure,
    ModalBody,
    ModalOverlay,
    ModalContent,
    
} from '@chakra-ui/react';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MediaContentData from './MediaContentData';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './style.css'; // Import your custom CSS'
import { ReactionBarSelector } from '@charkour/react-reactions';
import Popup from 'reactjs-popup';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { dark, docco, dracula, gruvboxDark, lightfair, solarizedDark, solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Light } from 'react-syntax-highlighter';
// import { coldarkCold, lucario, materialDark, solarizedlight, twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faHeart, faFaceLaughSquint, faHandsClapping, faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Anchor } from '@mui/icons-material';

import useProfileLoading from './useProfileLoading';
import { useParams } from 'react-router-dom';
import AddSharedPost from './AddSharedPost';


const Post = forwardRef(({ post }, ref) => {
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const { profile } = useParams();
    const moment = require('moment');
    const specificDateTime = moment(post.timestamp, 'YYYY-MM-DD HH:mm:ss.SSS');
    const duration = moment(specificDateTime).fromNow();
    const [isReacted, setIsReacted] = useState(false);
    const { user, token } = useAuth();
    const [reaction, setReaction] = useState('like');
    const [reactionCount, setReactionCount] = useState(post.numOfReactions);
    const [commentsCount, setCommentsCount] = useState(post.numOfComments);
    const [sharesCount, setSharesCount] = useState(post.numOfShares);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { profileData } = useProfileLoading({ profile });
    const { isOpenY, onOpenY, onCloseY } = useDisclosure();

    const toProperCase = (str) => {
        if (str == null) return null;
        return str.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    useEffect(() => {
        if (post?.contentAuthor?.profilePic) {
            const mimeType = post?.contentAuthor?.profilePic.type || 'application/octet-stream';
            const url = post.contentAuthor?.profilePic?.fileUrl
            setProfilePicUrl(url);
        }
    }, [post?.contentAuthor?.profilePic]);


    useEffect(() => {
        async function fetchData() {
            const response = await ApiCalls.get('/content/' + post.contentID + '/reactions/' + user);
            const data = await response.data;

            if (data.isReactor == true) {
                setIsReacted(true);
                setReaction(data.reactionType.toLowerCase());
            } else
                setIsReacted(false);
        }
        fetchData();
    }, []);


    const addReaction = async () => {
        console.log(post._links.reactions.href)
        try {
            const postData = {
                reactorID: user,
                reactionType: reaction.toUpperCase(),
            };
            const response = await ApiCalls.post(post._links.reactions.href, postData);
            if (!isReacted)
                setReactionCount((prev) => prev + 1);
            setIsReacted(true);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    }


    const removeReaction = async () => {
        console.log(post._links.deleteReaction.href)
        try {
            const response = await ApiCalls.delete(post._links.deleteReaction.href);
            if (isReacted)
                setReactionCount((prev) => prev - 1);
            setIsReacted(false);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const toggleReaction = async () => {

        if (isReacted)
            removeReaction();
        else
            addReaction();

        setIsReacted((prev) => !prev);

    }

    const getIcon = () => {

        if (!isReacted)
            return <FontAwesomeIcon icon={regularThumbsUp} />;

        switch (reaction) {
            case "like":
                return <FontAwesomeIcon icon={solidThumbsUp} />;
            case "dislike":
                return <FontAwesomeIcon icon={faThumbsDown} />;
            case "love":
                return <FontAwesomeIcon icon={faHeart} />;
            case "support":
                return <FontAwesomeIcon icon={faHandsClapping} />;
            case "haha":
                return <FontAwesomeIcon icon={faFaceLaughSquint} />;
            default:
                return <FontAwesomeIcon icon={regularThumbsUp} />;
        }


    }

    const openViewDetails = () => {
        onOpen();
    }


    const handleOpen = (e) => {     //TAKE THIS AND IMPORTS
        e.stopPropagation();
        onOpenY();
    };

    return (
        <>
            <Card ref={ref} key={post.contentID} w={[0.88, 0.9, 0.8]} maxW={550} m='2'>
                <CardHeader marginBottom='-6'>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={post.contentAuthor?.name} src={profilePicUrl || undefined} />
                            <Box alignItems="left">
                                <Heading size='sm' textAlign={['left']}>{toProperCase(post.contentAuthor?.name)}</Heading>
                                <Text fontSize='0.8em' textAlign={['left']}>{toProperCase(post.contentAuthor?.profession)}</Text>
                                <Text fontSize='0.7em' textAlign={['left']} color={'gray'} >{duration}</Text>
                            </Box>
                        </Flex>
                        {user == post.contentAuthor?.username && <Menu isLazy>
                            <MenuButton
                                as={IconButton}
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                            <MenuList>
                                <MenuItem>Edit Post</MenuItem>
                                <MenuItem color='red'>Delete Post</MenuItem>
                            </MenuList>
                        </Menu>}
                    </Flex>
                </CardHeader>
                <CardBody>

                    <Markdown remarkPlugins={[remarkGfm]} marginBottom='4' className="markdown" children={post.textData}
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


                    {post.mediaData != [] && <MediaContentData style={{ margin: "auto" }} objectFit='cover' mediaData={post.mediaData} />}
                    <Flex justifyContent="flex-end">
                        <Link color={'blue'} textDecor={'underline'} onClick={openViewDetails} height='30px'>View Details</Link>
                    </Flex>
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
                        <Button flex='1' variant='ghost' leftIcon={getIcon()} colorScheme={isReacted ? 'blue' : null} onClick={() => { setReaction('like'); toggleReaction() }}>
                            <Box as="span" mr="2">{reactionCount}</Box> Like
                        </Button>}
                        position='top center'
                        on='hover'
                        closeOnDocumentClick
                        mouseLeaveDelay={300}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: '0px', border: 'none' }}
                        arrow={false}
                    >
                        <ReactionBarSelector reactions={[
                            { label: "like", node: <div>👍</div>, key: "like" },
                            { label: "dislike", node: <div>👎</div>, key: "dislike" },
                            { label: "love", node: <div>❤️</div>, key: "love" },
                            { label: "support", node: <div>👏</div>, key: "support" },
                            { label: "haha", node: <div>😄</div>, key: "haha" },
                        ]}
                            iconSize='20px'
                            onSelect={(key) => {


                                setReaction(key);
                                addReaction();
                            }}
                        />
                    </Popup>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        <Box as="span" mr="2">{commentsCount}</Box> Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                        <Box as="span" mr="2">{sharesCount}</Box> Share
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



            </Card >

            <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Post Details</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>



            <Modal isOpen={isOpenY} onClose={onCloseY} isCentered >
                <ModalOverlay />
                <ModalContent maxW="32vw">
                    <ModalCloseButton mr={'-10px'} mt={'2px'} />
                    <ModalBody m={"10px"} >
                        <AddSharedPost sharedPost={post} />
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );

});

export default Post;



// public enum ReactionType {
//     LIKE, DISLIKE, LOVE, SUPPORT, HAHA
// }
