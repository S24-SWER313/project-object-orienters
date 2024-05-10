import {
    Box, Heading
} from '@chakra-ui/react';
import './App.css';
import PostList from './PostList';
import { Highlight } from '@chakra-ui/react'

function App() {
    return (
        <>
            <Box display='flex' flexDirection="column" alignItems="center" background={"lightblue"} >

                <Heading p={4} bg={'white'} as='h1' size='4xl' noOfLines={1} w={'99vw'} textAlign={'center'}>
                    TechSpot
                </Heading>
                <PostList />
            </Box>
        </>
    );
}

export default App;
