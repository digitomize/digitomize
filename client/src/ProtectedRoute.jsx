import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';

function ProtectedRoute() {
    const navigate = useNavigate()
    const { user } = useUserAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute