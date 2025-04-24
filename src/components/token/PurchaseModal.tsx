
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Token } from "@/lib/models";
import { PurchaseStep } from "./purchase/types";
import { InputStep } from "./purchase/steps/InputStep";
import { SummaryStep } from "./purchase/steps/SummaryStep";
import { PasswordStep } from "./purchase/steps/PasswordStep";
import { MINIMUM_INVESTMENT } from "./purchase/constants";
import { usePurchaseWithSupabase } from "@/hooks/usePurchaseWithSupabase";
import { toast } from "sonner";

interface PurchaseModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseModal = ({ token, open, onOpenChange }: PurchaseModalProps) => {
  const [step, setStep] = useState<PurchaseStep>("input");
  const [amount, setAmount] = useState<number>(0);
  const [walletPassword, setWalletPassword] = useState<string>("");
  const { purchaseToken, isProcessing } = usePurchaseWithSupabase();

  const minimumFractions = Math.ceil(MINIMUM_INVESTMENT / token.fractionPrice);
  const maxFractions = token.availableFractions || 1000;

  useEffect(() => {
    if (open) {
      setAmount(minimumFractions);
      setStep("input");
      setWalletPassword("");
    }
  }, [open, minimumFractions]);

  const handlePurchase = async () => {
    if (!walletPassword) {
      toast.error("Digite a senha da carteira");
      return;
    }

    if (amount > maxFractions) {
      toast.error(`Apenas ${maxFractions} frações disponíveis`);
      return;
    }

    const valueInEther = amount * token.fractionPrice;
    
    // Convert token id to number if it's a string
    const tokenId = typeof token.id === "string" ? parseInt(token.id.replace(/\D/g, ''), 10) : Number(token.id);
    const result = await purchaseToken(tokenId, valueInEther);

    if (result.success) {
      onOpenChange(false);
      setAmount(minimumFractions);
      setStep("input");
      setWalletPassword("");

      setTimeout(() => {
        toast.success(result.message || "Compra realizada com sucesso!");
        toast.info("Veja suas novas aquisições no seu portfólio!", {
          action: {
            label: "Ver Portfólio",
            onClick: () => window.location.href = "/portfolio"
          }
        });
      }, 1000);
    } else if (result.partialSuccess) {
      // Caso de erro no blockchain mas sucesso no Supabase
      toast.error("Erro no blockchain, mas sua solicitação foi registrada com sucesso.");
      onOpenChange(false);
    } else {
      toast.error(result.message || "Falha na compra. Verifique sua carteira e tente novamente.");
    }
  };

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
    maxFractions,
  };

  const renderStep = () => {
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
