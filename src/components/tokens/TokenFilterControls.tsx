
import PropertyTypeSelector from "@/components/featured/PropertyTypeSelector";
import FilterButton from "@/components/featured/FilterButton";
import FiltersPanel from "@/components/featured/FiltersPanel";

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
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PropertyTypeSelector value={propertyTypeTab} onValueChange={setPropertyTypeTab} />
        <FilterButton showFilters={showFilters} onClick={() => setShowFilters(!showFilters)} />
      </div>
      
      <FiltersPanel showFilters={showFilters} propertyTypeTab={propertyTypeTab} />
    </>
  );
};

export default TokenFilterControls;
