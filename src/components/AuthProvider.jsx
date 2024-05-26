import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

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
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.username);
            localStorage.setItem("refreshToken", data.refreshToken);
            setUser(data.username);
            setToken(data.token);
            navigate("/home");
        } catch (error) {
            console.error('Login Error:', error);
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
