import { useEffect, useState, useRef } from 'react'

function useFeedLoading(feedType, feedValue, offset, limit, clientUsername) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const isInitialMount = useRef(true);
    useEffect(() => {
        setPosts([]);
    }, [feedType, feedValue])

    useEffect(() => {
        if (!hasMore) return;
        setLoading(true);
        setError(false);
        fetch(`http://localhost:8080/feed?feedType=${feedType}&value=${feedValue}&offset=${offset}&limit=${limit}&clientUsername=${clientUsername}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                if (Array.isArray(data.data)) {  // Check if data.data is an array
                    setPosts(prevPosts => {
                        return [...prevPosts, ...data.data];
                    });
                    setHasMore(data.total > offset + limit);
                } else {
                    console.error('Expected data.data to be an array but received:', data.data);
                }
                setLoading(false);
            }).catch(error => {
            setError(true);
            console.error('Failed to fetch posts:', error);
        })
    }, [feedType, feedValue, offset, limit])



    return { loading, error, posts, hasMore }
}

export default useFeedLoading

// enum FeedType {
//     ALL_USERS,
//     ONE_USER,
//     TOPIC
// }
