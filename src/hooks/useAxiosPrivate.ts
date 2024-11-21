import React, { useContext, useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { AuthContext } from '@/components/context/AuthContext';
import { axiosPrivateInstance } from '@/lib/axios';
import { useLogout } from './useLogout';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    }
  }, [accessToken, refresh])

  return axiosPrivateInstance;
}

export default useAxiosPrivate;