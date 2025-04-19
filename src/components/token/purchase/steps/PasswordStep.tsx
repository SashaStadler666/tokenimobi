
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Info, Loader2 } from "lucide-react";
import { StepProps } from "../types";

export const PasswordStep = ({ 
  onPrevious,
  isProcessing,
  walletPassword,
  onWalletPasswordChange,
  onConfirmPurchase,
}: StepProps) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center mb-2">
          <div className="bg-secondary/30 p-3 rounded-full">
            <Lock className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <h3 className="text-center text-lg font-medium">Autenticação de Carteira</h3>
        <p className="text-center text-sm text-muted-foreground mb-2">
          Digite a senha da sua carteira digital para autorizar esta transação
        </p>
        
        <div>
          <label htmlFor="wallet-password" className="text-sm font-medium mb-2 block">
            Senha da Carteira
          </label>
          <Input
            id="wallet-password"
            type="password"
            value={walletPassword}
            onChange={(e) => onWalletPasswordChange?.(e.target.value)}
            placeholder="Digite sua senha"
            className="col-span-3"
          />
        </div>
        
        <div className="bg-secondary/20 p-4 rounded-md border border-border">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Sua senha não é armazenada em nossos servidores. Ela é usada apenas para 
              autorizar esta transação específica em sua carteira digital.
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
          onClick={onConfirmPurchase}
          disabled={isProcessing || !walletPassword}
          className="w-full sm:w-auto button-glow"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            'Finalizar Compra'
          )}
        </Button>
      </div>
    </>
  );
};
