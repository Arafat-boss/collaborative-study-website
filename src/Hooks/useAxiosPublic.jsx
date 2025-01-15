import axios from "axios";

const publicAxios = axios.create({
    baseURL: 'http://localhost:9000'
})
const useAxiosPublic = () => {
    return publicAxios;
};

export default useAxiosPublic;