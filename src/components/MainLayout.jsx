import React, { useEffect, useContext, useState } from 'react';
import { Box,Flex } from '@chakra-ui/react';
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
        <>
            <Flex direction={'column'} minH={'90vh'} background={"gray.300"}>
                <Header />
                <Box display="flex" flexDirection="row" >
                    <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4" position="sticky" top="0">
                        <TrendCard />
                    </Box>
                    <Box flex="1" paddingTop="4">
                        {children}
                    </Box>
                </Box>
            </Flex>
            <Footer align={'flex-end'} minH={'10vh'}/>
        </>
    );
}

export default MainLayout;
