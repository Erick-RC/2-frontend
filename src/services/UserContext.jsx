import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    handleLogout(); // Manejar logout en caso de error de autorización
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (matricula, password) => {
        try {
            const res = await axios.post('http://localhost:3000/login', { matricula, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };