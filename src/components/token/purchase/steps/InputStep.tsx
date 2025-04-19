
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepProps } from "../types";
import { MINIMUM_INVESTMENT } from "../constants";
import { toast } from "sonner";

export const InputStep = ({ 
  token,
  onNext,
  amount,
  onAmountChange,
  minimumFractions,
}: StepProps) => {
  const totalCost = amount * token.fractionPrice;
  
  const handleProceedToSummary = () => {
    if (amount <= 0 || totalCost < MINIMUM_INVESTMENT) {
      toast.error("Investimento mínimo de R$1.000,00 necessário");
      return;
    }
    onNext();
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
        disabled={totalCost < MINIMUM_INVESTMENT}
        className="w-full button-glow"
      >
        Prosseguir
      </Button>
    </>
  );
};
