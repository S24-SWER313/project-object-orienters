import React, { useRef, useState, useCallback } from 'react';
import Post from './Post';
import useFeedLoading from './useFeedLoading'

function PostList() {
    //const [posts, setPosts] = useState([]);


    // useEffect(() => {
    //     fetch('http://localhost:8080/feed?ClientUsername=hello', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setPosts(data);
    //     })
    //     .catch(error => console.error('Error fetching posts:', error));
    // }, []);

    const [feedType, setFeedType] = useState('ALL_USERS');
    const [feedValue, setFeedValue] = useState('following');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);

    const {
        posts,
        loading,
        error,
        hasMore
    } = useFeedLoading(feedType, feedValue, offset, limit, "Yousef");

    console.log(posts);

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            console.log(entries);
            console.log("is interset" + entries[0].isIntersecting);
            console.log("hasMore" + hasMore);
            if (entries[0].isIntersecting && hasMore) {
                console.log('Visible');
                setOffset(prevOffset => prevOffset + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    //const [clientUsername, setClientUsername] = useState('hello');

    //, setPosts);


    return (
        <>
            {posts.map((post, index) => {
                if (posts.length === index + 1) {

                    // return <div style={{
                    //     color: 'red',
                    //     fontSize: '20px',
                    //     margin: 50
                    // }} ref={lastPostElementRef} key={index}>{post.textData}</div>

                   return <Post
                        key={post.contentID || index}
                        ref={lastPostElementRef}
                        contentID={post.contentID}
                        timestamp={post.timestamp}
                        textData={post.textData}
                        mediaData={post.mediaData}
                        authorName={post.contentAuthor.name}
                        authorProfilePic={post.contentAuthor.profilePic?.data || '/default-profile.jpg'}
                        authorProfession={post.contentAuthor.profession || 'No Profession'}
                    />

                } else {
                   return <Post
                        key={post.contentID || index}
                        contentID={post.contentID}
                        timestamp={post.timestamp}
                        textData={post.textData}
                        mediaData={post.mediaData}
                        authorName={post.contentAuthor.name}
                        authorProfilePic={post.contentAuthor.profilePic?.data || '/default-profile.jpg'}
                        authorProfession={post.contentAuthor.profession || 'No Profession'}
                    />

                    // return <div style={{
                    //     color: 'red',
                    //     fontSize: '20px',
                    //     margin: 50
                    // }} ref={lastPostElementRef} key={index}>{post.textData}</div>
                }
            }
            )}
        </>
    );
}

export default PostList;
