
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutSection } from "@/components/home/AboutSection"; // Import AboutSection
import { useEffect } from "react"; // Import useEffect
import { useLocation } from "react-router-dom"; // Import useLocation
// Removed duplicate imports below
import { Testimonials } from "@/components/home/Testimonials";
// Removed Pricing import

const Index = () => {
  const location = useLocation(); // Get location object

  // Effect to scroll to sections based on state or hash
  useEffect(() => {
    let sectionId: string | null = null;

    if (location.state?.scrollToPricing) {
      sectionId = 'pricing';
      // Clear the state after processing
      window.history.replaceState({}, document.title); 
    } else if (location.hash) {
      sectionId = location.hash.substring(1); // Remove '#'
    }

    if (sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        // Use setTimeout to ensure the section is rendered before scrolling
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay
      }
    }
  }, [location.state, location.hash]); // Depend on both state and hash

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <AboutSection /> {/* Added AboutSection */}
        {/* Removed Pricing component */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
