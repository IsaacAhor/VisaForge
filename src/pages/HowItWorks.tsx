
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Compass, Database, FileSearch, GraduationCap, LayoutList } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const features = [
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Our system contains detailed information on visa requirements, application processes, and eligibility criteria for dozens of countries."
    },
    {
      icon: FileSearch,
      title: "Advanced Matching",
      description: "We analyze over 50 different factors in your profile to identify visa opportunities you qualify for."
    },
    {
      icon: LayoutList,
      title: "Actionable Insights",
      description: "Get practical recommendations on documents to prepare, timelines to follow, and specific steps to take."
    },
    {
      icon: GraduationCap,
      title: "Experience-Based",
      description: "Our recommendations are based on real-world visa application outcomes and success patterns."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <section className="container px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              How VisaForge Works
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform simplifies the complex world of immigration and visa applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">The VisaForge Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-visa-blue text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-xl">Tell us about yourself</h3>
                    <p className="text-muted-foreground">Complete our assessment form with details about your background, qualifications, and migration goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-visa-blue text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-xl">AI Analysis</h3>
                    <p className="text-muted-foreground">Our system evaluates your profile against thousands of visa criteria combinations to find your best matches.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-visa-blue text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-xl">Personalized Strategy</h3>
                    <p className="text-muted-foreground">Receive a tailored plan with primary and fallback visa recommendations, including detailed guidance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-visa-blue text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-xl">Take Action</h3>
                    <p className="text-muted-foreground">Follow your customized roadmap with timelines, document checklists, and important milestones.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/assessment">Start Your Assessment Now</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg bg-visa-gray p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">What You'll Receive</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Primary visa recommendation with highest chance of success</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Alternative fallback plan for greater flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Detailed eligibility analysis with confidence scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Comprehensive document checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Timeline with key application milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Cost breakdown for application fees and related expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 text-visa-teal" />
                    <span>Exportable PDF report of your complete strategy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border bg-card">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-visa-blue mb-2" />
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

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Your personalized migration strategy is just minutes away. Start your assessment now and get clarity on your global mobility options.
            </p>
            <Button asChild size="lg">
              <Link to="/assessment">
                Start Your Assessment <Compass className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
