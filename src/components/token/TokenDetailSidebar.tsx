
import { useState } from "react";
import { Token, addTransaction } from "@/lib/models";
import BuySellInterface from "../trade/BuySellInterface";
import TokenDetailCard from "./TokenDetailCard";
import { toast } from "sonner";

interface TokenDetailSidebarProps {
  token: Token;
}

const TokenDetailSidebar = ({ token }: TokenDetailSidebarProps) => {
  const [buyAmount, setBuyAmount] = useState(0);

  // Handle buy transaction
  const handleBuy = (amount: number) => {
    if (amount <= 0) return;
    
    // Create a new transaction
    addTransaction({
      tokenId: token.id,
      type: 'buy',
      fractions: amount,
      price: token.fractionPrice,
      total: amount * token.fractionPrice,
      timestamp: new Date()
    });
    
    // Show success message
    toast.success(`Compra de ${amount} frações do token ${token.name} realizada com sucesso!`);
  };
  
  return (
    <div>
      <BuySellInterface token={token} onBuySubmit={handleBuy} />
      <TokenDetailCard token={token} />
    </div>
  );
};

export default TokenDetailSidebar;
