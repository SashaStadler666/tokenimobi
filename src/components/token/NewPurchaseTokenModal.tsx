
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

interface PurchaseTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: {
    id: string;
    name: string;
    symbol: string;
    imageUrl: string;
    fractionPrice: number;
  };
  isWalletConnected: boolean;
  onConnectWallet?: () => void;
}

const NewPurchaseTokenModal = ({ open, onOpenChange, token, isWalletConnected, onConnectWallet }: PurchaseTokenModalProps) => {
  const [fractions, setFractions] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPrice = fractions * token.fractionPrice;
  const meetsMinimum = totalPrice >= 1000;
  const minimumFractions = Math.ceil(1000 / token.fractionPrice);

  const handleBuy = () => {
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
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="text-center">Comprar Frações de {token.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img 
            src={token.imageUrl} 
            alt={token.name} 
            className="w-32 h-32 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=64";
            }}
          />
          <p className="text-sm text-muted-foreground">Preço por fração: R$ {token.fractionPrice.toFixed(2)}</p>

          <Input
            type="number"
            placeholder="Quantidade de frações"
            min={minimumFractions}
            value={fractions || ""}
            onChange={(e) => setFractions(Number(e.target.value))}
          />

          <p className="text-sm">
            Total: <span className={meetsMinimum ? "text-foreground" : "text-destructive"}>R$ {totalPrice.toFixed(2)}</span>
          </p>
          
          {!meetsMinimum && totalPrice > 0 && (
            <p className="text-xs text-destructive">O valor mínimo de investimento é R$1.000,00</p>
          )}

          {!isWalletConnected && (
            <Button variant="outline" onClick={onConnectWallet} className="w-full flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Conectar Wallet
            </Button>
          )}

          <Button
            onClick={handleBuy}
            disabled={!meetsMinimum || loading || !isWalletConnected}
            className="w-full button-glow"
          >
            {loading ? "Processando..." : "Confirmar Compra"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPurchaseTokenModal;
