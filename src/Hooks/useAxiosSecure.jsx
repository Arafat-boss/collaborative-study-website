import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
     baseURL: 'http://localhost:9000'
})

const useAxiosSecure = () => {
    const {LogOutUser} = useAuth();
    const navigate = useNavigate()
    //request interceptors
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('access-token')
        console.log('stop ', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    },(error)=>{
        return Promise.reject(error);
    })

    //interceptors status 401/ 403
    axiosSecure.interceptors.response.use((response)=>{
        return response
      }, 

      async(error)=>{
        // console.log('innnnnnnnnnnnnnnterrrrrrr',error);
        const status = error.response.status;
        if(status === 401 || status === 403){
           await LogOutUser();
            navigate('/login')
        }
        return Promise.reject(error);
      })



    return axiosSecure;
};

export default useAxiosSecure;