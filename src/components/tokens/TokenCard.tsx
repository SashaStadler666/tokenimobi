
import { Link } from "react-router-dom";
import { Token } from "@/lib/models";
import { motion } from "framer-motion";

import TokenCardImage from "./TokenCardImage";
import TokenCardHeader from "./TokenCardHeader";
import TokenCardDetails from "./TokenCardDetails";
import TokenCardAvailability from "./TokenCardAvailability";

interface TokenCardProps {
  token: Token;
  showWholePrice?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, showWholePrice = false }) => {
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
        <TokenCardImage 
          imageUrl={token.imageUrl} 
          name={token.name}
          isWholeProperty={token.isWholeProperty}
          propertyType={token.propertyType}
        />
        
        <div className="p-4 flex flex-col flex-grow">
          <TokenCardHeader
            name={token.name}
            symbol={token.symbol}
            description={token.description}
            location={token.location}
          />
          
          <TokenCardDetails
            fractionPrice={token.fractionPrice}
            wholePropertyPrice={token.wholePropertyPrice}
            showWholePrice={showWholePrice}
            priceChange24h={token.priceChange24h}
            propertyType={token.propertyType}
            area={token.area}
          />
          
          <TokenCardAvailability
            isWholeProperty={token.isWholeProperty}
            availableFractions={token.availableFractions}
            totalFractions={token.totalFractions}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default TokenCard;
