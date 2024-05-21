
import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import PostFollowersFollowingTabs from './components/PostFollowersFollowingTabs';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import FriendsList from './components/FriendsList';
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { Box } from "@chakra-ui/react";


function App() {

    const users = [
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
        },
        {
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


        <MainPage />
        // <>
        //
        //         <FriendsList users={users} />
        //
        // </>

        // <Router>
        //     <Header />
        //     <MainLayout>
        //         <Routes>
        //             <Route path="/profile" element={<ProfilePage
        //                 name="Christian Buehner"
        //                 jobTitle="Photographer"
        //                 email="chris@buehner.com"
        //                 avatarImageUrl="https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        //                 backgroundImage="https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        //                 followers="15k"
        //                 following="20k"
        //                 posts="10"
        //             />} />
        //             <Route path="/posts-followers-following" element={<PostFollowersFollowingTabs />} />
        //             <Route path="/" element={<Home/>} />  // Pass the users to the Home component
        //         </Routes>
        //     </MainLayout>
        //     <Footer />
        // </Router>

    );
}

export default App;
