
import { Check, Clock, Compass, CreditCard, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: Compass,
      title: "Personalized Plan",
      description: "Get tailored visa recommendations based on your unique profile, goals, and circumstances.",
    },
    {
      icon: Shield,
      title: "Fallback Strategy",
      description: "Always have a backup plan with alternative visa routes if your primary option faces obstacles.",
    },
    {
      icon: CreditCard,
      title: "Cost Breakdown",
      description: "Understand the full financial picture with detailed budget estimates for each visa path.",
    },
    {
      icon: Clock,
      title: "Timeline Visibility",
      description: "See a clear roadmap of the entire process from application to approval with key milestones.",
    },
    {
      icon: FileText,
      title: "Document Checklist",
      description: "Access a comprehensive list of all required paperwork and preparation steps.",
    },
    {
      icon: Check,
      title: "Eligibility Scoring",
      description: "Know your chances with confidence scores showing how well you match each visa's requirements.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose VisaForge
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform removes the guesswork from global migration planning.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-border bg-card">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-visa-blue mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
