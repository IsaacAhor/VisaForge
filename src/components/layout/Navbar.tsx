
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Globe className="h-6 w-6 text-visa-blue" />
          <span>VisaForge</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/how-it-works" className="text-sm font-medium hover:text-visa-blue transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-visa-blue transition-colors">
            About
          </Link>
          <Button asChild>
            <Link to="/assessment">Start Your Assessment</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
