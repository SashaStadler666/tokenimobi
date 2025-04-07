
import PropertyTypeSelector from "@/components/featured/PropertyTypeSelector";
import FilterButton from "@/components/featured/FilterButton";
import FiltersPanel from "@/components/featured/FiltersPanel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface TokenFilterControlsProps {
  propertyTypeTab: string;
  setPropertyTypeTab: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const TokenFilterControls = ({ 
  propertyTypeTab, 
  setPropertyTypeTab, 
  showFilters, 
  setShowFilters 
}: TokenFilterControlsProps) => {
  const [acquisitionMode, setAcquisitionMode] = useState<string>("fracionados");

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-auto space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-3">Tipo de Imóvel:</span>
            <PropertyTypeSelector value={propertyTypeTab} onValueChange={setPropertyTypeTab} />
          </div>
          
          <div className="flex items-center">
            <span className="text-sm font-medium mr-3">Modo de Aquisição:</span>
            <Tabs value={acquisitionMode} onValueChange={setAcquisitionMode} className="w-full md:w-auto">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="fracionados">Fracionados</TabsTrigger>
                <TabsTrigger value="inteiros">Imóveis Inteiros</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <FilterButton showFilters={showFilters} onClick={() => setShowFilters(!showFilters)} />
      </div>
      
      <FiltersPanel 
        showFilters={showFilters} 
        propertyTypeTab={propertyTypeTab} 
        acquisitionMode={acquisitionMode}
      />
    </>
  );
};

export default TokenFilterControls;
