// Import icons from react-icons
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi'; // Corrected import paths

// Import Chakra UI components
import {
    Card, CardHeader, CardBody, CardFooter,
    Avatar, Box, Heading, Text, Flex,
    IconButton, Image, Button
} from '@chakra-ui/react';

// Import custom components or styles
import './App.css';
import Post from './Post';

function App() {
    return (
        <div className="App">

            <Post />
        </div>
    );
}

export default App;
