import React, { useEffect, useState } from 'react';

import Post from './Post';
// Assume these components are adjusted to fit Chakra UI components as needed

function PostList() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState({ name: '', profession: '', profilePic: '' });

    useEffect(() => {
        fetch('http://localhost:8080/profiles/ybandak/posts')
            .then((res) => res.json())
            .then((data) => {
                if (data._embedded && data._embedded.postList) {
                    const postList = data._embedded.postList;
                    setPosts(postList);

                    if (postList.length > 0) {
                        const authorData = postList[0].contentAuthor;
                        setAuthor({
                            name: authorData.name,
                            profession: authorData.profession || 'Unknown Profession',
                            profilePic: authorData.profilePic?.data || '/default-profile.jpg',
                        });
                    }
                }
            })
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (<>
        {
            posts.map((post) => (
                <Post key={post.contentID} contentID={post.contentID} timestamp={post.timestamp} textData={post.textData} mediaData={post.mediaData} authorName={author.name} authorProfilePic={author.profilePic} authorProfession={author.profession}/>
            ))
        }
    </>);
}

export default PostList;
