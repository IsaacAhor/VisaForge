
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { initiatePayment, PLAN_DETAILS, PlanTier } from '@/services/paymentService';

export function PricingPlans() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<PlanTier | null>(null);

  const handlePurchase = async (tier: PlanTier) => {
    // If user is not logged in, redirect to login
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to purchase a plan.',
        variant: 'default'
      });
      navigate('/auth', { state: { from: { pathname: '/' } } });
      return;
    }
    
    // If user already has this tier or higher
    if (profile?.tier === 'pro' || (profile?.tier === 'basic' && tier === 'basic')) {
      toast({
        title: 'Already subscribed',
        description: `You already have the ${profile.tier} plan or higher.`,
        variant: 'default'
      });
      return;
    }
    
    setIsLoading(tier);
    
    try {
      const checkoutUrl = await initiatePayment(tier);
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const renderPlanFeatures = (tier: PlanTier) => {
    const details = PLAN_DETAILS[tier];
    
    const features = [
      `Access to ${details.countries} primary countries`,
      `${details.fallback} fallback country${details.fallback > 1 ? 'ies' : ''}`,
      'PDF download of migration plans',
      ...(tier === 'pro' ? [
        'Priority support',
        'Extended document validation',
        'Custom timeline planning'
      ] : [])
    ];
    
    return (
      <ul className="space-y-2 pt-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
      {/* Basic Plan */}
      <Card className={profile?.tier === 'basic' ? 'border-primary' : ''}>
        <CardHeader className="text-center">
          <CardTitle>Basic Plan</CardTitle>
          <div className="flex justify-center items-baseline my-2">
            <span className="text-5xl font-extrabold">$10</span>
            <span className="ml-1 text-xl text-muted-foreground">one-time</span>
          </div>
          <CardDescription>
            Perfect for single-country migration planning
          </CardDescription>
          {profile?.tier === 'basic' && (
            <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              Your Current Plan
            </div>
          )}
        </CardHeader>
        <CardContent>
          {renderPlanFeatures('basic')}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => handlePurchase('basic')}
            disabled={isLoading !== null || profile?.tier === 'basic' || profile?.tier === 'pro'}
          >
            {isLoading === 'basic' ? 'Processing...' : 
             profile?.tier === 'basic' || profile?.tier === 'pro' ? 'Current Plan or Higher' : 
             'Get Started'}
          </Button>
        </CardFooter>
      </Card>

      {/* Pro Plan */}
      <Card className={profile?.tier === 'pro' ? 'border-primary' : ''}>
        <CardHeader className="text-center">
          <CardTitle>Pro Plan</CardTitle>
          <div className="flex justify-center items-baseline my-2">
            <span className="text-5xl font-extrabold">$25</span>
            <span className="ml-1 text-xl text-muted-foreground">one-time</span>
          </div>
          <CardDescription>
            Advanced planning for multiple migration options
          </CardDescription>
          {profile?.tier === 'pro' && (
            <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              Your Current Plan
            </div>
          )}
        </CardHeader>
        <CardContent>
          {renderPlanFeatures('pro')}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => handlePurchase('pro')}
            disabled={isLoading !== null || profile?.tier === 'pro'}
          >
            {isLoading === 'pro' ? 'Processing...' : 
             profile?.tier === 'pro' ? 'Current Plan' : 
             'Upgrade to Pro'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
