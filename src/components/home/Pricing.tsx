
import { useAuth } from '@/contexts/AuthContext';
import { PricingPlans } from '@/components/payment/PricingPlans';

export function Pricing() {
  const { isLoading } = useAuth();

  return (
    <section id="pricing" className="py-16 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Migration Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the plan that fits your migration needs. Upgrade anytime to access more countries and features.
          </p>
        </div>
        
        {!isLoading && (
          <div className="max-w-4xl mx-auto">
            <PricingPlans />
          </div>
        )}
      </div>
    </section>
  );
}
