import { useEffect, useState, useRef, useMemo } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

function useProfileLoading() {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const token = useAuth();

    const memoizedProfileData = useMemo(() => fetch(`http://localhost:8080/profiles/${user}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(response => {
        console.log(user);
        if (response.ok) {
        return response.json();
        }
    })
        .then(data => {
            setProfileData(data);
        }), [token, user]);

    return { memoizedProfileData };
}

export default useProfileLoading;

