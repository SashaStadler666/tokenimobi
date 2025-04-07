
import { Token } from "@/lib/mockData";

interface TransactionSummaryProps {
  token: Token;
  assetType: "real-estate" | "agricultural";
  amount: number;
  total: number;
  totalWithSlippage: number;
  type: "buy" | "sell";
}

const TransactionSummary = ({
  token,
  assetType,
  amount,
  total,
  totalWithSlippage,
  type
}: TransactionSummaryProps) => {
  return (
    <div className="bg-secondary/50 p-3 rounded-md space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Asset Type</span>
        <span className="text-sm">{assetType === "real-estate" ? "Real Estate" : "Agricultural Land"}</span>
      </div>
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
        <span className="text-sm text-muted-foreground">
          {type === "buy" ? "Total + Slippage" : "Total - Slippage"}
        </span>
        <span className="text-sm font-medium">${totalWithSlippage.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TransactionSummary;
