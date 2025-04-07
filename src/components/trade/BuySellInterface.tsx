
import { useState } from "react";
import { Token } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, LandPlot } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import TradeForm from "./TradeForm";
import TradeButton from "./TradeButton";
import AssetTypeSelector from "./AssetTypeSelector";

interface BuySellInterfaceProps {
  token: Token;
  onBuySubmit: (amount: number) => void;
}

const BuySellInterface: React.FC<BuySellInterfaceProps> = ({ token, onBuySubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [assetType, setAssetType] = useState<"real-estate" | "agricultural">("real-estate");
  
  const maxBuyAmount = Math.min(token.availableFractions, 1000); // Limit max purchase for demo
  const maxSellAmount = 100; // Mock user holdings
  
  const total = amount * token.fractionPrice;
  const totalWithSlippage = activeTab === "buy" 
    ? total * (1 + slippage / 100)
    : total * (1 - slippage / 100);
  
  const handleTransaction = () => {
    if (amount <= 0) {
      // Import toast only here to avoid circular dependencies
      const { toast } = require("sonner");
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Import toast only here to avoid circular dependencies
      const { toast } = require("sonner");
      
      if (activeTab === "buy") {
        onBuySubmit(amount); // Call the provided onBuySubmit handler for buy operations
        toast.success(`Successfully bought ${amount} fractions of ${token.symbol} (${assetType === "real-estate" ? "Real Estate" : "Agricultural Land"})`);
      } else {
        toast.success(`Successfully sold ${amount} fractions of ${token.symbol} (${assetType === "real-estate" ? "Real Estate" : "Agricultural Land"})`);
      }
      setAmount(0);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Fractions</CardTitle>
        <CardDescription>Buy or sell fractions of {token.name}</CardDescription>
        <AssetTypeSelector 
          assetType={assetType} 
          onAssetTypeChange={(value) => value && setAssetType(value as "real-estate" | "agricultural")} 
        />
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "buy" | "sell")}
          className="mb-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="pt-4">
            <TradeForm 
              amount={amount}
              onAmountChange={setAmount}
              maxAmount={maxBuyAmount}
              slippage={slippage}
              onSlippageChange={setSlippage}
              token={token}
              total={total}
              totalWithSlippage={totalWithSlippage}
              assetType={assetType}
              type="buy"
              label="Available"
              availableLabel={token.availableFractions.toLocaleString()}
            />
          </TabsContent>
          
          <TabsContent value="sell" className="pt-4">
            <TradeForm 
              amount={amount}
              onAmountChange={setAmount}
              maxAmount={maxSellAmount}
              slippage={slippage}
              onSlippageChange={setSlippage}
              token={token}
              total={total}
              totalWithSlippage={totalWithSlippage}
              assetType={assetType}
              type="sell"
              label="Your Balance"
              availableLabel={maxSellAmount.toLocaleString()}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <TradeButton 
          isProcessing={isProcessing} 
          amount={amount} 
          token={token} 
          assetType={assetType} 
          activeTab={activeTab} 
          onClick={handleTransaction} 
        />
      </CardFooter>
    </Card>
  );
};

export default BuySellInterface;
