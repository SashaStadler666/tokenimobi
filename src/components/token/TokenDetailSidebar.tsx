
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Token, mockTransactions, addTransaction } from "@/lib/models";
import BuySellInterface from "../BuySellInterface";
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
      <BuySellInterface token={token} onBuy={handleBuy} />
      
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Detalhes do Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fornecimento Total</span>
              <span>{token.totalSupply.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total de Frações</span>
              <span>{token.totalFractions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frações Disponíveis</span>
              <span>{token.availableFractions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Endereço do Contrato</span>
              <span className="text-xs truncate w-24 text-right">0xaB...1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blockchain</span>
              <span>Ethereum</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenDetailSidebar;
