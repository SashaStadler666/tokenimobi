
import { useState } from "react";
import { Token } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BuySellInterfaceProps {
  token: Token;
}

const BuySellInterface: React.FC<BuySellInterfaceProps> = ({ token }) => {
  const [amount, setAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  
  const maxBuyAmount = Math.min(token.availableFractions, 1000); // Limit max purchase for demo
  const maxSellAmount = 100; // Mock user holdings
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const max = activeTab === "buy" ? maxBuyAmount : maxSellAmount;
    setAmount(Math.min(value, max));
  };
  
  const setPercentage = (percentage: number) => {
    const max = activeTab === "buy" ? maxBuyAmount : maxSellAmount;
    setAmount(Math.floor(max * percentage / 100));
  };
  
  const total = amount * token.fractionPrice;
  const totalWithSlippage = activeTab === "buy" 
    ? total * (1 + slippage / 100)
    : total * (1 - slippage / 100);
  
  const handleTransaction = () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      if (activeTab === "buy") {
        toast.success(`Successfully bought ${amount} fractions of ${token.symbol}`);
      } else {
        toast.success(`Successfully sold ${amount} fractions of ${token.symbol}`);
      }
      setAmount(0);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Fractions</CardTitle>
        <CardDescription>Buy or sell fractions of {token.name}</CardDescription>
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
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="buyAmount" className="text-sm font-medium">
                    Amount
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Available: {token.availableFractions.toLocaleString()}
                  </span>
                </div>
                <Input
                  id="buyAmount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  min="0"
                  max={maxBuyAmount}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(25)}
                  className="text-xs"
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(50)}
                  className="text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(75)}
                  className="text-xs"
                >
                  75%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(100)}
                  className="text-xs"
                >
                  Max
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Slippage Tolerance</label>
                  <span className="text-sm">{slippage}%</span>
                </div>
                <Slider
                  value={[slippage]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => setSlippage(values[0])}
                />
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price per fraction</span>
                  <span className="text-sm">${token.fractionPrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="text-sm">{amount} fractions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total + Slippage</span>
                  <span className="text-sm font-medium">${totalWithSlippage.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="sellAmount" className="text-sm font-medium">
                    Amount
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Your Balance: {maxSellAmount.toLocaleString()}
                  </span>
                </div>
                <Input
                  id="sellAmount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  min="0"
                  max={maxSellAmount}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(25)}
                  className="text-xs"
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(50)}
                  className="text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(75)}
                  className="text-xs"
                >
                  75%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPercentage(100)}
                  className="text-xs"
                >
                  Max
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Slippage Tolerance</label>
                  <span className="text-sm">{slippage}%</span>
                </div>
                <Slider
                  value={[slippage]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => setSlippage(values[0])}
                />
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price per fraction</span>
                  <span className="text-sm">${token.fractionPrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="text-sm">{amount} fractions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total - Slippage</span>
                  <span className="text-sm font-medium">${totalWithSlippage.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full button-glow"
          onClick={handleTransaction}
          disabled={amount <= 0 || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : activeTab === "buy" ? (
            `Buy ${amount || 0} ${token.symbol} Fractions`
          ) : (
            `Sell ${amount || 0} ${token.symbol} Fractions`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuySellInterface;
