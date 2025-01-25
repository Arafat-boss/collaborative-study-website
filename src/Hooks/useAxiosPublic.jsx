import axios from "axios";

const publicAxios = axios.create({
    baseURL: 'https://collaborative-study-server.vercel.app'
})
const useAxiosPublic = () => {
    return publicAxios;
};

export default useAxiosPublic;