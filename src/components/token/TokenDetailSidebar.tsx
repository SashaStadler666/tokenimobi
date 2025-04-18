
import { Token } from "@/lib/models";
import TokenDetailCard from "./TokenDetailCard";
import { Button } from "@/components/ui/button";

interface TokenDetailSidebarProps {
  token: Token;
  onBuyClick: () => void;
}

const TokenDetailSidebar = ({ token, onBuyClick }: TokenDetailSidebarProps) => {
  return (
    <div className="space-y-6">
      <Button 
        onClick={onBuyClick}
        className="w-full button-glow"
      >
        Comprar {token.symbol}
      </Button>
      
      <TokenDetailCard token={token} />
    </div>
  );
};

export default TokenDetailSidebar;
