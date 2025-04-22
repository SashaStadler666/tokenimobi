
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTokens, Token, wholePropertyTokens } from "@/lib/models";
import { useLocation } from "react-router-dom";
import TokensPageHeader from "@/components/tokens/TokensPageHeader";
import TokenFilterControls from "@/components/tokens/TokenFilterControls";
import TokenGrid from "@/components/featured/TokenGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Tokens = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get('type');
  
  const [propertyTypeTab, setPropertyTypeTab] = useState(typeFromUrl === "rural" ? "rural" : "urbano");
  const [showFilters, setShowFilters] = useState(false);
  const [acquisitionMode, setAcquisitionMode] = useState<string>("fracionados");
  const [loading, setLoading] = useState(true);
  const allTokens = [...mockTokens, ...wholePropertyTokens];
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (typeFromUrl === "rural") {
      setPropertyTypeTab("rural");
    } else if (typeFromUrl === "urbano") {
      setPropertyTypeTab("urbano");
    }
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
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
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <TokenGrid 
            tokens={allTokens} 
            propertyTypeTab={propertyTypeTab} 
            acquisitionMode={acquisitionMode}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Tokens;
