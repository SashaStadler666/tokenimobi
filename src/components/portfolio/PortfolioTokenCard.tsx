
import { useState } from "react";
import { Link } from "react-router-dom";
import { Token } from "@/lib/models";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface PortfolioTokenCardProps {
  token: Token;
}

const PortfolioTokenCard = ({ token }: PortfolioTokenCardProps) => {
  const [sellAmount, setSellAmount] = useState("0");
  const [userOwnedFractions] = useState(50); // Mock data, assume user owns 50 fractions
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSell = () => {
    const amount = parseInt(sellAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Digite uma quantidade válida");
      return;
    }
    
    if (amount > userOwnedFractions) {
      toast.error(`Você possui apenas ${userOwnedFractions} frações`);
      return;
    }
    
    // In a real app, this would call an API to process the sell order
    toast.success(`Ordem de venda de ${amount} frações enviada com sucesso!`);
    setDialogOpen(false); // Close dialog after successful sell
  };
  
  const handleSellAll = () => {
    setSellAmount(userOwnedFractions.toString());
    // In a real app, we might want to execute the sell immediately
    // For now we just set the amount, so user can review before confirming
  };
  
  return (
    <Card className="overflow-hidden border border-muted">
      <div className="relative h-40 bg-muted">
        <img 
          src={token.imageUrl} 
          alt={token.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="font-semibold truncate">{token.name}</h3>
          <p className="text-xs opacity-80">{token.symbol}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Preço por fração</p>
            <p className="font-medium">R${token.fractionPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Variação 24h</p>
            <p className={`font-medium flex items-center ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
              {token.priceChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(token.priceChange24h).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Frações possuídas</p>
            <p className="font-medium">{userOwnedFractions}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Valor total</p>
            <p className="font-medium">R${(userOwnedFractions * token.fractionPrice).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex-1">Vender</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vender frações de {token.name}</DialogTitle>
                <DialogDescription>
                  Especifique a quantidade de frações que deseja vender.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Quantidade de frações para vender</p>
                  <Input 
                    type="number" 
                    value={sellAmount} 
                    onChange={(e) => setSellAmount(e.target.value)}
                    min={1}
                    max={userOwnedFractions}
                  />
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSellAll}
                      className="w-full"
                    >
                      Vender Todas ({userOwnedFractions} frações)
                    </Button>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Preço estimado</p>
                  <p className="font-medium">
                    R${(!isNaN(parseFloat(sellAmount)) ? parseFloat(sellAmount) * token.fractionPrice : 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleSell}>Confirmar Venda</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Link to={`/token/${token.id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              Detalhes
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTokenCard;
