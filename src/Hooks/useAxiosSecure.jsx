import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://collaborative-study-server-az9x.vercel.app",
});

const useAxiosSecure = () => {
  const { LogOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        const token = localStorage.getItem("access-token");
        if ((status === 401 || status === 403) && token) {
          localStorage.removeItem("access-token");
          if (LogOutUser) {
            await LogOutUser();
          }
          if (window.location.pathname.startsWith("/dashboard") || window.location.pathname.startsWith("/payment")) {
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [LogOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;