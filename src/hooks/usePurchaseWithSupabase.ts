
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWalletConnection } from "./useWalletConnection";
import { buyToken, connectWallet, getConnectedWallet } from "@/utils/contractUtils";
import { toast } from "sonner";

export const usePurchaseWithSupabase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress } = useWalletConnection();

  const insertPurchaseRequest = async (tokenId: number, valor: number, wallet: string) => {
    try {
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
        toast.error(`Erro ao registrar compra: ${error.message}`);
        return false;
      }
      
      toast.success('Solicitação registrada com sucesso');
      return true;
    } catch (error: any) {
      console.error('Erro ao registrar no Supabase:', error);
      toast.error(`Erro ao registrar compra: ${error.message || 'Erro desconhecido'}`);
      return false;
    }
  };

  const purchaseToken = async (tokenId: number, valor: number) => {
    setIsProcessing(true);

    try {
      // Verificar conexão da carteira
      let userWallet = walletAddress;
      
      if (!isConnected || !userWallet) {
        toast.error("Carteira não conectada. Conectando...");
        userWallet = await connectWallet();
        
        if (!userWallet) {
          toast.error("Falha ao conectar carteira. Por favor, tente novamente.");
          return false;
        }
      } else {
        // Validar se a carteira ainda está conectada
        const connectedWallet = await getConnectedWallet();
        if (!connectedWallet) {
          toast.error("Conexão com a carteira perdida. Reconectando...");
          userWallet = await connectWallet();
          
          if (!userWallet) {
            toast.error("Falha ao reconectar carteira. Por favor, tente novamente.");
            return false;
          }
        } else if (connectedWallet.toLowerCase() !== userWallet.toLowerCase()) {
          toast.error("Endereço da carteira mudou. Por favor, reconecte sua carteira.");
          return false;
        }
      }

      // Inserir solicitação de compra no Supabase
      const supabaseSuccess = await insertPurchaseRequest(tokenId, valor, userWallet);
      
      if (!supabaseSuccess) {
        toast.error("Não foi possível registrar a compra. Tente novamente.");
        return false;
      }
      
      // Comprar o token
      const purchaseSuccess = await buyToken(tokenId, userWallet);
      
      if (purchaseSuccess) {
        toast.success(`Token ${tokenId} comprado com sucesso!`);
        return true;
      } else {
        toast.error("Erro ao finalizar a compra do token");
        return false;
      }
    } catch (error: any) {
      console.error("Erro ao processar a compra:", error);
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
