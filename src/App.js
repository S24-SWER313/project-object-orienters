import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import PostList from "./components/PostList";
import Trending from './components/Trending';
import Header from './components/Header';
import CallerAddPost from './components/CallerAddPost';
import FriendsList from "./components/FriendsList";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
//import ProfilePage from "./components/ProfilePage";

function App() {

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
        <>
     <SignUp />
     
         <LogIn />
         </>
        // <>
        //     <Header/>

        //     <Box display='flex' flexDirection="row" alignItems="flex-start" background={"lightblue"} width="100%">
        //         <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4">
        //             <Trending/>
        //         </Box>

        //         <Box width="75%" paddingTop="4" display="flex" justifyContent="center">
        //             <Box width="100%" maxWidth="960px">

        //                 <CallerAddPost/>
        //                 <FriendsList users={users}/>
        //                 <PostList/>


        //             </Box>
        //         </Box>
        //     </Box>
        //</>
    );
}

export default App;
