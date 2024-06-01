import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedUser && storedToken && storedRefreshToken) {
            setUser(storedUser);
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
        }

    }, []);

    const loginAction = async ({ username, password }) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
               // throw new Error(data.errors || 'Failed to log in'); 
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.username);
            localStorage.setItem("refreshToken", data.refreshToken);
            setUser(localStorage.getItem("user"));
            setToken(localStorage.getItem("token"));
            setRefreshToken(localStorage.getItem("refreshToken"));
            toast({
                title: 'Login Success',
                description: "Welcome Back!",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: `top`
              });
            navigate("/home");
        } catch (error) {
            console.error('Login Error:', error);
            toast({
                title: "Login Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        }
    };

    const oauthLoginAction = async ({ id, username, provider }) => {
        console.log(id, username, provider);
        try {
            const response = await fetch('http://localhost:8080/auth/oauth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, username, provider }),
            });

            const data = await response.json();
            if(data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.username);
                localStorage.setItem('refreshToken', data.refreshToken);
                setUser(data.username);
                setToken(data.token);
                toast({
                    title: 'Login Success',
                    description: "Welcome!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: `top`
                  });
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Login Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: `top`
            });
        }

    };

    const registerLoggedInOAuthUser = async ({username, jwt, refreshToken}) => {
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', username);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(username);
        setToken(token);
        toast({
            title: 'Login Success',
            description: "Welcome!",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: `top`
          });
        navigate("/home");
    }

    const logOut = async () => {
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("refreshToken");
            setUser(null);
            setToken(null);
            setRefreshToken(null);
            toast({
                title: 'Logout Success',
                description: "See you soon!",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: `top`
              });
            navigate("/");
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };


    
    return (
        <AuthContext.Provider value={{ token, user,registerLoggedInOAuthUser, oauthLoginAction, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

