import { useAuth } from '@/contexts/AuthContext';
import { PricingPlans } from '@/components/payment/PricingPlans';
import { Navbar } from "@/components/layout/Navbar"; // Add Navbar import
import { Footer } from "@/components/layout/Footer"; // Add Footer import

// Renamed function to PricingPage
export default function PricingPage() { 
  // Removed isLoading from useAuth() as it's not needed here
  // const { isLoading } = useAuth(); 

  return (
    <div className="flex min-h-screen flex-col"> {/* Add wrapper div */}
      <Navbar /> {/* Add Navbar */}
      <main className="flex-1 pt-16"> {/* Add main wrapper and padding */}
        <section id="pricing" className="py-16 bg-muted/50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Migration Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the plan that fits your migration needs. Upgrade anytime to access more countries and features.
              </p>
            </div>
            
            {/* Removed !isLoading check */}
            <div className="max-w-4xl mx-auto">
              <PricingPlans />
            </div>
            
          </div>
        </section>
      </main>
      <Footer /> {/* Add Footer */}
    </div>
  );
}
