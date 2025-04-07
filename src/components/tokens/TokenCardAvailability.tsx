
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface TokenCardAvailabilityProps {
  isWholeProperty?: boolean;
  availableFractions: number;
  totalFractions: number;
}

const TokenCardAvailability = ({ 
  isWholeProperty, 
  availableFractions, 
  totalFractions 
}: TokenCardAvailabilityProps) => {
  const availabilityPercentage = (availableFractions / totalFractions) * 100;
  
  if (isWholeProperty) {
    return (
      <div className="mt-2">
        <Badge variant="outline" className="w-full justify-center py-1 hover:bg-primary/10 transition-colors">
          Disponível para compra
        </Badge>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">Disponível</span>
        <span>{Math.round(availabilityPercentage)}%</span>
      </div>
      <Progress value={availabilityPercentage} className="h-1.5" />
    </div>
  );
};

export default TokenCardAvailability;
