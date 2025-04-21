
import React, { useState } from "react";
import { Token, Transaction, mockTransactions } from "@/lib/models";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface PortfolioTokenSellDialogProps {
  token: Token;
  userOwnedFractions: number;
  onSell: (fractionsSold: number) => void;
}

const PortfolioTokenSellDialog = ({
  token,
  userOwnedFractions,
  onSell,
}: PortfolioTokenSellDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sellAmount, setSellAmount] = useState("0");

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

    const newTransaction: Transaction = {
      id: `tx${mockTransactions.length + 1}`,
      tokenId: token.id,
      type: "sell",
      fractions: amount,
      price: token.fractionPrice,
      total: amount * token.fractionPrice,
      timestamp: new Date(),
      status: "completed",
      txHash: `0x${Math.random().toString(16).substring(2)}`,
      address: "0xaBcD...1234",
    };

    mockTransactions.push(newTransaction);
    onSell(amount);

    toast.success(`Ordem de venda de ${amount} frações enviada com sucesso!`);
    setDialogOpen(false);
    setSellAmount("0");
  };

  const handleSellAll = () => {
    setSellAmount(userOwnedFractions.toString());
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          disabled={userOwnedFractions <= 0}
        >
          Vender
        </Button>
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
            <p className="text-sm text-muted-foreground mb-2">
              Quantidade de frações para vender
            </p>
            <Input
              type="number"
              value={sellAmount}
              onChange={e => setSellAmount(e.target.value)}
              min={1}
              max={userOwnedFractions}
            />
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSellAll}
                className="w-full"
                disabled={userOwnedFractions <= 0}
              >
                Vender Todas ({userOwnedFractions} frações)
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Preço estimado
            </p>
            <p className="font-medium">
              R$
              {!isNaN(parseFloat(sellAmount))
                ? (parseFloat(sellAmount) * token.fractionPrice).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleSell}
            disabled={
              !sellAmount ||
              parseFloat(sellAmount) <= 0 ||
              parseFloat(sellAmount) > userOwnedFractions
            }
          >
            Confirmar Venda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioTokenSellDialog;
