import { useEffect, useState, useRef } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

function useProfileLoading() {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
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

