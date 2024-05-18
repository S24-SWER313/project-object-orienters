import React from 'react';
import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Card,
    CardHeader,
    CardBody,
} from '@chakra-ui/react';

function Trending() {
    return (
        <>
            <Card>
                <CardHeader>
                    <Heading size='md'>Trends</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='8'> {/* Increased spacing here */}
                        <Box>
                            <Heading size='xs'>UCL</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>Champions League</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>SOA</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>ReactJS</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>SpringBoot</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>Java</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>Web Development</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>HTML CSS</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>Python</Heading>
                        </Box>
                        <Box>
                            <Heading size='xs'>Microservices</Heading>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
};

export default Trending;
