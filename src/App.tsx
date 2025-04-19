
import { useEffect } from 'react'; // Import useEffect
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from './contexts/AuthContext'; // Import useAuth
import ProtectedRoute from "./components/layout/ProtectedRoute"; // Import ProtectedRoute
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Auth from "./pages/Auth";
import PricingPage from "./pages/Pricing"; // Import the new Pricing page
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";

const queryClient = new QueryClient();

// Define a component to handle the redirect logic
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
    <Routes>
      {/* Public Routes */}
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
