import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Card,
    CardHeader,
    CardBody,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function TrendCard() {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await axios.get('http://localhost:8080/feed?clientUsername=hello&feedType=TAGS&limit=10&offset=0');
                const trendsData = response.data._embedded.tagList;
                setTrends(trendsData);
            } catch (error) {
                console.error('Error fetching trends:', error);
            }
        };

        fetchTrends();
    }, []);


    return (
        <Card mb={1}>
            <CardHeader>
                <Heading size='md'>Trends</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='8'>
                    {trends.map(trend => (
                        <Box key={trend.tagName}>
                            <Link
                                to={`TrendPage/${trend.tagName}`}
                            >
                                #{trend.tagName}
                            </Link>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
}

export default TrendCard;
