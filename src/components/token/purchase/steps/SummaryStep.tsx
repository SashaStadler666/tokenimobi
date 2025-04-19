
import { Button } from "@/components/ui/button";
import { Info, AlertCircle } from "lucide-react";
import { StepProps } from "../types";
import { NETWORK_FEE } from "../constants";

export const SummaryStep = ({ 
  token,
  onPrevious,
  onNext,
  amount,
}: StepProps) => {
  const totalCost = amount * token.fractionPrice;
  const totalWithFees = totalCost + NETWORK_FEE;

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="bg-secondary/20 p-4 rounded-md border border-border">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Info className="h-4 w-4 mr-2" /> Resumo da Transação
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Token:</span>
              <span className="font-medium">{token.name} ({token.symbol})</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Quantidade:</span>
              <span className="font-medium">{amount} frações</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Preço por fração:</span>
              <span>R$ {token.fractionPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>R$ {totalCost.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Taxa de rede:</span>
              <span>R$ {NETWORK_FEE.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-border my-2"></div>
            
            <div className="flex justify-between font-medium">
              <span>Total a pagar:</span>
              <span className="text-primary">R$ {totalWithFees.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/20 p-4 rounded-md border border-border">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Ao confirmar esta transação, você está de acordo com os termos e condições da TokenImobi 
              e confirma que entende os riscos associados a este investimento.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="w-full sm:w-auto"
        >
          Voltar
        </Button>
        <Button
          onClick={onNext}
          className="w-full sm:w-auto button-glow"
        >
          Confirmar e Continuar
        </Button>
      </div>
    </>
  );
};
