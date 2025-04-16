
import { ArrowRight, FileText, Search, Flag, Clock, MoveRight, ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HowItWorksStep } from "./HowItWorksStep";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Share Your Profile",
      description:
        "Tell us about your nationality, education, skills, income, and migration goals.",
      icon: FileText,
      motionIcon: MoveRight,
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our system evaluates your eligibility across visa types and countries.",
      icon: Search,
      motionIcon: ArrowRightCircle,
    },
    {
      number: "03",
      title: "Review Recommendations",
      description:
        "Receive personalized primary and fallback migration strategies.",
      icon: Flag,
      motionIcon: MoveRight,
    },
    {
      number: "04",
      title: "Actionable Plan",
      description:
        "Get a detailed roadmap with timeline, costs, and document requirements.",
      icon: Clock,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-gradient-to-b from-white to-visa-gray/30"> {/* Added id="how-it-works" */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-visa-dark">
            How VisaForge Works
          </h2>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-visa-dark/60">
            Your journey to living abroad starts here
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 lg:pr-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <HowItWorksStep
                  {...step}
                  isLast={index === steps.length - 1}
                />
                {step.motionIcon && index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block text-visa-blue/40">
                    <step.motionIcon className="w-6 h-6 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-visa-blue/5 to-visa-teal/5 p-4 md:p-8 hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-white/10" />
            <img
              src="/lovable-uploads/20afd84b-ccd2-4293-8c1e-7b8f04b6129a.png"
              alt="VisaForge Process Illustration"
              className="relative w-full h-auto max-w-[400px] rounded-2xl shadow-2xl animate-float" // Added animate-float class
            />
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-16">
          <Button
            asChild
            size="lg"
            className="bg-visa-blue hover:bg-visa-blue/90 text-white rounded-full px-6 md:px-8 h-12 text-base"
          >
            <Link to="/assessment">
              Start Your Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
