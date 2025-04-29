
import { Token } from "@/lib/models";
import TokenDetailCard from "./TokenDetailCard";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

interface TokenDetailSidebarProps {
  token: Token;
  onBuyClick: () => void;
}

const TokenDetailSidebar = ({ token, onBuyClick }: TokenDetailSidebarProps) => {
  const isKToken = token.symbol === "K1" || token.symbol === "K2";
  
  return (
    <div className="space-y-6">
      {token.ownerAddress && (
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">Proprietário Atual:</p>
          <p className="text-xs break-all font-mono">{token.ownerAddress}</p>
        </div>
      )}
      
      <Button 
        onClick={onBuyClick}
        className="w-full button-glow bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        <Building className="mr-2 h-5 w-5" />
        {isKToken ? 'Comprar Imóvel' : (token.isWholeProperty ? 'Comprar Imóvel Completo' : 'Comprar Frações')}
      </Button>
      
      <TokenDetailCard token={token} />
    </div>
  );
};

export default TokenDetailSidebar;
