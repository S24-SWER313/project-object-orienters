import React, { useEffect, useContext, useState } from 'react';
import { Box,Flex } from '@chakra-ui/react';
import TrendCard from './Trend/TrendCard';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import FriendsList from './FriendsList';

function MainLayout({ children }) {
    const navigate = useNavigate();

    const handleIsSignedIn = () => {
        if (localStorage.getItem("token") == null) {
            navigate("/login");
        }
    }
    useEffect(() => {
        handleIsSignedIn();
    }, []);







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
        <Box bg={'gray.100'}>
          <Box as="header">
          <Header />
          </Box>
          <Flex direction="column" minHeight="calc(100vh - headerHeight - footerHeight)">
            <Flex flex="1" p="4" justify="space-between">
              <Box pt={2} >
                <TrendCard />
              </Box>
              <Box >
                {children}
              </Box>
              <Box pt={2} >
                {/* <TrendCard /> */}
                <FriendsList users={users} />
              </Box>
            </Flex>
          </Flex>
    
          {/* Footer */}
          <Box as="footer">
           <Footer align={'flex-end'} minH={'10vh'}/>
          </Box>
        </Box>
      );
}

export default MainLayout;
