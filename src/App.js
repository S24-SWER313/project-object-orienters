// Import icons from react-icons
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
// Import custom components or styles
import './App.css';
import PostList from './PostList';

function App() {

    return (<>

        <div display='flex'  p={4} flexDirection="column" alignItems="center" background={"lightblue"} >
            <Heading as='h1' size='4xl' noOfLines={1}>
                TechSpot
            </Heading>
            <PostList />
        </div>
    </>


    );
}

export default App;
