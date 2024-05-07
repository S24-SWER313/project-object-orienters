// Import icons from react-icons
import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text
} from '@chakra-ui/react';
// Import custom components or styles
import './App.css';
import PostList from './PostList';


function App() {


    


    return (




        <>

            {/* style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'lightblue'

        }} */}

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
