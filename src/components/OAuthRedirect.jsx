import { Button, Image, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function OAuthRedirect() {
    const location = useLocation();

    // Extract the query parameters
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const error = searchParams.get('error');
    const [username, setUsername] = useState('');

    console.log("id", id);
    console.log("error", error);

    const handleOauthSignup = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/oauth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, username }),
            });
           
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {error ? (
                <>
                    <div>Error: {error}</div>
                    <Button href="/login">Go back to login</Button>
                </>

            ) : (
                <>
                    <div>Success! Complete your profile</div>
                    <Input placeholder="Username" onChange={(e)=>{
                        setUsername(e.target.value);
                    }} />
                    <Button onClick={handleOauthSignup}>Complete</Button>
                </>
            )}
        </div>
    );
}

export default OAuthRedirect;
