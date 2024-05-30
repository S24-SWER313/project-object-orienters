import React from 'react';
import { Box } from "@chakra-ui/react";
import CallerAddPost from './CallerAddPost';
import FriendsList from './FriendsList';
import PostList from './PostList';

function Home() {
    const users = [{
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    }, {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    },

    {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    },

    {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    }, {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    }, {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    }, {
        name: "Christian Buehner",
        jobTitle: "Photographer",
        email: "chris@buehner.com",
        avatarImageUrl: "https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        backgroundImage: "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        followers: "15k",
        following: "20k",
    }

    ];
    return (
        <Box width="100%" maxWidth="960px" >
            <CallerAddPost />
            <FriendsList users={users} />
            <PostList feedType='ALL_USERS' feedValue='following' offset={0} limit={5} />

        </Box>
    );
}

export default Home;
