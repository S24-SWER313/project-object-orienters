import React from 'react'
import PostList from './PostList';
import { Box } from '@chakra-ui/layout';

function CodePage() {
    return (
        <Box width="100%" maxWidth="960px" >
            <h1>Code Page</h1>
            <PostList feedType='CODE' feedValue='python' offset={0} limit={5} />
        </Box>
    );
}

export default CodePage