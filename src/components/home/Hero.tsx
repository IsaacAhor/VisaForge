
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-32 pb-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center max-w-[800px] mx-auto">
          <span className="bg-visa-gray px-4 py-1.5 rounded-full text-sm font-medium text-visa-dark/80">
            Now in Beta
          </span>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl text-visa-dark">
            Your Global Migration Strategy
          </h1>
          <p className="text-xl text-visa-dark/60 max-w-[600px]">
            Discover your optimal path to living abroad — including visa eligibility, 
            costs, timeline, and fallback routes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              asChild 
              className="bg-visa-blue hover:bg-visa-blue/90 text-white rounded-full px-8 h-12 text-base"
            >
              <Link to="/assessment">
                Start Your Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild
              className="rounded-full px-8 h-12 text-base border-visa-dark/10 text-visa-dark hover:bg-visa-dark/5"
            >
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
