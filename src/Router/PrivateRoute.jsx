
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    // const {user, loading} = useContext(AuthContext)
    const {user, loading} = useAuth()

    if(loading){
        return <Loader></Loader> 
    }
    if(user){
        return children;
    }return<Navigate to='/login' state={location.pathname} />
    // return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivateRoute;