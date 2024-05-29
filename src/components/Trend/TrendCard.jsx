import React, { useState, useEffect } from 'react';
import { Box, Heading, Stack, StackDivider, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function TrendCard() {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await fetch('http://localhost:8080/tags', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const trendsData = data._embedded?.tagList;
                if (trendsData && trendsData.length !== 0) {
                    setTrends(trendsData);
                }
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
                            <Link to={`/trends/${trend.tagName}`}>
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
