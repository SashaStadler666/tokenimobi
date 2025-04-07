
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
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
  const { isConnected, connectWallet } = useWalletConnection();
  
  // Calculate total cost
  const totalCost = amount * token.fractionPrice;
  const minimumInvestment = 1000; // R$1.000,00
  const minimumFractions = Math.ceil(minimumInvestment / token.fractionPrice);
  
  // Reset amount when modal opens
  useEffect(() => {
    if (open) {
      setAmount(minimumFractions);
    }
  }, [open, minimumFractions]);

  // Handle purchase
  const handlePurchase = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (amount <= 0 || totalCost < minimumInvestment) {
      toast.error("Investimento mínimo de R$1.000,00 necessário");
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
            onClick={handlePurchase}
            disabled={isProcessing || totalCost < minimumInvestment}
            className="w-full button-glow"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : !isConnected ? (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Conectar Carteira
              </>
            ) : (
              'Confirmar Compra'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
