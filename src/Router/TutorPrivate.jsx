import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Components/Loader/Loader";


const TutorPrivate = ({children}) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [role, isLoading] = useAdmin();
  
    if (loading || isLoading) {
      return <Loader></Loader>;
    }
  
    if (user && role == "tutor") {
      return children;
    }
    return <Navigate to="/" state={location.pathname} />;

}

export default TutorPrivate;
