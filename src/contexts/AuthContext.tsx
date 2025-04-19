import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
// Removed useNavigate import
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types'; // Import Database type

// Define Profile type based on Supabase schema
type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null; // Add profile
  loading: boolean;
  loginRedirectTarget: string | null; // State to trigger navigation after OAuth
  clearLoginRedirect: () => void; // Function to clear the redirect state
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>; // Add function to refresh profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Removed useNavigate hook
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Add profile state
  const [loading, setLoading] = useState(true); // Keep loading state
  const [loginRedirectTarget, setLoginRedirectTarget] = useState<string | null>(null); // Add redirect state

  // Function to fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && status !== 406) { // 406 means no rows found, which is okay initially
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        setProfile(null); // Ensure profile is null if not found
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null); // Reset profile on error
    }
  };


  useEffect(() => {
    setLoading(true); // Start loading
    const getSessionAndProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError);
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id); // Fetch profile if user exists
      } else {
        setProfile(null); // Clear profile if no user
      }
      setLoading(false); // Finish loading after session and profile check
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true); // Start loading on auth change
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id); // Fetch profile on auth change
         } else {
           setProfile(null); // Clear profile if user logs out
         }
         setLoading(false); // Finish loading after state change

         // Clean up URL hash after OAuth redirect and set flag for navigation
         const hashContainsToken = window.location.hash.includes('#access_token');
         if (hashContainsToken) {
           window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
           // If the hash had a token AND we now have a session, set the redirect target
           if (session) {
             setLoginRedirectTarget('/pricing'); // Set target to the new pricing page
           }
         }
       }
     );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // Run only once on mount

  // Function to manually refresh profile data
  const refreshProfile = async () => {
    if (user) {
      setLoading(true); // Indicate loading during refresh
      await fetchProfile(user.id);
      setLoading(false);
    } else {
      console.warn("Cannot refresh profile: No user logged in.");
    }
  };

  const signOut = async () => {
    setLoading(true);
    setProfile(null); // Clear profile immediately on sign out attempt
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      // Optionally handle error (e.g., show a toast notification)
    }
    // State updates will be handled by onAuthStateChange listener
    setLoading(false); // Set loading false after sign out attempt
  };

  const clearLoginRedirect = () => {
    setLoginRedirectTarget(null);
  };

  const value = {
    session,
    user,
    profile, // Add profile state to value
    loading,
    loginRedirectTarget, // Add redirect state to context value
    clearLoginRedirect, // Add clear function to context value
    signOut,
    refreshProfile, // Add refreshProfile function to value
  };

  // Don't render children until the initial session check is complete
  // TEMPORARY DEBUG: Always render children to bypass loading check
  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
