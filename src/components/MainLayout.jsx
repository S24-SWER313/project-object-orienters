import {Box} from "@chakra-ui/react";
import Trending from "./Trending";
import React from "react";

function MainLayout({ children }) {
    return (
        <Box display="flex" flexDirection="row" background={"lightblue"}>
            <Box width="30%" paddingTop="6" paddingRight="5" paddingLeft="4" position="sticky" top="0">
                <Trending /> {/* Trending is now part of the main layout */}
            </Box>
            <Box flex="1" paddingTop="4">
                {children}
            </Box>
        </Box>
    );
}
export default MainLayout;
