import React from "react";
import { Outlet } from "react-router-dom"; //render nested routes
import { useState, useEffect } from "react";
import useRefreshToken from '../CustomeHooks/useRefreshToken';
import useAuth from '../CustomeHooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true; //ensures that state updates are only made when component is still initialized and rendered

        const verifyRefreshToken = async () => { //refresh the authentication token 
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false); //loading process is complete
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false); //if theres no auth token, and persist is true, then verifyrefresh is called

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.token)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin