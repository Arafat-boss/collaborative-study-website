import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { PropagateLoader } from 'react-spinners';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    // const {user, loading} = useContext(AuthContext)
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return (<PropagateLoader
            cssOverride={{}}
            loading
            size={20}
            speedMultiplier={1}
          />)  
    }
    if(user){
        return children;
    }return<Navigate to='/login' state={location.pathname} />
    // return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivateRoute;