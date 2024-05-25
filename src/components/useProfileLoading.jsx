import { useEffect, useState, useRef, useMemo } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

function useProfileLoading() {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    // <<<<<<< HEAD
    // const token = localStorage.getItem("token");

    // const memoizedProfileData = useMemo(() => fetch(`http://localhost:8080/profiles/${user}`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    // }).then(response => {
    //     console.log(user);
    //     if (response.ok) {
    //         return response.json();
    //     }
    // })
    //     .then(data => {
    //         setProfileData(data);
    //         return profileData;
    //     }), [token, user]);
    // console.log(memoizedProfileData);
    // return { memoizedProfileData };
    // =======

    useEffect(() => {
        console.log('fetching posts');
        console.log(localStorage.getItem("token"));
        console.log(user);
        fetch(`http://localhost:8080/profiles/${user}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            console.log(user);
            if (response.ok) {
            return response.json();
            }
        })
            .then(data => {
                setProfileData(data);
            });
    }, []);

    return { profileData };
}

export default useProfileLoading;

