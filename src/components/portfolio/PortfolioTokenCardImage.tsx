
import React, { useState } from "react";
import { Token } from "@/lib/models";

interface PortfolioTokenCardImageProps {
  token: Token;
}

const PortfolioTokenCardImage = ({ token }: PortfolioTokenCardImageProps) => {
  const [imageError, setImageError] = useState(false);
  
  const fallbackUrl = token.propertyType === "Institucional" 
    ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800"
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800";

  return (
    <div className="relative h-40 bg-muted">
      <img
        src={!imageError ? token.imageUrl : fallbackUrl}
        alt={token.name}
        className="w-full h-full object-cover"
        onError={() => {
          console.log(`Error loading image for token: ${token.id}, URL: ${token.imageUrl}`);
          setImageError(true);
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
        <h3 className="font-semibold truncate">{token.name}</h3>
        <p className="text-xs opacity-80">{token.symbol}</p>
      </div>
    </div>
  );
};

export default PortfolioTokenCardImage;

