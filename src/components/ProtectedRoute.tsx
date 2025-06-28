import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@contexts/AuthProvider";

import { Loader } from "@components/ui/Loader/Loader.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
