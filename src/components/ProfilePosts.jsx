import React, { useState, useEffect } from 'react';
import Post from './Post';
import useProfileLoading from './useProfileLoading';
import { useAuth } from './AuthProvider';

function ProfilePosts({ postsURI }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user, token } = useAuth();
    const { profileData } = useProfileLoading({ profile: user });

    useEffect(() => {
        if (postsURI) {
            setLoading(true);
            setError(null);
            fetch(postsURI, { 
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data._embedded?.postList) {
                        setPosts(data._embedded.postList);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch posts:", error);
                    setError("Failed to load posts");
                    setLoading(false);
                });
        }
    }, [postsURI, token]);

    return (
        <>
            {posts.map((post, index) => {
               // console.log(posts.length);
                if (posts.length === index + 1) {
                    return <Post
                        key={post.contentID || index}
                        contentID={post.contentID}
                        timestamp={post.timestamp}
                        textData={post.textData}
                        mediaData={post.mediaData}
                        authorName={post.contentAuthor.name}
                        authorProfilePic={post.contentAuthor.profilePic || '/default-profile.jpg'}
                        authorProfession={post.contentAuthor.profession || 'No Profession'}
                        numOfReactions={post.numOfReactions}
                        numOfComments={post.numOfComments}
                        numOfShares={post.numOfShares}
                        reactionsUrl={post._links.reactions.href}
                        commentsUrl={post._links.comments.href}
                        selfUrl={post._links.self.href}
                        authorUrl={post._links.author.href}
                    />

                } else {
                    return <Post
                        key={post.contentID || index}
                        contentID={post.contentID}
                        timestamp={post.timestamp}
                        textData={post.textData}
                        mediaData={post.mediaData}
                        authorName={post.contentAuthor.name}
                        authorProfilePic={post.contentAuthor.profilePic || '/default-profile.jpg'}
                        authorProfession={post.contentAuthor.profession || 'No Profession'}
                        numOfReactions={post.numOfReactions}
                        numOfComments={post.numOfComments}
                        numOfShares={post.numOfShares}
                        reactionsUrl={post._links.reactions.href}
                        commentsUrl={post._links.comments.href}
                        selfUrl={post._links.self.href}
                        authorUrl={post._links.author.href}
                    />
                }
            }
            )}
        </>
    );
}

export default ProfilePosts;
