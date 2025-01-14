import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Loader from '../Components/Loader/Loader';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    // const {user, loading} = useContext(AuthContext)
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <Loader></Loader> 
    }
    if(user){
        return children;
    }return<Navigate to='/login' state={location.pathname} />
    // return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivateRoute;