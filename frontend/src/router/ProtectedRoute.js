import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>; // Display loading while checking auth status

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
