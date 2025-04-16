
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VisaResult } from "@/components/results/VisaResult";
import { ResultsSummary } from "@/components/results/ResultsSummary";

const Results = () => {
  // Mock data - in a real app this would come from an API or user session storage
  const primaryVisa = {
    title: "Skilled Worker Visa",
    country: "Canada",
    type: "Express Entry",
    confidence: 84,
    timeframe: "6-8 months",
    cost: "$2,300 - $3,100 USD",
    documents: [
      "Valid passport",
      "Language test results (IELTS)",
      "Educational credential assessment",
      "Proof of funds",
      "Police clearance certificate",
      "Medical examination"
    ],
    description: "The Express Entry system manages applications for skilled workers who want to immigrate to Canada and become permanent residents. It's a points-based system that ranks candidates based on factors like age, education, work experience, and language skills.",
    requirements: [
      "Minimum 67 points on the selection grid",
      "At least 1 year of skilled work experience",
      "CLB 7 or higher in English and/or French",
      "Proof of sufficient settlement funds",
      "Post-secondary education credentials"
    ]
  };

  const fallbackVisa = {
    title: "Working Holiday Visa",
    country: "Australia",
    type: "Temporary Work Visa",
    confidence: 76,
    timeframe: "2-3 months",
    cost: "$485 - $650 USD",
    documents: [
      "Valid passport",
      "Proof of sufficient funds",
      "Health insurance",
      "Character reference/police check",
      "Passport-sized photographs"
    ],
    description: "The Working Holiday visa is designed for young adults who want to have an extended holiday in Australia and work there to help fund their trip. This visa is a good stepping stone for gaining Australian work experience.",
    requirements: [
      "Age 18-30 (or 35 for some countries)",
      "Valid passport from an eligible country",
      "No dependent children accompanying you",
      "Sufficient funds (approx. $5,000 AUD)",
      "Meet health and character requirements"
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Your Personalized Visa Strategy
            </h1>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
              Based on your profile, we've identified these optimal migration pathways. 
              We recommend a primary strategy and a fallback option for maximum flexibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VisaResult data={primaryVisa} isPrimary={true} />
              <VisaResult data={fallbackVisa} />
            </div>
            <div>
              <ResultsSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
