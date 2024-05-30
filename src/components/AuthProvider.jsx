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
            setRefreshToken(data.refreshToken);
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
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
