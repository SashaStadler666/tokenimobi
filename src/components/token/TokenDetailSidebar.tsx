
import { Token } from "@/lib/models";
import TokenDetailCard from "./TokenDetailCard";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

interface TokenDetailSidebarProps {
  token: Token;
  onBuyClick: () => void;
}

const TokenDetailSidebar = ({ token, onBuyClick }: TokenDetailSidebarProps) => {
  return (
    <div className="space-y-6">
      <Button 
        onClick={onBuyClick}
        className="w-full button-glow bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        <Building className="mr-2 h-5 w-5" />
        {token.isWholeProperty ? 'Comprar Imóvel Completo' : 'Comprar Frações'}
      </Button>
      
      <TokenDetailCard token={token} />
    </div>
  );
};

export default TokenDetailSidebar;
