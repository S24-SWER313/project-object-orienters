import React, { useEffect, useContext, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import {Grid, GridItem } from '@chakra-ui/react';

import TrendCard from './Trend/TrendCard';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import FriendsList from './FriendsList';
import { grey } from '@mui/material/colors';

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



    return (
      <Box bg={grey[100]} w={'100%'}>
        <Box as="header">
          <Header />
        </Box>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr 1fr' }} 
          px={'3%'} 
          py={'5%'}
          minH={'90vh'}
        >
          

          <GridItem align={'center'}>
            <TrendCard />
          </GridItem>
          <GridItem align={'center'}>
            <Box w={'85%'}>
            {children}
            </Box>
          
          </GridItem>
          <GridItem align={'center'}>
          <FriendsList  />
          </GridItem>
        </Grid>
        <Box as="footer">
          <Footer align={'flex-end'} minH={'10vh'}/>
        </Box>
        </Box>
    );
}

export default MainLayout;
