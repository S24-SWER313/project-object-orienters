import React from "react";
import {
    Box,
} from "@chakra-ui/react";
import "./App.css";
import PostList from "./PostList";
import Trending from './Trending';
import Header from './Header';
import CallerAddPost from './CallerAddPost';


function App() {
    return (
        <>
        
            <Header />
            
            <Box display='flex' flexDirection="row" alignItems="flex-start" background={"lightblue"} width="100%">
            
                <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4">
                    <Trending />
                </Box>

                <Box width="75%" paddingTop="4" display="flex" justifyContent="center">
                    
                    <Box width="100%" maxWidth="960px">
                    <CallerAddPost/>
                        <PostList />
                    </Box>
                </Box>
            </Box>
        </>
    );

}

export default App;