import { useEffect, useState, useRef } from 'react';
import ApiCalls from './ApiCalls';

function useFeedLoading(feedType, feedValue, offset, limit, clientUsername) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [sharedPosts, setSharedPosts] = useState([]);
    const [mixedPosts, setMixedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPosts([]);
        setSharedPosts([]);
    }, [feedType, feedValue]);

    useEffect(() => {
        const fetchFeed = async () => {
            if (!hasMore) return;
            setLoading(true);
            setError(false);

            try {
                const response = await ApiCalls.get(`/feed?feedType=${feedType}&` +( feedValue ? `value=${feedValue}` : '') + `&offset=${offset}&limit=${limit}`);
                const data = response.data;

                if (Array.isArray(data?._embedded?.postList)) {
                    setPosts(prevPosts => [...prevPosts, ...data._embedded.postList]);
                    setHasMore(data.page.totalPages > offset + 1);
                }
                if (Array.isArray(data?._embedded?.sharedPostList)) {
                    setSharedPosts(prevShared => [...prevShared, ...data._embedded.sharedPostList]);
                    setHasMore(data.page.totalPages > offset + 1);
                }
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('token');
                    // window.location.href = '/login'; // Uncomment if you want to redirect to login page
                } else {
                    console.error('Failed to fetch posts:', error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, [feedType, feedValue, offset, limit, hasMore]);

    useEffect(() => {
        setMixedPosts([...posts, ...sharedPosts].sort((a, b) => {
            let dateA = new Date(a.timestamp);
            let dateB = new Date(b.timestamp);
            return dateB - dateA;  
        }));
    }, [posts, sharedPosts]);

    return { loading, error, mixedPosts, hasMore };
}

export default useFeedLoading;
