import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';

function ProtectedRoute() {
    const { user } = useUserAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login?message=Please login first!" />
    )
}

export default ProtectedRoute