
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, HelpCircle, FileText, Home, Building, LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToTokens = (type: string) => {
    navigate(`/tokens?type=${type}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">TokenImobi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleNavigateToTokens("urbano")} 
                      variant="outline"
                      className="flex items-center"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Imóveis Urbanos
                    </Button>
                    <Button 
                      onClick={() => handleNavigateToTokens("rural")} 
                      variant="outline"
                      className="flex items-center"
                    >
                      <LandPlot className="h-4 w-4 mr-2" />
                      Terras Rurais
                    </Button>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/como-funciona" 
                    className={navigationMenuTriggerStyle()}
                  >
                    Como Funciona
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/faq" 
                    className={navigationMenuTriggerStyle()}
                  >
                    Perguntas Frequentes
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/termos-de-uso" 
                    className={navigationMenuTriggerStyle()}
                  >
                    Termos de Uso
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            <nav className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={() => handleNavigateToTokens("urbano")}
                  variant="outline"
                  className="flex items-center justify-start"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Imóveis Urbanos
                </Button>
                <Button
                  onClick={() => handleNavigateToTokens("rural")}
                  variant="outline"
                  className="flex items-center justify-start"
                >
                  <LandPlot className="h-4 w-4 mr-2" />
                  Terras Rurais
                </Button>
              </div>
              <Link
                to="/como-funciona"
                className="text-sm font-medium flex items-center text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Como Funciona
              </Link>
              <Link
                to="/faq"
                className="text-sm font-medium flex items-center text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Perguntas Frequentes
              </Link>
              <Link
                to="/termos-de-uso"
                className="text-sm font-medium flex items-center text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Termos de Uso
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
