 import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton'; // Or any loading indicator

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading state while checking authentication
    // You can customize this loader
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Skeleton className="h-12 w-12 rounded-full" /> 
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (!user) {
    // User not logged in, redirect to login page
    // Pass the current location to redirect back after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // User is logged in, render the requested component
  return <>{children}</>;
};

export default ProtectedRoute;
