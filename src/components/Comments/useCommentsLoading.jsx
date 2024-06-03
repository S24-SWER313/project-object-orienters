import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../AuthProvider";
import ApiCalls from "../ApiCalls";


function useCommentsLoading(props) {
    const content = props.contentId;
    const { token } = useAuth();
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (token) {
                try {
                    const response = await ApiCalls.get(`http://localhost:8080/content/${content}/comments`);
                    if (response.data?._embedded?.commentList) {
                        setComments(response.data?._embedded?.commentList);
                        console.log("useCommentsLoading data", response.data?._embedded?.commentList);
                    }
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
        };

        fetchProfileData();
    }, [token, content]);

    const memoizedProfileData = useMemo(() => ({
        commentsList: comments
    }), [comments]);

    console.log("memo", memoizedProfileData);
    return memoizedProfileData;
}

export default useCommentsLoading;