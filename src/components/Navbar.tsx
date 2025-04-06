
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, HelpCircle, FileText, Home, Building, LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
                  <NavigationMenuTrigger>O que é Tokenização</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
                      <div 
                        onClick={() => handleNavigateToTokens("urbano")} 
                        className="flex items-start p-2 hover:bg-muted rounded-md cursor-pointer"
                      >
                        <Building className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Imóveis Urbanos</div>
                          <p className="text-sm text-muted-foreground">Apartamentos e imóveis comerciais</p>
                        </div>
                      </div>
                      <div 
                        onClick={() => handleNavigateToTokens("rural")} 
                        className="flex items-start p-2 hover:bg-muted rounded-md cursor-pointer"
                      >
                        <LandPlot className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Terras Rurais</div>
                          <p className="text-sm text-muted-foreground">Terrenos agrícolas e produção rural</p>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
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
                    to="/tokens" 
                    className={navigationMenuTriggerStyle()}
                  >
                    Imóveis Disponíveis
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
              <div className="space-y-2">
                <p className="text-sm font-medium">O que é Tokenização:</p>
                <div
                  className="text-sm pl-4 flex items-center text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => handleNavigateToTokens("urbano")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Imóveis Urbanos
                </div>
                <div
                  className="text-sm pl-4 flex items-center text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => handleNavigateToTokens("rural")}
                >
                  <LandPlot className="h-4 w-4 mr-2" />
                  Terras Rurais
                </div>
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
                to="/tokens"
                className="text-sm font-medium flex items-center text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" />
                Imóveis Disponíveis
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
