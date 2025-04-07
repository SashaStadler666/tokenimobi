
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wallet, ShoppingCart } from "lucide-react";

interface PurchaseTokenModalProps {
  open: boolean;
  onClose: () => void;
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

const PurchaseTokenModal = ({ open, onClose, token, isWalletConnected, onConnectWallet }: PurchaseTokenModalProps) => {
  const [fractions, setFractions] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const totalPrice = fractions * token.fractionPrice;
  const meetsMinimum = totalPrice >= 1000;
  const maxAvailable = 150;

  const handleBuy = () => {
    if (!meetsMinimum || fractions <= 0 || isNaN(fractions) || fractions > maxAvailable) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Compra realizada!",
        description: `${fractions} frações de ${token.name} adquiridas com sucesso.`,
      });
      setFractions(0);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
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
          <p className="text-sm text-muted-foreground">Frações disponíveis: {maxAvailable}</p>

          <Input
            type="number"
            placeholder="Quantidade de frações"
            min={1}
            max={maxAvailable}
            value={fractions || ""}
            onChange={(e) => setFractions(Math.max(0, Number(e.target.value)))}
          />

          <p className="text-sm">
            Total: <span className={meetsMinimum ? "text-foreground" : "text-destructive"}>R$ {totalPrice.toFixed(2)}</span>
          </p>

          {!isWalletConnected && (
            <Button variant="outline" onClick={onConnectWallet} className="w-full flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Conectar Wallet
            </Button>
          )}

          <Button
            onClick={handleBuy}
            disabled={!meetsMinimum || loading || !isWalletConnected || fractions > maxAvailable}
            className="w-full flex items-center justify-center gap-2"
          >
            {loading ? "Processando..." : (<><ShoppingCart className="h-4 w-4" /> Confirmar Compra</>)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseTokenModal;
