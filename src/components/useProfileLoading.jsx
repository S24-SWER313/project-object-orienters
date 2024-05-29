// import { useEffect, useState, useMemo } from 'react';
// import { useAuth } from './AuthProvider';

// function useProfileLoading() {
//     const { user, token } = useAuth();
//     const [profileData, setProfileData] = useState(null);

//     useEffect(() => {
//         if (user && token) {
//             console.log('Fetching profile data for', user);
//             fetch(`http://localhost:8080/profiles/${user}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(response => {
//                 console.log("res");
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch profile data');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log("data");
//                 setProfileData(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching profile data:', error);
//             });
//         }
//     }, [user, token]);

//     const memoizedProfileData = useMemo(() => ({
//         profileData: profileData
//     }), [profileData, user]);

//     return memoizedProfileData;
// }

// export default useProfileLoading;




import { useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthProvider';

function useProfileLoading(props) {
    const profile = props.profile;
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (profile && token) {
            fetch(`http://localhost:8080/profiles/${profile}`, {
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
    }, [profile, token]);

    const memoizedProfileData = useMemo(() => ({
        profileData: profileData
    }), [profileData, profile]);

    return memoizedProfileData;
}

export default useProfileLoading;
