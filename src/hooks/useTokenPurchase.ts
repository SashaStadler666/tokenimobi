
import { useState } from "react";
import { Token } from "@/lib/models";
import { addTransaction } from "@/lib/models/Transaction";
import { toast } from "sonner";
import { useWalletConnection } from "./useWalletConnection";
import { buyToken } from "@/utils/contractUtils";

export const useTokenPurchase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWalletConnection();

  const purchaseToken = async (token: Token, fractions: number) => {
    if (!isConnected) {
      toast.error("Conecte sua carteira para comprar tokens");
      return false;
    }

    if (!walletAddress) {
      toast.error("Endereço da carteira não encontrado");
      return false;
    }

    // Validate fractions against available
    if (token.availableFractions !== undefined && fractions > token.availableFractions) {
      toast.error(`Apenas ${token.availableFractions} frações disponíveis para este token`);
      return false;
    }

    setIsProcessing(true);

    try {
      // For K Institute tokens use buyToken directly
      const isKToken = token.symbol === "K1" || token.symbol === "K2";
      
      let success = false;
      
      if (isKToken) {
        // Use tokenId from token.id (convert k1/k2 string to number if needed)
        const tokenId = token.id;
        success = await buyToken(tokenId, walletAddress);
      } else {
        // For other tokens, we'd use a different approach
        // This is a mock success for demonstration
        success = true;
        toast.success(`Transação simulada para ${token.symbol}. Em produção, interagiria com o contrato.`);
      }

      if (success) {
        const transaction = addTransaction({
          tokenId: token.id,
          type: "buy",
          fractions,
          price: token.fractionPrice,
          total: fractions * token.fractionPrice,
          timestamp: new Date()
        });

        if (token.availableFractions !== undefined) {
          token.availableFractions -= fractions;
        }

        toast.success(`Compra de ${fractions} frações de ${token.name} realizada com sucesso!`);
        return transaction;
      } else {
        toast.error("Erro ao processar a transação no blockchain");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar a compra");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    purchaseToken,
    isProcessing
  };
};
