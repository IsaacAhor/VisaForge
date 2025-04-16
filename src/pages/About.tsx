
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, BookOpen, Building, Globe, Heart, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making global mobility accessible to everyone, not just those who can afford expensive consultants."
    },
    {
      icon: ShieldCheck,
      title: "Accuracy",
      description: "Providing reliable, up-to-date information to help users make confident migration decisions."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding the challenges of migration and designing our platform with user needs at the center."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <section className="container px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              About VisaForge
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to democratize access to global mobility opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                VisaForge was born from a simple observation: millions of people dream of moving abroad, but most lack the resources to navigate the complex landscape of immigration rules, visa types, and application procedures.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founders experienced these challenges firsthand while navigating their own international relocations. They encountered scattered information, outdated advice, and prohibitively expensive legal consultations. 
              </p>
              <p className="text-muted-foreground mb-4">
                We built VisaForge to solve these problems, leveraging technology to make expert-level immigration guidance accessible to everyone - regardless of their background or budget.
              </p>
              <p className="text-muted-foreground">
                Today, VisaForge helps thousands of users discover and plan their optimal path to living abroad, combining comprehensive data with intelligent recommendations.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-visa-gray p-6">
                <Building className="h-8 w-8 text-visa-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower people with the information, tools, and guidance they need to make confident global mobility decisions, removing barriers to international opportunities.
                </p>
              </div>
              <div className="rounded-lg bg-visa-gray p-6">
                <BookOpen className="h-8 w-8 text-visa-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where geographic mobility is available to anyone with the determination to pursue it, regardless of their starting point or resources.
                </p>
              </div>
            </div>
          </div>

          <div className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="border-border bg-card">
                  <CardHeader>
                    <value.icon className="h-10 w-10 text-visa-blue mb-2" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/80">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-visa-gray rounded-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We'd love to hear from you. Whether you have questions about our platform, want to request a feature, or just want to say hello, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="default">
                <Link to="/assessment">
                  Try VisaForge <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" /> Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
