import { Outlet, Navigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';

function ProtectedRoute() {
    let { user } = useUserAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute