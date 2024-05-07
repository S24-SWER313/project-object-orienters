import { useEffect, useState, useRef } from 'react'
import axios from 'axios';

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
        // if (isInitialMount.current) {
        //     isInitialMount.current = false;
        //     return;
        // }
        if(!hasMore) return;
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: `http://localhost:8080/feed`,
            params: {
                feedType: feedType,
                value: feedValue,
                offset: offset,
                limit: limit,
                clientUsername: clientUsername
            }
        }).then((response) => {
            setPosts(prevPosts => {
                return [...prevPosts, ...response.data.data];
            });
            setHasMore(response.data.total > offset + limit);
            setLoading(false);
            console.log(response.data);
        }).catch((error) => {
            setError(true);
            console.log(error);
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