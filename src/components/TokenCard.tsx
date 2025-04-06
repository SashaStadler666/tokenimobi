
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, MapPin, Ruler, Home, ImageIcon } from "lucide-react";
import { Token } from "@/lib/models";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface TokenCardProps {
  token: Token;
  showWholePrice?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, showWholePrice = false }) => {
  const [imageError, setImageError] = useState(false);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(num);
  };
  
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };
  
  const availabilityPercentage = (token.availableFractions / token.totalFractions) * 100;
  
  // Create backup image URL based on property type
  const getBackupImageUrl = () => {
    const type = token.propertyType?.toLowerCase() || 'default';
    const bgColor = {
      'apartamento': '3a86ff',
      'casa': '8338ec',
      'flat': 'ff006e',
      'comercial': 'fb5607',
      'industrial': 'ffbe0b',
      'terreno': '8ac926',
      'fazenda': '2a9d8f',
      'rural': 'e9c46a'
    }[type] || '6c757d';
    
    return `https://placehold.co/300x300/${bgColor}/ffffff?text=${token.propertyType || 'Imóvel'}`;
  };
  
  return (
    <Link to={`/token/${token.id}`} className="block">
      <div className="token-card bg-card h-full flex flex-col border rounded-lg hover:border-primary/50 transition-colors">
        <div className="aspect-square overflow-hidden relative bg-muted">
          {!imageError ? (
            <img 
              src={token.imageUrl} 
              alt={token.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <img 
              src={getBackupImageUrl()}
              alt={token.name}
              className="w-full h-full object-cover"
            />
          )}
          
          {token.isWholeProperty && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
              Imóvel Inteiro
            </Badge>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold truncate">{token.name}</h3>
            <Badge variant="outline" className="text-xs bg-secondary">
              {token.symbol}
            </Badge>
          </div>
          
          {token.location && (
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{token.location}</span>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">
            {token.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {showWholePrice && token.wholePropertyPrice ? "Valor Total" : "Fração"}
              </p>
              <p className="font-medium">
                {showWholePrice && token.wholePropertyPrice 
                  ? formatNumber(token.wholePropertyPrice)
                  : formatPrice(token.fractionPrice)}
              </p>
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
            <div className="flex items-center">
              <Home className="h-3 w-3 mr-1" />
              <p className="text-xs text-muted-foreground mr-1">Tipo:</p>
              <p className="text-xs">{token.propertyType}</p>
            </div>
            {token.area && (
              <div className="flex items-center">
                <Ruler className="h-3 w-3 mr-1" />
                <p className="text-xs text-muted-foreground mr-1">Área:</p>
                <p className="text-xs">{token.area >= 10000 ? `${(token.area / 10000).toFixed(1)} ha` : `${token.area} m²`}</p>
              </div>
            )}
          </div>
          
          {!token.isWholeProperty && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Disponível</span>
                <span>{Math.round(availabilityPercentage)}%</span>
              </div>
              <Progress value={availabilityPercentage} className="h-1.5" />
            </div>
          )}
          
          {token.isWholeProperty && (
            <div className="mt-2">
              <Badge variant="outline" className="w-full justify-center py-1">
                Disponível para compra
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TokenCard;
