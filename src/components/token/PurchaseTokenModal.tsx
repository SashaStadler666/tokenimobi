
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Token } from "@/lib/models";
import { useWalletConnection } from "@/hooks/useWalletConnection";

interface PurchaseTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: Token;
}

const PurchaseTokenModal = ({ open, onOpenChange, token }: PurchaseTokenModalProps) => {
  const [fractions, setFractions] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isConnected, connectWallet } = useWalletConnection();

  const totalPrice = fractions * token.fractionPrice;
  const meetsMinimum = totalPrice >= 1000;
  const minimumFractions = Math.ceil(1000 / token.fractionPrice);

  const handleBuy = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!meetsMinimum) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${fractions} frações de ${token.name} adquiridas com sucesso.`);
      setFractions(0);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
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
            <label htmlFor="fractions" className="text-sm font-medium mb-2 block">
              Quantidade de frações
            </label>
            <Input
              id="fractions"
              type="number"
              value={fractions || ""}
              onChange={(e) => setFractions(Number(e.target.value))}
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
              <span className={meetsMinimum ? "text-primary" : "text-destructive"}>
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
            {!meetsMinimum && totalPrice > 0 && (
              <p className="text-xs text-destructive mt-2">
                O valor mínimo de investimento é R$1.000,00
              </p>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleBuy}
          disabled={!meetsMinimum || loading}
          className="w-full button-glow"
        >
          {loading ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseTokenModal;
