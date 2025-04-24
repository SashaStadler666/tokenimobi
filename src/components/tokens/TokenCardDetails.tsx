
import { Token } from "@/lib/models";
import { ArrowRight } from "lucide-react";

interface TokenCardDetailsProps {
  fractionPrice: number;
  wholePropertyPrice?: number;
  showWholePrice?: boolean;
  priceChange24h: number;
  propertyType?: string;
  area?: number;
  ownerAddress?: string;
}

const TokenCardDetails = ({ 
  fractionPrice, 
  wholePropertyPrice,
  showWholePrice = false,
  priceChange24h,
  propertyType,
  area,
  ownerAddress
}: TokenCardDetailsProps) => {
  return (
    <div className="space-y-2 mt-4">
      <div className="flex justify-between items-baseline">
        <p className="text-lg font-semibold">
          {showWholePrice && wholePropertyPrice ? (
            `R$ ${wholePropertyPrice.toLocaleString('pt-BR')}`
          ) : (
            `R$ ${fractionPrice.toFixed(3)}/fração`
          )}
        </p>
        <span className={`text-sm ${priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
          {priceChange24h >= 0 ? '+' : ''}{priceChange24h}%
        </span>
      </div>
      
      {(propertyType || area) && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {propertyType && <span>{propertyType}</span>}
          {propertyType && area && <span>•</span>}
          {area && <span>{area}m²</span>}
        </div>
      )}
      
      {ownerAddress && (
        <div className="mt-2 p-2 rounded bg-muted/30">
          <p className="text-xs text-muted-foreground truncate">
            Proprietário: {ownerAddress.substring(0, 6)}...{ownerAddress.substring(38)}
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenCardDetails;

