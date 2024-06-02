import React, { useEffect, useContext, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TrendCard from './Trend/TrendCard';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

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
        <Flex direction={'column'} minHeight="100vh" background={"gray.300"}>
            <Header />
            <Box display="flex" flexDirection="row" flex="1">
                <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4" position="sticky" top="0">
                    <TrendCard />
                </Box>
                <Box flex="1" paddingTop="4">
                    {children}
                </Box>
            </Box>
            <Footer alignSelf={'flex-end'} mt="auto" />
        </Flex>
    );
}

export default MainLayout;
