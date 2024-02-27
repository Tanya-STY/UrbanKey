// import React from 'react';
// import { useNavigate, Outlet } from "react-router-dom";
// import { useAuth } from "../Provider/AuthProvider";

// export const ProtectedRoute = () => {
//     const { token } = useAuth();
//     const navigate = useNavigate();

//     if (!token) {
//         navigate('/Login');
//         return null;
//     }

//     // if authenticated, render the child routes
//     return <Outlet />

// }