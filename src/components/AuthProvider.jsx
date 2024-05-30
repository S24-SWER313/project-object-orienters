import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
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
                throw new Error(data.errors || 'Failed to log in'); 
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.username);
            localStorage.setItem("refreshToken", data.refreshToken);
            setUser(data.username);
            setToken(data.token);
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
            setUser(null);
            setToken(null);
            toast({
                title: 'Logout Success',
                description: "See you soon!",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: `top`
              });
            navigate("/login");
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
