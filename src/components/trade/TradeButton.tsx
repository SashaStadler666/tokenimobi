
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Token } from "@/lib/mockData";

interface TradeButtonProps {
  isProcessing: boolean;
  amount: number;
  token: Token;
  assetType: "real-estate" | "agricultural";
  activeTab: "buy" | "sell";
  onClick: () => void;
}

const TradeButton = ({
  isProcessing,
  amount,
  token,
  assetType,
  activeTab,
  onClick
}: TradeButtonProps) => {
  return (
    <Button 
      className="w-full button-glow"
      onClick={onClick}
      disabled={amount <= 0 || isProcessing}
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : activeTab === "buy" ? (
        `Buy ${amount || 0} ${token.symbol} ${assetType === "real-estate" ? "Real Estate" : "Agricultural"} Fractions`
      ) : (
        `Sell ${amount || 0} ${token.symbol} ${assetType === "real-estate" ? "Real Estate" : "Agricultural"} Fractions`
      )}
    </Button>
  );
};

export default TradeButton;
