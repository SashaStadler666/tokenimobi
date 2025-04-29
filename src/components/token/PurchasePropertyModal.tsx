
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Token } from "@/lib/models";
import { toast } from "sonner";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { Loader2, Wallet } from "lucide-react";

interface PurchasePropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: Token;
}

const PurchasePropertyModal = ({ open, onOpenChange, token }: PurchasePropertyModalProps) => {
  const [loading, setLoading] = useState(false);
  const { isConnected, connectWallet } = useWalletConnection();
  const isKToken = token.symbol === "K1" || token.symbol === "K2";

  const handlePurchase = () => {
    if (!isConnected) {
      toast.error("Carteira não conectada. Conecte sua carteira para realizar esta operação");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const successMessage = isKToken 
        ? `Compra do imóvel ${token.name} iniciada com sucesso!` 
        : `Compra do imóvel ${token.name} iniciada com sucesso!`;
      toast.success(successMessage);
      setLoading(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleConnectAndBuy = async () => {
    await connectWallet();
    // After connection is successful, we can proceed
    if (isConnected) {
      handlePurchase();
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
            {isKToken ? `Comprar ${token.name}` : `Comprar ${token.name}`}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              Valor do imóvel: {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(token.wholePropertyPrice || 0)}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKToken 
                ? "Ao confirmar, você iniciará o processo de compra deste imóvel institucional."
                : "Ao confirmar, você iniciará o processo de compra do imóvel inteiro."}
            </p>
          </div>

          {!isConnected ? (
            <Button variant="outline" onClick={handleConnectAndBuy} className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Conectar Carteira
            </Button>
          ) : (
            <Button 
              className="w-full"
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar Compra'
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasePropertyModal;
