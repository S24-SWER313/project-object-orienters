import React from 'react';
import { Box } from "@chakra-ui/react";
import CallerAddPost from './CallerAddPost';
import FriendsList from './FriendsList';
import PostList from './PostList';

function Home() {
    return (
        <Box width="100%"  >
            <CallerAddPost />
            {/* <FriendsList users={users} /> */}
            <PostList feedType='ALL_USERS' feedValue='following' offset={0} limit={5} />

        </Box>
    );
}

export default Home;
