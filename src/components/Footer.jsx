import React from 'react';
import {
    Box,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            py={4}>
            <Text>© Object Orienters</Text>
        </Box>
    );
}
