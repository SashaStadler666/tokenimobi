
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { mockTokens, Token } from "@/lib/models";
import FilterButton from "@/components/featured/FilterButton";
import PropertyTypeSelector from "@/components/featured/PropertyTypeSelector";
import FiltersPanel from "@/components/featured/FiltersPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import TokenGrid from "@/components/featured/TokenGrid";

const Tokens = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get('type');
  
  const [tokens, setTokens] = useState<Token[]>(mockTokens);
  const [propertyTypeTab, setPropertyTypeTab] = useState(typeFromUrl === "rural" ? "rural" : "urbano");
  const [showFilters, setShowFilters] = useState(false);
  
  // Update property type if URL params change
  useEffect(() => {
    if (typeFromUrl === "rural") {
      setPropertyTypeTab("rural");
    } else if (typeFromUrl === "urbano") {
      setPropertyTypeTab("urbano");
    }
  }, [typeFromUrl]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Imóveis Disponíveis</h1>
          <p className="text-muted-foreground">
            Explore nossa seleção completa de imóveis tokenizados urbanos e rurais
          </p>
        </motion.div>
        
        <div className="flex justify-between items-center mb-6">
          <PropertyTypeSelector value={propertyTypeTab} onValueChange={setPropertyTypeTab} />
          <FilterButton showFilters={showFilters} onClick={() => setShowFilters(!showFilters)} />
        </div>
        
        <FiltersPanel showFilters={showFilters} propertyTypeTab={propertyTypeTab} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TokenGrid tokens={tokens} propertyTypeTab={propertyTypeTab} />
        </motion.div>
      </div>
    </div>
  );
};

export default Tokens;
