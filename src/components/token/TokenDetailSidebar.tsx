
import { useState } from "react";
import { Token } from "@/lib/models";
import BuySellInterface from "../trade/BuySellInterface";
import TokenDetailCard from "./TokenDetailCard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PurchaseModal from "./PurchaseModal";
import { useWalletConnection } from "@/hooks/useWalletConnection";

interface TokenDetailSidebarProps {
  token: Token;
}

const TokenDetailSidebar = ({ token }: TokenDetailSidebarProps) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { isConnected, connectWallet } = useWalletConnection();
  
  // Handle buy transaction via BuySellInterface
  const handleBuy = (amount: number) => {
    if (amount <= 0) return;
    
    toast.success(`Compra de ${amount} frações do token ${token.name} realizada com sucesso!`);
  };
  
  return (
    <div className="space-y-6">
      <div id="buy-section" className="space-y-4">
        <Button 
          onClick={() => setShowPurchaseModal(true)}
          className="w-full button-glow"
        >
          Comprar {token.symbol}
        </Button>
        
        <BuySellInterface token={token} onBuySubmit={handleBuy} />
      </div>
      
      <TokenDetailCard token={token} />
      
      <PurchaseModal 
        token={token}
        open={showPurchaseModal}
        onOpenChange={setShowPurchaseModal}
      />
    </div>
  );
};

export default TokenDetailSidebar;
