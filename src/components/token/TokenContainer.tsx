
import { motion } from "framer-motion";
import { Token, Transaction } from "@/lib/models";
import TokenDetailInfo from "./TokenDetailInfo";
import TokenDetailTabs from "./TokenDetailTabs";
import TokenDetailSidebar from "./TokenDetailSidebar";
import TokenMap from "./TokenMap";

interface TokenContainerProps {
  token: Token;
  tokenTransactions: Transaction[];
  formatMarketCap: string;
  formatVolume: string;
}

const TokenContainer = ({ token, tokenTransactions, formatMarketCap, formatVolume }: TokenContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div 
        className="lg:col-span-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TokenDetailInfo 
          token={token} 
          formatMarketCap={formatMarketCap} 
          formatVolume={formatVolume} 
        />
        
        {token.location && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Localização</h3>
            <TokenMap token={token} />
          </div>
        )}
        
        <TokenDetailTabs token={token} transactions={tokenTransactions} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        id="buy-section"
      >
        <TokenDetailSidebar token={token} />
      </motion.div>
    </div>
  );
};

export default TokenContainer;
