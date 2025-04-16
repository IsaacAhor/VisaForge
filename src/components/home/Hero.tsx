
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-20 pb-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-visa-gray px-3 py-1 text-sm">
              Launching Beta - Join Now
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Your <span className="text-visa-blue">Global Migration</span> Strategy, Planned in Minutes
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              VisaForge helps you discover, evaluate, and plan your optimal path to living abroad — 
              including visa eligibility, costs, timeline, and fallback routes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link to="/assessment">
                Start Your Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
