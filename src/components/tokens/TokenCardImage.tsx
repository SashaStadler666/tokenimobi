
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { getPropertyIcon, getPropertyDescription } from "@/lib/imageUtils";

interface TokenCardImageProps {
  imageUrl: string;
  name: string;
  isWholeProperty?: boolean;
  propertyType?: string;
}

const TokenCardImage = ({ imageUrl, name, isWholeProperty, propertyType }: TokenCardImageProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Create backup image URL based on property type
  const getBackupImageUrl = () => {
    const type = propertyType?.toLowerCase() || 'default';
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
    
    return `https://placehold.co/300x300/${bgColor}/ffffff?text=${propertyType || 'Imóvel'}`;
  };

  return (
    <div className="aspect-square overflow-hidden relative bg-muted group">
      {!imageError ? (
        <motion.img 
          src={imageUrl} 
          alt={name} 
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
          alt={name}
          className="w-full h-full object-cover"
        />
      )}
      
      {isWholeProperty && (
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          Imóvel Inteiro
        </Badge>
      )}
      
      <div className="absolute top-2 left-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-lg">
                {getPropertyIcon(propertyType)}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{getPropertyDescription(propertyType)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default TokenCardImage;
