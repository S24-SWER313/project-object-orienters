import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';


function OAuthLogin() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const jwt = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const username = searchParams.get('username');

    const { registerLoggedInOAuthUser } = useAuth();


    useEffect(() => {
        if (jwt && refreshToken && username) {
            registerLoggedInOAuthUser({ username,  jwt, refreshToken });
        }
    }, [])
    

    return (
        <></>
    )
}

export default OAuthLogin
