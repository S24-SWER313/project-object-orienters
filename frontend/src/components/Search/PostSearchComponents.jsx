import React from 'react';
import {
  Box,
  Text,
  Image,
  Tag,
  HStack,
  VStack,
  Avatar
} from '@chakra-ui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function PostSearchComponents({ content, tags, timestamp, avatarImg, name, profession, username }) {
    const specificDateTime = new Date(timestamp);
    const userTimezoneOffset = specificDateTime.getTimezoneOffset() * 60000;
    const localTime = new Date(specificDateTime.getTime() - userTimezoneOffset);
    const duration = moment(localTime).fromNow();
    const navigate = useNavigate();
    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => navigate(`/profiles/${username}`)}>
            <HStack spacing={3}>
            <Avatar name={name} src={avatarImg} />
                <Text fontWeight="bold">{name}</Text>
                <Text fontWeight="bold">{profession}</Text>
            
            </HStack>
            <VStack align="start" spacing={2}>
                
                <Text>{content}</Text>
                <HStack spacing={1}>
                    {tags.split(',').map((tag, index) => (
                        <Tag key={index} size="sm" colorScheme="blue">{tag.trim()}</Tag>
                    ))}
                </HStack>
                <Text fontSize="sm" color="gray.500">{duration}</Text>
            </VStack>
        </Box>
    );
}

export default PostSearchComponents;
