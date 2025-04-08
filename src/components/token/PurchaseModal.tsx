
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, Info, AlertCircle, Lock } from "lucide-react";
import { Token, addTransaction } from "@/lib/models";
import { toast } from "sonner";
import { useWalletConnection } from "@/hooks/useWalletConnection";

interface PurchaseModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseModal = ({ token, open, onOpenChange }: PurchaseModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [step, setStep] = useState<"input" | "summary" | "password">("input");
  const [walletPassword, setWalletPassword] = useState<string>("");
  const { isConnected, connectWallet } = useWalletConnection();
  
  // Calculate total cost
  const totalCost = amount * token.fractionPrice;
  const minimumInvestment = 1000; // R$1.000,00
  const minimumFractions = Math.ceil(minimumInvestment / token.fractionPrice);
  const networkFee = 0.15; // R$0.15 network fee
  const totalWithFees = totalCost + networkFee;
  
  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setAmount(minimumFractions);
      setStep("input");
      setWalletPassword("");
    }
  }, [open, minimumFractions]);

  // Handle proceed to summary
  const handleProceedToSummary = () => {
    if (amount <= 0 || totalCost < minimumInvestment) {
      toast.error("Investimento mínimo de R$1.000,00 necessário");
      return;
    }
    
    setStep("summary");
  };
  
  // Handle proceed to password
  const handleProceedToPassword = () => {
    setStep("password");
  };

  // Handle purchase
  const handlePurchase = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!walletPassword) {
      toast.error("Senha da carteira é obrigatória");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Create transaction record
        addTransaction({
          tokenId: token.id,
          type: 'buy',
          fractions: amount,
          price: token.fractionPrice,
          total: totalCost,
          timestamp: new Date()
        });
        
        toast.success(`Compra de ${amount} frações do token ${token.name} realizada com sucesso!`);
        
        // Close modal and reset
        onOpenChange(false);
        setAmount(minimumFractions);
        setStep("input");
        setWalletPassword("");
      } catch (error) {
        toast.error("Erro ao processar a compra. Tente novamente.");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setAmount(value);
  };

  // Render based on current step
  const renderStep = () => {
    switch (step) {
      case "input":
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
                  onChange={handleAmountChange}
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
                  <span className={totalCost < minimumInvestment ? "text-destructive" : "text-primary"}>
                    R$ {totalCost.toFixed(2)}
                  </span>
                </div>
                {totalCost < minimumInvestment && (
                  <p className="text-xs text-destructive mt-2">
                    O valor mínimo de investimento é R$1.000,00
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                onClick={handleProceedToSummary}
                disabled={isProcessing || totalCost < minimumInvestment}
                className="w-full button-glow"
              >
                {!isConnected ? (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Conectar Carteira
                  </>
                ) : (
                  'Prosseguir'
                )}
              </Button>
            </DialogFooter>
          </>
        );
        
      case "summary":
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
                    <span>R$ {networkFee.toFixed(2)}</span>
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
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("input")}
                className="w-full sm:w-auto"
              >
                Voltar
              </Button>
              <Button
                onClick={handleProceedToPassword}
                className="w-full sm:w-auto button-glow"
              >
                Confirmar e Continuar
              </Button>
            </DialogFooter>
          </>
        );
        
      case "password":
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
                  onChange={(e) => setWalletPassword(e.target.value)}
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
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("summary")}
                className="w-full sm:w-auto"
              >
                Voltar
              </Button>
              <Button
                onClick={handlePurchase}
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
            </DialogFooter>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img 
              src={token.imageUrl} 
              alt={token.name} 
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=64";
              }}
            />
            Comprar {token.name} ({token.symbol})
          </DialogTitle>
        </DialogHeader>
        
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
