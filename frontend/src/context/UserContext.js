import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get('user');
        return savedUser ? JSON.parse(savedUser) : null; // Initialize user from cookie
    });
    const [loading, setLoading] = useState(true); // To manage loading states
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        if (user) {
            Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Update cookie on user change
        } else {
            Cookies.remove('user'); // Remove cookie if user logs out
        }
        setLoading(false);
    }, [user]);

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('/api/register', userData);
            setUser(response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials);
            setUser(response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post('/api/logout');
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Logout failed');
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/user');
            setUser(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user details');
        }
    };

    const resetPassword = async (data) => {
        try {
            await axios.post('/api/reset-password', data);
        } catch (err) {
            setError(err.response?.data?.message || 'Password reset failed');
        }
    };

    const clearError = () => {
        setError(null); // Clear error message
    };

    return (
        <UserContext.Provider value={{
            user,
            loading,
            error,
            registerUser,
            loginUser,
            logoutUser,
            getUserDetails,
            resetPassword,
            clearError,
        }}>
            {children}
        </UserContext.Provider>
    );
};
