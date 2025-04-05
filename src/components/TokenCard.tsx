
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Token } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };
  
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(num);
  };
  
  const availabilityPercentage = (token.availableFractions / token.totalFractions) * 100;
  
  return (
    <Link to={`/token/${token.id}`} className="block">
      <div className="token-card bg-card h-full flex flex-col">
        <div className="aspect-square overflow-hidden">
          <img 
            src={token.imageUrl} 
            alt={token.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold truncate">{token.name}</h3>
            <Badge variant="outline" className="text-xs bg-secondary">
              {token.symbol}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">
            {token.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-medium">{formatPrice(token.fractionPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h</p>
              <div className={`flex items-center ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                {token.priceChange24h >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span className="font-medium">{Math.abs(token.priceChange24h).toFixed(1)}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-medium">{formatNumber(token.marketCap)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Holders</p>
              <p className="font-medium">{token.holders.toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Available</span>
              <span>{Math.round(availabilityPercentage)}%</span>
            </div>
            <Progress value={availabilityPercentage} className="h-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TokenCard;
