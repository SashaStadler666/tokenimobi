
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Token, addTransaction } from "@/lib/models";
import { toast } from "sonner";
import { PurchaseStep } from "./purchase/types";
import { InputStep } from "./purchase/steps/InputStep";
import { SummaryStep } from "./purchase/steps/SummaryStep";
import { PasswordStep } from "./purchase/steps/PasswordStep";
import { MINIMUM_INVESTMENT } from "./purchase/constants";

interface PurchaseModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseModal = ({ token, open, onOpenChange }: PurchaseModalProps) => {
  const [step, setStep] = useState<PurchaseStep>("input");
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [walletPassword, setWalletPassword] = useState<string>("");
  
  const minimumFractions = Math.ceil(MINIMUM_INVESTMENT / token.fractionPrice);
  
  useEffect(() => {
    if (open) {
      setAmount(minimumFractions);
      setStep("input");
      setWalletPassword("");
    }
  }, [open, minimumFractions]);

  const handlePurchase = () => {
    if (!walletPassword) {
      toast.error("Senha da carteira é obrigatória");
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        addTransaction({
          tokenId: token.id,
          type: 'buy',
          fractions: amount,
          price: token.fractionPrice,
          total: amount * token.fractionPrice,
          timestamp: new Date()
        });
        
        toast.success(`Compra de ${amount} frações do token ${token.name} realizada com sucesso!`);
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

  const renderStep = () => {
    const stepProps = {
      token,
      amount,
      onAmountChange: setAmount,
      minimumFractions,
      minimumInvestment: MINIMUM_INVESTMENT,
      isProcessing,
      walletPassword,
      onWalletPasswordChange: setWalletPassword,
      onPrevious: () => setStep(step === "summary" ? "input" : "summary"),
      onNext: () => setStep(step === "input" ? "summary" : "password"),
      onConfirmPurchase: handlePurchase,
    };

    switch (step) {
      case "input":
        return <InputStep {...stepProps} />;
      case "summary":
        return <SummaryStep {...stepProps} />;
      case "password":
        return <PasswordStep {...stepProps} />;
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
