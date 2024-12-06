import React from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useUserContext } from './UserProvider'

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useUserContext();
    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children;

}

export default ProtectedRoute