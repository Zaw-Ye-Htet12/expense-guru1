import React, { useContext } from 'react'
import axiosInstance from '@/lib/axios';
import { AuthContext } from '@/components/context/AuthContext';
import { useToastHook } from './useToastHook';

const useRefreshToken = () => {
    const { setAccessToken } = useContext(AuthContext);

    const refresh = async () => {
        try {
            const response = await axiosInstance.get('/auth/refresh', {
                withCredentials: true
            });
            setAccessToken(response.data.accessToken);
            return response.data.accessToken;    
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem("userData");
                setAccessToken(null);
            }
        }
    }
    return refresh
}

export default useRefreshToken