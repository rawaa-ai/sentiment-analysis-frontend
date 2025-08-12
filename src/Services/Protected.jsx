import React, { useEffect, useState } from "react"
import { checkAuth } from "./authService";
import { Navigate, Outlet } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { useColorDropdown } from "../Context/Theme";

const ProtectedRoutes = () => {
    const [authenticated, setAuthenticated] = useState(null);
    const { selectedScheme } = useColorDropdown(); 
    useEffect(() => {
        const verifyToken = async() => {
            const isAuthenticated = await checkAuth();
            setAuthenticated(isAuthenticated);
        };
        verifyToken();
    }, []);

    if (authenticated === null) return <div className="flex flex-col items-center justify-center font-bold font-mono h-screen" style={{
        background: selectedScheme.backgroundColor,
        color: selectedScheme.textColor
    }}>
        <CircularProgress size={80} className="text-white"/>Loading
    </div>;

    if (!authenticated) {
        return <Navigate to="/"/>
    }

    return <Outlet />;
}

export default ProtectedRoutes;