
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Token } from "@/lib/mockData";
import TransactionSummary from "./TransactionSummary";

interface TradeFormProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  maxAmount: number;
  slippage: number;
  onSlippageChange: (slippage: number) => void;
  token: Token;
  total: number;
  totalWithSlippage: number;
  assetType: "real-estate" | "agricultural";
  type: "buy" | "sell";
  label: string;
  availableLabel: string;
}

const TradeForm = ({
  amount,
  onAmountChange,
  maxAmount,
  slippage,
  onSlippageChange,
  token,
  total,
  totalWithSlippage,
  assetType,
  type,
  label,
  availableLabel
}: TradeFormProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onAmountChange(Math.min(value, maxAmount));
  };
  
  const setPercentage = (percentage: number) => {
    onAmountChange(Math.floor(maxAmount * percentage / 100));
  };
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <span className="text-xs text-muted-foreground">
            {label}: {availableLabel}
          </span>
        </div>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          min="0"
          max={maxAmount}
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
          onValueChange={(values) => onSlippageChange(values[0])}
        />
      </div>
      
      <TransactionSummary 
        token={token}
        assetType={assetType}
        amount={amount}
        total={total}
        totalWithSlippage={totalWithSlippage}
        type={type}
      />
    </div>
  );
};

export default TradeForm;
