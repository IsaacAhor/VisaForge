
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";

const Assessment = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Visa Eligibility Assessment
            </h1>
            <p className="mt-2 text-muted-foreground">
              Complete the form below to discover your optimal migration pathways
            </p>
          </div>
          <AssessmentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
