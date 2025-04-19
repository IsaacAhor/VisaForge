
import { useEffect, lazy, Suspense } from 'react'; // Import lazy and Suspense
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Import useNavigate and Navigate
import { useAuth } from './contexts/AuthContext'; // Import useAuth
import ProtectedRoute from "./components/layout/ProtectedRoute"; // Import ProtectedRoute
// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Assessment = lazy(() => import("./pages/Assessment"));
const Results = lazy(() => import("./pages/Results"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Auth = lazy(() => import("./pages/Auth"));
const PricingPage = lazy(() => import("./pages/Pricing")); 
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancelled = lazy(() => import("./pages/PaymentCancelled"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    Loading... 
    {/* TODO: Replace with a proper spinner/skeleton component */}
  </div>
);

// Define a component to handle the redirect logic and routing
const AppContent = () => {
  const navigate = useNavigate();
  const { loginRedirectTarget, clearLoginRedirect } = useAuth();

  useEffect(() => {
    if (loginRedirectTarget) {
      navigate(loginRedirectTarget);
      clearLoginRedirect(); // Clear the target after navigation
    }
  }, [loginRedirectTarget, navigate, clearLoginRedirect]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} /> {/* Add redirect from root */}
      <Route path="/home" element={<Index />} /> {/* Changed path to /home */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<PricingPage />} /> {/* Add Pricing route */}

          {/* Protected Routes */}
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-cancelled"
            element={
              <ProtectedRoute>
                <PaymentCancelled />
              </ProtectedRoute>
            }
          />

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* AuthProvider is in main.tsx */}
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent /> {/* Use the component that contains the hook */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
