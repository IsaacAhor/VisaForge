
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-visa-dark">
          <Globe className="h-6 w-6 text-visa-blue" />
          <span>VisaForge</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link to="/how-it-works" className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-visa-dark/80 hover:text-visa-dark transition-colors">
            About
          </Link>
          <Button
            asChild
            className="bg-visa-blue hover:bg-visa-blue/90 text-white rounded-full px-6"
          >
            <Link to="/assessment">Start Your Assessment</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
