import React from 'react';
import { Box } from '@chakra-ui/react';
import TrendCard from './Treand/TrendCard';
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <Box display="flex" flexDirection="row" background={"lightblue"}>
                <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4" position="sticky" top="0">
                    <TrendCard />
                </Box>
                <Box flex="1" paddingTop="4">
                    {children}
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default MainLayout;
