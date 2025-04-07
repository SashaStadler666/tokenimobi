
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTokens, Token, wholePropertyTokens } from "@/lib/models";
import { useLocation } from "react-router-dom";
import TokensPageHeader from "@/components/tokens/TokensPageHeader";
import TokenFilterControls from "@/components/tokens/TokenFilterControls";
import TokenGrid from "@/components/featured/TokenGrid";

const Tokens = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get('type');
  
  const [propertyTypeTab, setPropertyTypeTab] = useState(typeFromUrl === "rural" ? "rural" : "urbano");
  const [showFilters, setShowFilters] = useState(false);
  const [acquisitionMode, setAcquisitionMode] = useState<string>("fracionados");
  const allTokens = [...mockTokens, ...wholePropertyTokens];
  
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
        <TokensPageHeader 
          title="Propriedades Disponíveis" 
          description="Explore nossa seleção de imóveis urbanos e rurais tokenizados"
        />
        
        <TokenFilterControls
          propertyTypeTab={propertyTypeTab}
          setPropertyTypeTab={setPropertyTypeTab}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          acquisitionMode={acquisitionMode}
          setAcquisitionMode={setAcquisitionMode}
        />
        
        <TokenGrid 
          tokens={allTokens} 
          propertyTypeTab={propertyTypeTab} 
          acquisitionMode={acquisitionMode}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Tokens;
