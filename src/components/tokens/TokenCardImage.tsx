
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { getPropertyIcon, getPropertyDescription, getImageForType } from "@/lib/imageUtils";

interface TokenCardImageProps {
  imageUrl: string;
  name: string;
  isWholeProperty?: boolean;
  propertyType?: string;
}

const TokenCardImage = ({ imageUrl, name, isWholeProperty, propertyType }: TokenCardImageProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Create backup image URL based on property type or use placeholder
  const getBackupImage = () => {
    if (propertyType) {
      return getImageForType(propertyType);
    }
    
    return `https://placehold.co/300x300/6c757d/ffffff?text=${name || 'Token'}`;
  };

  return (
    <div className="aspect-square overflow-hidden relative bg-muted group">
      {!imageError ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => {
            console.log(`Error loading image: ${imageUrl} for token ${name}`);
            setImageError(true);
          }}
        />
      ) : (
        <img 
          src={getBackupImage()}
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
