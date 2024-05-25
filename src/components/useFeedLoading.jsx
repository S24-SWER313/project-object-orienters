import { useEffect, useState, useRef } from 'react';

function useFeedLoading(feedType, feedValue, offset, limit, clientUsername) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPosts([]);
    }, [feedType, feedValue]);

    useEffect(() => {
        if (!hasMore) return;
        setLoading(true);
        setError(false);
        fetch(`http://localhost:8080/feed?feedType=${feedType}&value=${feedValue}&offset=${offset}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status === 401 || response.status === 403) {
                console.log(response.status);
                localStorage.removeItem('token');
                //window.location.href = '/login';
            }
        })
            .then(data => {
                if (Array.isArray(data._embedded.postList)) {
                    setPosts(prevPosts => [...prevPosts, ...data._embedded.postList]);
                    setHasMore(data.page.totalPages > offset + 1);
                } else {
                    console.error('Expected data.data to be an array but received:', data._embedded.postList);
                }
                setLoading(false);
            }).catch(error => {
                setError(true);
                // console.error('Failed to fetch posts:', error);
                //throw new Error('Failed to fetch posts');
            });
    }, [feedType, feedValue, offset, limit]);

    return { loading, error, posts, hasMore };
}

export default useFeedLoading;

// enum FeedType {
//     ALL_USERS,
//     ONE_USER,
//     TOPIC
// }
