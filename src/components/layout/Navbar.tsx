
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();
  const location = useLocation(); // Get current location

  const NavLinks = () => (
    <>
      <Link 
        to="/#how-it-works" 
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
        // Removed onClick handler
      >
        How It Works
      </Link>
      <Link 
        to="/#about" // Changed link to point to the section ID
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
      >
        About
      </Link>
      <Link 
        to="/#pricing" 
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
        // Removed onClick handler
      >
        Pricing
      </Link>
      <Button
        asChild
        className="bg-visa-blue hover:bg-visa-blue/90 text-white rounded-full px-6"
      >
        <Link to="/assessment">Start Your Assessment</Link>
      </Button>
    </>
  );

  // Removed handleScrollToSection function as it's no longer needed here

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on the homepage, scroll to top smoothly
    if (location.pathname === '/') {
      event.preventDefault(); // Prevent default link navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise, let the Link component handle navigation to '/'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-xl text-visa-dark"
          onClick={handleLogoClick} // Add onClick handler
        >
          <span>VisaForge</span>
        </Link>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col items-start gap-6 pt-6">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
}
