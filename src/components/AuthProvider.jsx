import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async ({ username, password }) => {
        try {
            fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data.username);
                    setToken(data.token);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    navigate("/home");
                    return;
                })
                .catch((error) => {
                    console.error('Error:', error);
                }
                );


        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {

        fetch('http://localhost:8080/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(null);
                setToken("");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};