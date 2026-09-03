import axios from "axios";

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://collaborative-study-server-az9x.vercel.app",
});

const useAxiosPublic = () => {
  return publicAxios;
};

export default useAxiosPublic;