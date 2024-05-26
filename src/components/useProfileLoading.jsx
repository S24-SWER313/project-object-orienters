import { useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthProvider';

function useProfileLoading() {
    const { user, token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (user && token) {
            console.log('Fetching profile data for', user);
            fetch(`http://localhost:8080/profiles/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return response.json();
            })
            .then(data => {
                setProfileData(data);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
        }
    }, [user, token]);

    const memoizedProfileData = useMemo(() => ({
        profileData: profileData
    }), [profileData]);

    return memoizedProfileData;
}

export default useProfileLoading;
