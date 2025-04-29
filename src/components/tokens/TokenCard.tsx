
import { Link } from "react-router-dom";
import { Token } from "@/lib/models";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TokenCardHeader from "./TokenCardHeader";
import TokenCardImage from "./TokenCardImage";
import TokenCardDetails from "./TokenCardDetails";
import TokenCardAvailability from "./TokenCardAvailability";
import { motion } from "framer-motion";
import { Building } from "lucide-react";

interface TokenCardProps {
  token: Token;
  showWholePrice?: boolean;
}

const TokenCard = ({ token, showWholePrice = false }: TokenCardProps) => {
  // Check if it's a K token
  const isKToken = token.symbol === "K1" || token.symbol === "K2";
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-border/50 h-full cursor-pointer hover:border-primary/50 transition-colors">
        <Link to={`/token/${token.id}`} className="block h-full">
          <TokenCardImage 
            imageUrl={token.imageUrl} 
            name={token.name} 
            isWholeProperty={token.isWholeProperty || isKToken}
            propertyType={token.propertyType}
          />
          <CardContent className="p-4">
            <TokenCardHeader 
              name={token.name} 
              symbol={token.symbol} 
              description={token.description} 
              location={token.location}
            />
            <TokenCardDetails 
              fractionPrice={token.fractionPrice}
              wholePropertyPrice={token.wholePropertyPrice}
              showWholePrice={showWholePrice || isKToken}
              priceChange24h={token.priceChange24h}
              propertyType={token.propertyType}
              area={token.area}
              ownerAddress={token.ownerAddress}
            />
            <TokenCardAvailability 
              isWholeProperty={token.isWholeProperty || isKToken}
              availableFractions={token.availableFractions}
              totalFractions={token.totalFractions}
            />
            
            <div className="mt-4">
              <Button className="w-full" variant="outline">
                <Building className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default TokenCard;
