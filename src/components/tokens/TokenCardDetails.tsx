
import { ArrowUp, ArrowDown, Home, Ruler } from "lucide-react";
import { formatCurrency } from "@/components/tokens/tokenUtils";

interface TokenCardDetailsProps {
  fractionPrice: number;
  wholePropertyPrice?: number;
  showWholePrice?: boolean;
  priceChange24h: number;
  propertyType?: string;
  area?: number;
}

const TokenCardDetails = ({ 
  fractionPrice, 
  wholePropertyPrice, 
  showWholePrice = false,
  priceChange24h,
  propertyType,
  area
}: TokenCardDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div>
        <p className="text-xs text-muted-foreground">
          {showWholePrice && wholePropertyPrice ? "Valor Total" : "Fração"}
        </p>
        <p className="font-medium">
          {showWholePrice && wholePropertyPrice 
            ? formatCurrency(wholePropertyPrice, true)
            : formatCurrency(fractionPrice, false)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">24h</p>
        <div className={`flex items-center ${priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
          {priceChange24h >= 0 ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 mr-1" />
          )}
          <span className="font-medium">{Math.abs(priceChange24h).toFixed(1)}%</span>
        </div>
      </div>
      <div className="flex items-center">
        <Home className="h-3 w-3 mr-1" />
        <p className="text-xs text-muted-foreground mr-1">Tipo:</p>
        <p className="text-xs">{propertyType}</p>
      </div>
      {area && (
        <div className="flex items-center">
          <Ruler className="h-3 w-3 mr-1" />
          <p className="text-xs text-muted-foreground mr-1">Área:</p>
          <p className="text-xs">{area >= 10000 ? `${(area / 10000).toFixed(1)} ha` : `${area} m²`}</p>
        </div>
      )}
    </div>
  );
};

export default TokenCardDetails;
