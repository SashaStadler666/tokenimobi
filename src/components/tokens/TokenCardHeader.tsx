
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface TokenCardHeaderProps {
  name: string;
  symbol: string;
  description?: string;
  location?: string;
}

const TokenCardHeader = ({ name, symbol, description, location }: TokenCardHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-bold truncate">{name}</h3>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{name}</p>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">{description.substring(0, 100)}...</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="outline" className="text-xs bg-secondary">
          {symbol}
        </Badge>
      </div>
      
      {location && (
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{location}</span>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">
        {description}
      </p>
    </>
  );
};

export default TokenCardHeader;
