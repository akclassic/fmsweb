// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
