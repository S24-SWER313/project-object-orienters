import React, { useEffect, useState } from 'react';
import Post from './Post';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/feed?ClientUsername=hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <>
            {posts.map((post, index) => (
                <Post
                    key={post.contentID || index}
                    contentID={post.contentID}
                    timestamp={post.timestamp}
                    textData={post.textData}
                    mediaData={post.mediaData}
                    authorName={post.contentAuthor.name}
                    authorProfilePic={post.contentAuthor.profilePic?.data || '/default-profile.jpg'}
                    authorProfession={post.contentAuthor.profession || 'Unknown Profession'}
                />
            ))}
        </>
    );
}

export default PostList;
