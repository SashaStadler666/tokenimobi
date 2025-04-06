
import { motion } from "framer-motion";
import { Building, Leaf } from "lucide-react";
import { Token } from "@/lib/models";
import { getImageForType, getPropertyDescription } from "@/lib/imageUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface TokenHeroProps {
  token: Token;
}

const TokenHero = ({ token }: TokenHeroProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Determine display image without mutating the original token
  const displayImage = token.imageUrl || getImageForType(token.propertyType);
  
  // Determine property type icon
  const PropertyTypeIcon = token.propertyType?.toLowerCase().includes('fazenda') || 
                          token.propertyType?.toLowerCase().includes('rural') ? 
                          Leaf : Building;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6 }}
      className="mb-6 rounded-lg overflow-hidden border relative group ring-1 ring-muted/20 glow-shadow"
    >
      <div className="aspect-[16/9] sm:aspect-[3/2] md:aspect-[21/9] lg:aspect-[4/2] w-full relative">
        <img
          src={displayImage}
          alt={token.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isImageLoaded ? 'ken-burns-effect' : ''}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
        <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
              {token.name}
            </h2>
            {token.location && (
              <p className="text-white/90 text-sm md:text-base mt-1 drop-shadow-md">
                {token.location}
              </p>
            )}
            <div className="mt-2">
              <span className="inline-block bg-primary/90 text-primary-foreground text-xs md:text-sm px-2 py-1 rounded">
                {token.propertyType}
              </span>
              {token.isWholeProperty && (
                <span className="ml-2 inline-block bg-accent/90 text-accent-foreground text-xs md:text-sm px-2 py-1 rounded">
                  Imóvel Inteiro
                </span>
              )}
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 p-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-xl float-icon">
                  <PropertyTypeIcon className="h-5 w-5 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{getPropertyDescription(token.propertyType)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenHero;
