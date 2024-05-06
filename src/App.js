// Import icons from react-icons
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';

// Import custom components or styles
import './App.css';
import PostList from './PostList';

function App() {
    return (
            <Box display="flex" flexDirection="column" alignItems="center" >
                <PostList />
            </Box>

    );
}

export default App;
