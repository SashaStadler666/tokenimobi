
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

      // Inserir solicitação de compra no Supabase (sempre fazer isso, mesmo se der erro no blockchain)
      const supabaseSuccess = await insertPurchaseRequest(tokenId, valor, userWallet);
      
      if (!supabaseSuccess) {
        toast.error("Não foi possível registrar a compra. Tente novamente.");
      }
      
      try {
        // Tentativa de compra no blockchain (mesmo que o supabaseSuccess seja false)
        const purchaseSuccess = await buyToken(tokenId, userWallet);
        
        if (purchaseSuccess) {
          toast.success(`Token ${tokenId} comprado com sucesso!`);
          return true;
        } else {
          toast.info("A operação foi registrada, mas não pôde ser finalizada no blockchain. Um administrador entrará em contato.");
          return supabaseSuccess; // Consideramos sucesso se pelo menos o registro foi feito
        }
      } catch (blockchainError: any) {
        console.error("Erro na interação com blockchain:", blockchainError);
        // Se deu erro no blockchain mas o registro foi feito, ainda consideramos parcialmente bem-sucedido
        toast.info("A solicitação foi registrada, mas ocorreu um erro na interação com o blockchain. Um administrador entrará em contato para finalizar a compra.");
        return supabaseSuccess;
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
