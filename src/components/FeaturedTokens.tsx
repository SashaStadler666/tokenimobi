
import { useEffect, useState } from "react";
import { mockTokens, Token } from "@/lib/mockData";
import FilterButton from "./featured/FilterButton";
import PropertyTypeSelector from "./featured/PropertyTypeSelector";
import FiltersPanel from "./featured/FiltersPanel";
import TokenGrid from "./featured/TokenGrid";
import FeaturedHeader from "./featured/FeaturedHeader";
import FeaturedFooter from "./featured/FeaturedFooter";

const FeaturedTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [propertyTypeTab, setPropertyTypeTab] = useState("urbano");
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Filter and sort tokens based on active tab and property type
    const getTokens = () => {
      // First filter by urban/rural property type
      const propertyTypeFiltered = propertyTypeTab === "urbano" 
        ? [...mockTokens].filter(t => 
            t.propertyType === "Apartamento" || 
            t.propertyType === "Casa" || 
            t.propertyType === "Flat" ||
            t.propertyType === "Comercial" ||
            t.propertyType === "Industrial"
          )
        : [...mockTokens].filter(t => 
            t.propertyType === "Terreno" || 
            t.propertyType === "Fazenda" ||
            t.propertyType === "Rural"
          );
      
      // Then apply additional filtering based on active tab
      switch(activeTab) {
        case "residential":
          return propertyTypeFiltered.filter(t => 
            t.propertyType === "Apartamento" || 
            t.propertyType === "Casa" || 
            t.propertyType === "Flat"
          ).slice(0, 6);
        case "commercial":
          return propertyTypeFiltered.filter(t => 
            t.propertyType === "Comercial" || 
            t.propertyType === "Industrial"
          ).slice(0, 6);
        case "performance":
          return propertyTypeFiltered.sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 6);
        case "all":
        default:
          return propertyTypeFiltered.slice(0, 6);
      }
    };
    
    setTokens(getTokens());
  }, [activeTab, propertyTypeTab]);

  return (
    <section className="container mx-auto px-4 py-12">
      <FeaturedHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex justify-between items-center mb-6">
        <PropertyTypeSelector value={propertyTypeTab} onValueChange={setPropertyTypeTab} />
        <FilterButton showFilters={showFilters} onClick={() => setShowFilters(!showFilters)} />
      </div>

      <FiltersPanel showFilters={showFilters} propertyTypeTab={propertyTypeTab} />
      
      <TokenGrid tokens={tokens} propertyTypeTab={propertyTypeTab} />
      
      <FeaturedFooter />
    </section>
  );
};

export default FeaturedTokens;
