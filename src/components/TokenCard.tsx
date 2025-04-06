
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, MapPin, Ruler, Home, ImageIcon } from "lucide-react";
import { Token } from "@/lib/models";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPropertyIcon, getPropertyDescription } from "@/lib/imageUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      <motion.div 
        className="token-card bg-card h-full flex flex-col border rounded-lg hover:border-primary/50 transition-colors overflow-hidden"
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-square overflow-hidden relative bg-muted group">
          {!imageError ? (
            <motion.img 
              src={token.imageUrl} 
              alt={token.name} 
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "linear" 
              }}
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
          
          <div className="absolute top-2 left-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-lg">
                    {getPropertyIcon(token.propertyType)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{getPropertyDescription(token.propertyType)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="font-bold truncate">{token.name}</h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{token.name}</p>
                  {token.description && (
                    <p className="text-xs text-muted-foreground mt-1">{token.description.substring(0, 100)}...</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              <Badge variant="outline" className="w-full justify-center py-1 hover:bg-primary/10 transition-colors">
                Disponível para compra
              </Badge>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default TokenCard;
