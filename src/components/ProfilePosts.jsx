import React, { useState, useEffect } from 'react';
import Post from './Post';
import SharedPost from './SharedPost';
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';
import ApiCalls from './ApiCalls';

function ProfilePosts({ postsURI }) {
    const [posts, setPosts] = useState([]);
    const [sharedPosts, setSharedPosts] = useState([]);
    const [mixedPosts, setMixedPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });

    useEffect(() => {
        const fetchPosts = async () => {
            if (postsURI) {
                setLoading(true);
                setError(null);
                try {
                    const response = await ApiCalls.get(postsURI);
                    const data = response.data;
                    if (data._embedded?.postList) {
                        setPosts(data._embedded.postList);
                    }
                    if (data._embedded?.sharedPostList) {
                        setSharedPosts(data._embedded.sharedPostList);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                    setError("Failed to load posts");
                    setLoading(false);
                }
            }
        };

        fetchPosts();
    }, [postsURI, token]);

    useEffect(() => {
        setMixedPosts([...posts, ...sharedPosts].sort((a, b) => {
            let dateA = new Date(a.timestamp);
            let dateB = new Date(b.timestamp);
            return dateB - dateA;  
        }));
    }, [posts, sharedPosts]);

    return (
        <>
            {mixedPosts.map((post, index) => {
                if (post.contentType === "Post") {
                    if (mixedPosts.length === index + 1) {
                        return <Post
                            key={post.contentID || index}
                            post={post}
                        />
                    } else {
                        return <Post
                            key={post.contentID || index}
                            post={post}
                        />
                    }
                } else {
                    return <SharedPost key={post.contentID} sharedPost={post} />

                }
            }
            )}
        </>
    );
}

export default ProfilePosts;
