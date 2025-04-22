
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepProps } from "../types";
import { MINIMUM_INVESTMENT } from "../constants";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export const InputStep = ({ 
  token,
  onNext,
  amount,
  onAmountChange,
  minimumFractions,
  maxFractions
}: StepProps) => {
  const { isConnected, walletAddress } = useWalletConnection();
  const [isValidating, setIsValidating] = useState(false);
  const totalCost = amount * token.fractionPrice;
  
  const handleProceedToSummary = async () => {
    if (!isConnected || !walletAddress) {
      toast.error("Carteira não conectada. Conecte sua carteira para realizar esta operação");
      return;
    }

    if (amount <= 0 || totalCost < MINIMUM_INVESTMENT) {
      toast.error(`Investimento mínimo de R$${MINIMUM_INVESTMENT.toLocaleString('pt-BR')} necessário`);
      return;
    }

    if (amount > maxFractions) {
      toast.error(`Apenas ${maxFractions} frações disponíveis para este token`);
      return;
    }

    setIsValidating(true);
    try {
      // Just validate and proceed to summary
      onNext();
    } finally {
      setIsValidating(false);
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
            max={maxFractions}
            className="col-span-3"
          />
          <div className="flex flex-col gap-1 mt-1">
            <p className="text-xs text-muted-foreground">
              Mínimo: {minimumFractions} frações (R$1.000,00)
            </p>
            <p className="text-xs text-muted-foreground">
              Máximo: {maxFractions} frações disponíveis
            </p>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between text-sm mb-2">
            <span>Preço por fração:</span>
            <span>R$ {token.fractionPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total a pagar:</span>
            <span className={totalCost < MINIMUM_INVESTMENT || amount > maxFractions ? "text-destructive" : "text-primary"}>
              R$ {totalCost.toFixed(2)}
            </span>
          </div>
          {totalCost < MINIMUM_INVESTMENT && (
            <p className="text-xs text-destructive mt-2">
              O valor mínimo de investimento é R$1.000,00
            </p>
          )}
          {amount > maxFractions && (
            <p className="text-xs text-destructive mt-2">
              Quantidade excede o limite disponível de {maxFractions} frações
            </p>
          )}
        </div>
      </div>
      
      <Button
        onClick={handleProceedToSummary}
        disabled={totalCost < MINIMUM_INVESTMENT || amount > maxFractions || isValidating || !isConnected}
        className="w-full button-glow"
      >
        {isValidating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Validando...
          </>
        ) : (
          'Prosseguir'
        )}
      </Button>
    </>
  );
};
