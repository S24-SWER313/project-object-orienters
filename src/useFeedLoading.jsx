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
        // if (isInitialMount.current) {
        //     isInitialMount.current = false;
        //     return;
        // }
        if(!hasMore) return;
        setLoading(true);
        setError(false);
        fetch(`http://localhost:8080/feed?feedType=${feedType}&value=${feedValue}&offset=${offset}&limit=${limit}&clientUsername=${clientUsername}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
            setPosts(prevPosts => {
                return [...prevPosts, ...data.data];
            });
            setHasMore(data.total > offset + limit);
            setLoading(false);
            console.log(data);
          }).catch(error => {
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