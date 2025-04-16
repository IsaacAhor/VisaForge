
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

/**
 * Hook to require authentication for a route
 * @param redirectTo - Path to redirect to if user is not authenticated
 * @returns The current authenticated user or null
 */
export function useRequireAuth(redirectTo: string = '/auth') {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to access this page',
        variant: 'default'
      });
      
      navigate(redirectTo, { 
        state: { from: { pathname: window.location.pathname } }
      });
    }
  }, [user, isLoading, navigate, redirectTo]);

  return { user, isLoading };
}
