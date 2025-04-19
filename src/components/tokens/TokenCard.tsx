
import { Link } from "react-router-dom";
import { Token } from "@/lib/models";
import { Card, CardContent } from "@/components/ui/card";
import TokenCardHeader from "./TokenCardHeader";
import TokenCardImage from "./TokenCardImage";
import TokenCardDetails from "./TokenCardDetails";
import TokenCardAvailability from "./TokenCardAvailability";
import { motion } from "framer-motion";

interface TokenCardProps {
  token: Token;
  showWholePrice?: boolean;
}

const TokenCard = ({ token, showWholePrice = false }: TokenCardProps) => {
  return (
    <Link to={`/token/${token.id}`} style={{ display: 'block' }}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden border border-border/50 h-full">
          <TokenCardImage token={token} />
          <CardContent className="p-4">
            <TokenCardHeader token={token} />
            <TokenCardDetails 
              token={token} 
              showWholePrice={showWholePrice}
            />
            <TokenCardAvailability token={token} />
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default TokenCard;
