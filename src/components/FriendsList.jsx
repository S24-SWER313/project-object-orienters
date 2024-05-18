import React, {useCallback, useState} from 'react';
import {Box, Flex, Heading, IconButton} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import FriendCard from './FriendCard'; // Import the new component

function FriendsList({users}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const cardsPerSlide = 3;
    const slidesCount = Math.ceil(users.length / cardsPerSlide);

    const handleSlideChange = useCallback((direction) => {
        setCurrentSlide(prev => {
            if (direction === 'next') {
                return Math.min(slidesCount - 1, prev + 1);
            } else {
                return Math.max(0, prev - 1);
            }
        });
    }, [slidesCount]);

    const getSlideTransform = () => {
        if (currentSlide === slidesCount - 1 && users.length % cardsPerSlide !== 0) {
            const remainingCards = users.length % cardsPerSlide;
            const lastSlideOffset = 100 - (remainingCards / cardsPerSlide * 100);
            return `translateX(-${100 * (slidesCount - 1) - lastSlideOffset}%)`;
        }
        return `translateX(-${currentSlide * 100}%)`;
    };

    const carouselStyle = {
        transition: "transform 0.6s ease", transform: getSlideTransform(),
    };

    return (<>
        <Box position="relative" display="flex" flexDirection="column" alignItems="center" justifyContent="center"
             bg="white" boxShadow="lg" rounded="lg" m="2" w={[0.88, 0.9, 0.8]} maxW="550px" p="4" h={"400px"}>
            <Heading size='md' alignSelf="flex-start" mb="4">Friends Suggestions</Heading>
            <IconButton
                icon={<ChevronLeftIcon/>}
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="2"
                onClick={() => handleSlideChange('prev')}
                isRound
                m="2"
                isDisabled={currentSlide === 0}
            />
            <Flex w="full" h="360px" overflow="hidden" alignItems="center" justifyContent="center">
                <Flex h="360px" w="full" style={carouselStyle} alignItems="center" justifyContent="flex-start">
                    {users.map((user, index) => (
                        <Box key={`profile-${index}`} w={`${100 / cardsPerSlide}%`} p="2" display="flex"
                             justifyContent="center" mx="4">>>
                            <FriendCard {...user} />
                        </Box>))}
                </Flex>
            </Flex>
            <IconButton
                icon={<ChevronRightIcon/>}
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="2"
                onClick={() => handleSlideChange('next')}
                isRound
                m="2"
                isDisabled={currentSlide === slidesCount - 1}
            />
        </Box>
    </>);
}

export default FriendsList;
