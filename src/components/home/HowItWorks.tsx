
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Share Your Profile",
      description:
        "Tell us about your nationality, education, skills, income, and migration goals.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our system evaluates your eligibility across visa types and countries.",
    },
    {
      number: "03",
      title: "Review Recommendations",
      description:
        "Receive personalized primary and fallback migration strategies.",
    },
    {
      number: "04",
      title: "Actionable Plan",
      description:
        "Get a detailed roadmap with timeline, costs, and document requirements.",
    },
  ];

  return (
    <section className="py-12 bg-visa-gray">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How VisaForge Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Four simple steps to your personalized migration strategy
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-visa-blue text-white font-bold text-lg mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button asChild size="lg">
            <Link to="/assessment">
              Start Your Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
