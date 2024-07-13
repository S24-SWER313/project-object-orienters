import React, { useState, useEffect } from 'react';
import { Box, Heading, Stack, StackDivider, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import ApiCalls from '../ApiCalls';

function TrendCard() {
    const [trends, setTrends] = useState([]);
    const location = useLocation();

    const getInitialSelectedTag = () => {
        const path = location.pathname;
        const match = path.match(/\/trends\/(.+)/);
        return match ? match[1] : null;
    };

    const [selectedTag, setSelectedTag] = useState(getInitialSelectedTag);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await ApiCalls.get('/tags');
                const trendsData = response.data._embedded?.tagList;
        
                if (trendsData && trendsData.length !== 0) {
                    setTrends(trendsData);
                }
            } catch (error) {
                console.error('Error fetching trends:', error);
                //throw new Error(`HTTP error! Status: ${error.response ? error.response.status : "No response"}`);
            }
        };
        fetchTrends();
    }, []);

    useEffect(() => {
        const path = location.pathname;
        const match = path.match(/\/trends\/(.+)/);
        if (!match) {
            setSelectedTag(null);
        }
    }, [location]);

    return (
        <Card 
        w={'100%'} 
        boxShadow="lg"
        rounded="lg"
        textAlign={'left'}
        >
            <CardHeader>
                <Heading size='md'
                >Trends</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='3' fontSize={'lg'}>
                    {trends.map(trend => (
                        <Box 
                            key={trend.tagName}
                            _hover={{ bg: 'gray.100', color: 'black' }}
                            borderRadius='md'
                            p='2'
                            rounded={"10px"}
                            bg={selectedTag === trend.tagName ? 'blue.500' : 'transparent'}
                            color={selectedTag === trend.tagName ? 'white' : 'inherit'}
                            onClick={() => setSelectedTag(trend.tagName)}
                        >
                            <Link
                                to={`/trends/${trend.tagName}`}
                                style={{ textDecoration: 'none' }}
                                _hover={{ color: 'white' }}
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
