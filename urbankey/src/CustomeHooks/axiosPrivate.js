// This custom hook, useAxiosPrivate, is designed to provide an Axios instance with built-in functionality for handling authentication tokens and automatic token refreshing. 
// It utilizes the useRefreshToken and useAuth hooks to access authentication-related state and functionality. 
// The Axios instance created here includes request and response interceptors to automatically attach the authentication token to outgoing requests and handle token refreshing in case of a 403 (Forbidden) response. 
// By encapsulating this logic within a custom hook, components can easily access a pre-configured Axios instance for making authenticated requests while abstracting away the complexities of token management and refreshing.

import axios from 'axios';
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosInstance;
}

export default useAxiosPrivate;
