import { useState } from "react";
import { Token } from "@/lib/models";
import { addTransaction } from "@/lib/models/Transaction";
import { toast } from "sonner";
import { useWalletConnection } from "./useWalletConnection";
import { buyToken } from "@/utils/contractUtils";

export const useTokenPurchase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWalletConnection();

  const purchaseToken = async (tokenId: number, _priceEth: number) => {
    if (!isConnected || !walletAddress) {
      toast.error("Conecte sua carteira");
      return false;
    }

    setIsProcessing(true);

    try {
      const success = await buyToken(tokenId, walletAddress);
      return success;
    } catch (e) {
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
