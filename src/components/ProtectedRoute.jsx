import React from "react";
import {Navigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';


export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    //If user is not logged in redirect to login
    if(!user) {
        return <Navigate to="/login" />;
    }

    
    //If user is logged in show protected page
    return children;
}

//done