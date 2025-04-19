import * as React from 'react'; 
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { initiatePayment, PlanTier } from '@/services/paymentService'; 
import { toast } from '@/hooks/use-toast';
import { Navbar } from "@/components/layout/Navbar"; 
import { Footer } from "@/components/layout/Footer"; 
import { Skeleton } from '@/components/ui/skeleton'; 
import { Download, MessageSquare, Check, ListChecks, BarChart, Clock, MapPin, FileWarning } from 'lucide-react'; // Added more icons

type MigrationPlan = Database['public']['Tables']['migration_plans']['Row'];

// Define a type for the expected structure within the JSONB data field
// TODO: Keep this in sync with AssessmentForm Inputs and saveAssessmentData mapping
type PlanData = {
  fullName?: string;
  nationality?: string;
  highestEducation?: string;
  yearsExperience?: string;
  migrationGoals?: string[];
  preferredCountry?: string;
  fieldOfStudy?: string;
  industry?: string;
  annualIncome?: string;
  affordability?: string;
  documents?: string[];
  specialConsiderations?: string[];
  moveTimeline?: string;
  // Add other expected fields from formData.data
  [key: string]: any; // Allow other properties
};

// --- Content Components ---

// TODO: Implement actual recommendation logic based on planData
const getRecommendations = (planData: PlanData | null) => {
  // Placeholder logic
  const primary = planData?.preferredCountry || 'Canada';
  const fallbacks = ['Australia', 'Germany'];
  const difficulty = 'Medium';
  const keyVisas = ['Express Entry', 'Provincial Nominee Program'];
  return { primary, fallbacks, difficulty, keyVisas };
};

const FreeSummaryContent: React.FC<{ planData: PlanData | null }> = ({ planData }) => {
  const recommendations = getRecommendations(planData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Free Summary: Your Migration Snapshot</CardTitle>
        <CardDescription>A high-level overview based on your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hello {planData?.fullName || 'User'}, based on your profile (Nationality: {planData?.nationality || 'N/A'}, Education: {planData?.highestEducation || 'N/A'}, Experience: {planData?.yearsExperience || 'N/A'}), here's a glimpse:</p>
        <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
          <li>Primary Goal(s): {planData?.migrationGoals?.join(', ') || 'N/A'}</li>
          <li>Potential Primary Country Match: <span className="font-semibold">{recommendations.primary}</span></li>
          <li>Estimated Difficulty: <span className="font-semibold">{recommendations.difficulty}</span></li>
        </ul>
        <p className="mt-4 text-sm font-semibold text-primary">Upgrade to unlock detailed pathways, costs, timelines, and fallback options.</p>
      </CardContent>
    </Card>
  );
};

const StandardContent: React.FC<{ planData: PlanData | null }> = ({ planData }) => {
  const recommendations = getRecommendations(planData);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary"/> Standard Plan Details</CardTitle>
        <CardDescription>Expanded guidance and checklists.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-1 flex items-center"><MapPin className="mr-2 h-4 w-4"/> Primary Country Pathway ({recommendations.primary}):</h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>Key Visa Options: {recommendations.keyVisas.join(', ')}</li>
            <li>Eligibility Score Breakdown: **[TODO: Show scores]**</li>
            <li>Basic Document Checklist: {(planData?.documents && planData.documents.length > 0) ? planData.documents.join(', ') : 'Passport, Proof of Funds [TODO: Generate basic list]'}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1 flex items-center"><FileWarning className="mr-2 h-4 w-4"/> Fallback Country Options:</h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>Option 1: {recommendations.fallbacks[0]} - **[TODO: Suggest visa]**</li>
            <li>Option 2: {recommendations.fallbacks[1]} - **[TODO: Suggest visa]**</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const PremiumContent: React.FC<{ planData: PlanData | null }> = ({ planData }) => {
   const recommendations = getRecommendations(planData);
  return (
    <Card>
      <CardHeader>
          <CardTitle className="flex items-center"><BarChart className="mr-2 h-5 w-5 text-primary"/> Premium Plan Details</CardTitle>
          <CardDescription>Full report, downloads, and advisor access.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Comprehensive Report:</h4>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>Detailed Analysis of Multiple Pathways ({recommendations.primary}, {recommendations.fallbacks.join(', ')}): **[TODO]**</li>
            <li>Cost Breakdowns (Application, Relocation): **[TODO: Estimate costs]**</li>
            <li>Personalized Timelines & Milestones ({planData?.moveTimeline || 'N/A'}): **[TODO: Generate timeline]**</li>
            <li>Risk Assessment & Mitigation (Considerations: {planData?.specialConsiderations?.join(', ') || 'None'}): **[TODO]**</li>
            <li>Advanced Document Checklist & Guidance: **[TODO: Generate full list]**</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download Full Report (PDF)</Button> 
            {/* TODO: Implement PDF generation */}
            <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Chat with Advisor</Button> 
            {/* TODO: Implement chat feature */}
        </div>
      </CardContent>
    </Card>
  );
};
// --- End Content Components ---


export default function Results() {
  const { planId } = useParams<{ planId: string }>();
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<MigrationPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState<PlanTier | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId || !user) return; 

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('migration_plans')
          .select('*')
          .eq('id', planId)
          .eq('user_id', user.id) 
          .single();

        if (error) throw error;

        if (data) {
          setPlan(data);
        } else {
          toast({ title: "Error", description: "Assessment plan not found.", variant: "destructive" });
          navigate('/home'); 
        }
      } catch (error) {
        console.error("Error fetching assessment plan:", error);
        const message = error instanceof Error ? error.message : "Failed to load assessment results.";
        toast({ title: "Error", description: message, variant: "destructive" });
        navigate('/home'); 
      } finally {
        setLoading(false);
      }
    };

    // Fetch plan when user/auth state is ready or changes
    if (!authLoading && user && planId) {
      fetchPlan();
    } else if (!authLoading && !user) {
       navigate('/auth');
    }

  }, [planId, user, authLoading, navigate, profile]); // Add profile to dependency array to refetch on tier change

  const handleUpgrade = async (tier: PlanTier) => {
    if (!user) return; 
    
    setPaymentLoading(tier);
    try {
      const checkoutUrl = await initiatePayment(tier);
      if (checkoutUrl) {
        window.location.href = checkoutUrl; 
      } else {
         toast({ title: "Error", description: "Could not initiate payment.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
       const message = error instanceof Error ? error.message : "Failed to start payment process.";
       toast({ title: "Payment Error", description: message, variant: "destructive" });
    } finally {
      setPaymentLoading(null);
    }
  };

  // Loading states
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
         <Skeleton className="h-12 w-12 rounded-full" /> 
         <span className="ml-4">Loading Results...</span>
      </div>
    );
  }

  if (!plan) {
    return <div className="container py-8">Assessment plan not found.</div>;
  }

  // Determine user's current tier (default to 'free' if profile/tier is null/undefined)
  const currentTier = profile?.tier ?? 'free';
  const planData = plan.data as PlanData | null; // Cast JSONB data

  const UpgradePrompt: React.FC<{ targetTier: string; cost: number }> = ({ targetTier, cost }) => (
     <Card className="mt-6 border-dashed border-primary/50 bg-primary/5">
       <CardHeader>
         <CardTitle className="text-lg text-primary">Upgrade to Unlock More Details</CardTitle>
       </CardHeader>
       <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-between">
         <p className="text-sm text-primary/90">Upgrade to the {targetTier} plan to view this section.</p>
         <Button 
            size="sm" 
            onClick={() => handleUpgrade(targetTier.toLowerCase() as PlanTier)} 
            disabled={paymentLoading !== null}
            className="bg-primary hover:bg-primary/90"
          >
            {paymentLoading === targetTier.toLowerCase() ? 'Processing...' : `Upgrade to ${targetTier} ($${cost})`}
          </Button>
       </CardContent>
     </Card>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container py-12 space-y-8"> 
          <h1 className="text-3xl font-bold">Your Migration Assessment Results for Plan: {plan.title}</h1> {/* Added plan title */}
          
          {/* Always show Free Summary */}
          <FreeSummaryContent planData={planData} />

          {/* Show Standard Content or Upgrade Prompt */}
          <div className="mt-8">
             {(currentTier === 'basic' || currentTier === 'pro') ? (
               <StandardContent planData={planData} />
             ) : (
               <UpgradePrompt targetTier="Standard" cost={10} />
             )}
          </div>

           {/* Show Premium Content or Upgrade Prompt */}
           <div className="mt-8">
             {currentTier === 'pro' ? (
              <PremiumContent planData={planData} />
            ) : (
              // Show upgrade prompt if user doesn't have Pro
              <UpgradePrompt targetTier="Premium" cost={25} /> 
            )}
          </div>

          {/* Removed redundant general upsell card */}

        </div>
      </main>
      <Footer />
    </div>
  );
}
