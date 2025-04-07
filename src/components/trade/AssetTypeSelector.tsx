
import { Building, LandPlot } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AssetTypeSelectorProps {
  assetType: "real-estate" | "agricultural";
  onAssetTypeChange: (value: string) => void;
}

const AssetTypeSelector = ({ assetType, onAssetTypeChange }: AssetTypeSelectorProps) => {
  return (
    <div className="mt-4">
      <ToggleGroup 
        type="single" 
        value={assetType} 
        onValueChange={onAssetTypeChange}
      >
        <ToggleGroupItem value="real-estate" aria-label="Real Estate">
          <Building className="mr-2 h-4 w-4" />
          Imóveis
        </ToggleGroupItem>
        <ToggleGroupItem value="agricultural" aria-label="Agricultural Land">
          <LandPlot className="mr-2 h-4 w-4" />
          Terrenos Agrícolas
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default AssetTypeSelector;
