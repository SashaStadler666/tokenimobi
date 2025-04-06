
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import ConnectWallet from "@/components/ConnectWallet";
import { motion } from "framer-motion";

interface WalletSectionProps {
  isWalletConnected: boolean;
}

const WalletSection = ({ isWalletConnected }: WalletSectionProps) => {
  return (
    <motion.div 
      className="flex justify-end mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isWalletConnected ? (
        <Link to="/portfolio">
          <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Wallet className="h-4 w-4" />
            Minha Carteira
          </Button>
        </Link>
      ) : (
        <ConnectWallet />
      )}
    </motion.div>
  );
};

export default WalletSection;
