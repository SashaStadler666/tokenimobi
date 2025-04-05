
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">TokenFrax</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                className="pl-8 bg-secondary"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Market
              </Link>
              <Link 
                to="/tokens" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Tokens
              </Link>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>
            <ConnectWallet />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                className="pl-8 bg-secondary"
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Market
              </Link>
              <Link
                to="/tokens"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tokens
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
            <div className="pt-2">
              <ConnectWallet />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
