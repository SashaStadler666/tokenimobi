import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWalletConnection } from "./useWalletConnection";
import { mintToken } from "@/utils/contractUtils";
import { toast } from "sonner";

export const usePurchaseWithSupabase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWalletConnection();

  const insertPurchaseRequest = async (tokenId: number, valor: number, wallet: string) => {
    const { data, error } = await supabase
      .from('K Instituto de Desenvolvimento Econômico')
      .insert([{
        token_id: tokenId,
        status: 'pendente',
        valor: valor,
        wallet: wallet
      }]);

    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      throw error;
    }
    
    return data;
  };

  const purchaseToken = async (tokenId: number, valor: number) => {
    if (!isConnected || !walletAddress) {
      toast.error("Conecte sua carteira primeiro");
      return false;
    }

    setIsProcessing(true);

    try {
      // Inserir solicitação de compra no Supabase
      await insertPurchaseRequest(tokenId, valor, walletAddress);
      
      // Mintar o token
      const success = await mintToken(tokenId === 1 ? "K1" : "K2", walletAddress);
      
      if (success) {
        toast.success("Token mintado e solicitação registrada com sucesso!");
        return true;
      } else {
        toast.error("Erro ao mintar o token");
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
