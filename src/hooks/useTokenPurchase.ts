import { useState } from "react";
import Web3 from "web3";
import TokenK_ABI from "@/lib/TokenK_ABI.json";
import { Token } from "@/lib/models";
import { addTransaction } from "@/lib/models/Transaction";
import { toast } from "sonner";
import { useWalletConnection } from "./useWalletConnection";

const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";

export const useTokenPurchase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWalletConnection();

  const purchaseToken = async (token: Token, fractions: number) => {
    if (!window.ethereum) {
      toast.error("Instale a MetaMask");
      return false;
    }

    if (!isConnected) {
      toast.error("Conecte sua carteira para comprar tokens");
      return false;
    }

    if (!walletAddress) {
      toast.error("Endereço da carteira não encontrado");
      return false;
    }

    if (fractions <= 0) {
      toast.error("Quantidade de frações inválida");
      return false;
    }

    setIsProcessing(true);

    try {
      const web3 = new Web3(window.ethereum as any);
      const contract = new web3.eth.Contract(TokenK_ABI as any, CONTRACT_ADDRESS);

      const totalPrice = (fractions * token.fractionPrice).toString();
      const totalPriceInWei = web3.utils.toWei(totalPrice, "ether");

      await contract.methods.buyToken(Number(token.id)).send({
        from: walletAddress,
        value: totalPriceInWei,
      });

      const transaction = addTransaction({
        tokenId: token.id,
        type: "buy",
        fractions,
        price: token.fractionPrice,
        total: fractions * token.fractionPrice,
        timestamp: new Date()
      });

      if (token.availableFractions) {
        token.availableFractions -= fractions;
      }

      toast.success(`Compra de ${fractions} frações de ${token.name} realizada com sucesso!`);
      return transaction;
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
