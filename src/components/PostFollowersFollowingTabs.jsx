import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function PostFollowersFollowingTabs() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const tab = query.get('tab');

    // Adjust indices to match the new order where 'posts' is first
    const tabIndex = tab === 'followers' ? 1 : (tab === 'following' ? 2 : 0);

    // Handle changing of tabs
    const handleTabChange = (index) => {
        // Array to map index to parameters with 'posts' as the first tab
        const tabParams = ['posts', 'followers', 'following'];
        const tabParam = tabParams[index];
        navigate(`?tab=${tabParam}`, { replace: true });
    };

    return (
        <Tabs index={tabIndex} onChange={handleTabChange}>
            <TabList>
                <Tab>Posts</Tab>
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>List of Posts</p>
                </TabPanel>
                <TabPanel>
                    <p>List of Followers</p>
                </TabPanel>
                <TabPanel>
                    <p>List of Following</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default PostFollowersFollowingTabs;
