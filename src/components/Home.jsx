import React from 'react';
import { Box } from "@chakra-ui/react";
import CallerAddPost from './CallerAddPost';
import PostList from './PostList';

function Home() {
    return (
        <Box width="100%"  >
            <CallerAddPost />
            <PostList feedType='ALL_USERS' feedValue='following' offset={0} limit={5} />

        </Box>
    );
}

export default Home;
