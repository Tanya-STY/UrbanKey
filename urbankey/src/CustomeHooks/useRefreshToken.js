import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('https://urbankey-backend.onrender.com/Refresh', {
                withCredentials: true
            });
        
        setAuth(prev => { //get previous state
            console.log(JSON.stringify(prev));
           
            return { 
                ...prev, 
                role: response?.data?.role,
                token: response?.data?.token} //override with new token
        });
        return response?.data?.token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }
    return refresh;
};

export default useRefreshToken;