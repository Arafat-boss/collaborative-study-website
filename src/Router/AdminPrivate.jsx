import React from "react";
import Loader from "../Components/Loader/Loader";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AdminPrivate = ({children}) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [role, isLoading] = useAdmin();

  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (user && role == "admin") {
    return children;
  }
  return <Navigate to="/" state={location.pathname} />;
};

export default AdminPrivate;
