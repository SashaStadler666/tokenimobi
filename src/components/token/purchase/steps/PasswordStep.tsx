
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowLeft, Loader2 } from "lucide-react";
import { PurchaseStepProps } from "../types";

export function PasswordStep({
  token,
  amount,
  isProcessing,
  walletPassword,
  onWalletPasswordChange,
  onPrevious,
  onConfirmPurchase
}: PurchaseStepProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 py-2">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">Confirmar Compra</h3>
            <p className="text-sm text-muted-foreground">
              Digite a senha da sua carteira para finalizar a compra
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-password">Senha da Carteira</Label>
            <Input
              id="wallet-password"
              type={showPassword ? "text" : "password"}
              value={walletPassword}
              onChange={(e) => onWalletPasswordChange(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isProcessing}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-password"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                disabled={isProcessing}
              />
              <Label htmlFor="show-password" className="text-xs text-muted-foreground cursor-pointer">
                Mostrar senha
              </Label>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Resumo da compra:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{amount} frações de {token.symbol}</li>
              <li>Valor por fração: R$ {token.fractionPrice.toFixed(2)}</li>
              <li>Total: R$ {(amount * token.fractionPrice).toFixed(2)}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          type="button" 
          onClick={onConfirmPurchase} 
          className="w-full"
          disabled={isProcessing || !walletPassword}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Confirmar Compra"
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious} 
          className="w-full"
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    </div>
  );
}
