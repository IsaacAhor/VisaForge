
import { Menu, LogOut } from "lucide-react"; // Import LogOut icon
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { toast } from "@/hooks/use-toast"; // Import toast for sign out feedback

export function Navbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate
  const { user, signOut, loading } = useAuth(); // Get auth state and signOut function

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed out successfully." });
      navigate('/home'); // Redirect to /home after sign out
    } catch (error) {
      toast({ title: "Sign out failed", description: "Please try again.", variant: "destructive" });
    }
  };

  // Define NavLinks content separately for reuse
  const navLinkItems = (
    <>
      <Link
        to="/home#how-it-works" // Point to page + hash
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
        // Removed onClick handler
      >
        How It Works
      </Link>
      <Link 
        to="/home#about" // Point to page + hash
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
      >
        About
      </Link>
      <Link 
        to="/pricing" // Changed link to point to the new page
        className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors"
        // Removed onClick handler
      >
        Pricing
      </Link>
      {/* Keep Assessment button, it's protected by ProtectedRoute */}
      <Button
        asChild
        variant="default" // Keep primary style
        className="bg-visa-blue hover:bg-visa-blue/90 text-white rounded-full px-6"
      >
        <Link to="/assessment">Start Free Assessment</Link>
      </Button>

      {/* Conditional Auth Button */}
      {loading ? (
        <Button variant="ghost" disabled>Loading...</Button> // Show loading state
      ) : user ? (
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="rounded-full px-4 py-2 flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      ) : (
        <Button
          asChild
          variant="outline" // Use outline style for Sign In
          className="rounded-full px-6"
        >
          <Link to="/auth">Sign In</Link>
        </Button>
      )}
    </>
  );

  const NavLinks = () => navLinkItems; // Use the defined items

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
          to="/home" // Changed link to /home
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
            <SheetContent side="right"> {/* Ensure sheet comes from right */}
              <nav className="flex flex-col items-start gap-6 pt-10"> {/* Added more top padding */}
                {/* Render items directly for mobile layout */}
                {navLinkItems}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-6"> {/* Adjusted gap */}
            {/* Render items directly for desktop layout */}
            {navLinkItems}
          </nav>
        )}
      </div>
    </header>
  );
}
