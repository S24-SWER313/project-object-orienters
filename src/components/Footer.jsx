import React from 'react';
import {
    Box,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            mt={2}
            as="footer"
            bg={useColorModeValue('gray.50', 'gray.900')}
            py={3}
            >
            <Text>© Object Orienters</Text>
        </Box>
    );
}
