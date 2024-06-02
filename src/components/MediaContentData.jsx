import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, HStack } from "@chakra-ui/react";

function MediaContentData({ mediaData }) {
    const [mediaContent, setMediaContent] = useState([]);
    const [loadError, setLoadError] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);

    useEffect(() => {
        let newMediaContent = [];
        if (mediaData) {
            try {
                mediaData.forEach((mediaItem) => {
                    const mimeType = mediaItem.type || 'application/octet-stream';
                    const objectUrl = mediaItem.fileUrl;
                    const elementId = `media-${mediaItem.id}`; 
                    const commonStyles = { 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '20px',
                        cursor: mimeType.split('/')[0] === 'image' || mimeType.split('/')[0] === 'video' ? 'pointer' : 'default' 
                    };
                    switch (mimeType.split('/')[0]) {
                        case 'image':
                            newMediaContent.push(
                                <img key={elementId} id={elementId} src={objectUrl} alt={mediaItem.fileName} style={commonStyles} onClick={() => toggleFullscreen(elementId)}/>
                            );
                            break;
                        case 'video':
                            newMediaContent.push(
                                <video key={elementId} id={elementId} controls style={commonStyles}>
                                    <source src={objectUrl} type={mimeType} />
                                </video>
                            );
                            break;
                        case 'audio':
                            newMediaContent.push(
                                <audio key={elementId} id={elementId} controls style={commonStyles}>
                                    <source src={objectUrl} type={mimeType} />
                                </audio>
                            );
                            break;
                        default:
                            console.error('Unsupported media type:', mimeType);
                    }
                });
                setMediaContent(newMediaContent);
                setLoadError(false);
            } catch (error) {
                console.error('Error processing media data:', error);
                setLoadError(true);
            }
        }
    }, [mediaData]);

    const toggleFullscreen = (id) => {
        const element = document.getElementById(id);
        if (element) {
            if (!document.fullscreenElement) {
                element.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        } else {
            console.error('Element not found:', id);
        }
    };


    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = mediaContent.length;

    const arrowStyles = {
        cursor: "pointer",
        pos: "absolute",
        top: "50%",
        w: "auto",
        mt: "-22px",
        p: "16px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "opacity 0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        opacity: showNavigation ? 1 : 0, 
        _hover: {
            opacity: 1,
            bg: "black",
        },
    };

    return (
        <Flex
            w="full"
            p={0}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            position="relative"
            onMouseOver={() => setShowNavigation(true)}
            onMouseOut={() => setShowNavigation(false)}
        >
            <Flex w="full" h="400px" overflow="hidden">
                <Flex w={`${slidesCount * 100}%`} transition="all .5s" transform={`translateX(-${currentSlide * 100}%)`}>
                    {mediaContent.map((content, index) => (
                        <Box key={index} w="full" flex="none">
                            {content}
                        </Box>
                    ))}
                </Flex>
            </Flex>
            {slidesCount > 1 && (
                <>
                    <Text {...arrowStyles} left="0" onClick={() => setCurrentSlide((currentSlide - 1 + slidesCount) % slidesCount)}>
                        &#10094;
                    </Text>
                    <Text {...arrowStyles} right="0" onClick={() => setCurrentSlide((currentSlide + 1) % slidesCount)}>
                        &#10095;
                    </Text>
                </>
            )}
            <HStack justify="center" pos="absolute" bottom="20px" w="full" spacing="20px" opacity={showNavigation ? 1 : 0} transition="opacity 0.6s ease">
                {Array.from({ length: slidesCount }).map((_, slide) => (
                    <Box
                        key={slide}
                        cursor="pointer"
                        boxSize="15px"
                        m="0 2px"
                        bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
                        rounded="full"
                        onClick={() => setCurrentSlide(slide)}
                    ></Box>
                ))}
            </HStack>
        </Flex>
    );
}

export default MediaContentData;
