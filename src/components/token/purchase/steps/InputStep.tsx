
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepProps } from "../types";
import { MINIMUM_INVESTMENT } from "../constants";
import { toast } from "sonner";
import { mintToken } from "@/utils/contractUtils";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const InputStep = ({ 
  token,
  onNext,
  amount,
  onAmountChange,
  minimumFractions,
}: StepProps) => {
  const { walletAddress } = useWalletConnection();
  const [isProcessing, setIsProcessing] = useState(false);
  const totalCost = amount * token.fractionPrice;
  
  const handleProceedToSummary = async () => {
    if (!walletAddress) {
      toast.error("Carteira não conectada. Conecte sua carteira para realizar esta operação");
      return;
    }

    if (amount <= 0 || totalCost < MINIMUM_INVESTMENT) {
      toast.error("Investimento mínimo de R$1.000,00 necessário");
      return;
    }

    setIsProcessing(true);
    try {
      // For demonstration, using K1 type. You might want to add logic to determine K1 vs K2
      const success = await mintToken('K1', walletAddress);
      if (success) {
        onNext();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div>
          <label htmlFor="amount" className="text-sm font-medium mb-2 block">
            Quantidade de frações
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(parseInt(e.target.value) || 0)}
            min={minimumFractions}
            className="col-span-3"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mínimo: {minimumFractions} frações (R$1.000,00)
          </p>
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between text-sm mb-2">
            <span>Preço por fração:</span>
            <span>R$ {token.fractionPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total a pagar:</span>
            <span className={totalCost < MINIMUM_INVESTMENT ? "text-destructive" : "text-primary"}>
              R$ {totalCost.toFixed(2)}
            </span>
          </div>
          {totalCost < MINIMUM_INVESTMENT && (
            <p className="text-xs text-destructive mt-2">
              O valor mínimo de investimento é R$1.000,00
            </p>
          )}
        </div>
      </div>
      
      <Button
        onClick={handleProceedToSummary}
        disabled={totalCost < MINIMUM_INVESTMENT || isProcessing}
        className="w-full button-glow"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          'Prosseguir'
        )}
      </Button>
    </>
  );
};
