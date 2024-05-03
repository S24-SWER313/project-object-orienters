import React from 'react';
import ActionButtons from './ActionButtons';
import MediaContentData from './MediaContentData';
import PostText from './PostText';
import UserHeader from './UserHeader';

function Post() {
    return (
        <div>
            <UserHeader />
            <PostText />
            <MediaContentData />
            <ActionButtons />
        </div>
    );
}

export default Post;