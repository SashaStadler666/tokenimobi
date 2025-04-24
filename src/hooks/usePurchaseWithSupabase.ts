
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWalletConnection } from "./useWalletConnection";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { toast } from "sonner";

export const usePurchaseWithSupabase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress, checkWalletConnection } = useWalletConnection();

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
      // Força uma verificação nova do estado da carteira
      await checkWalletConnection();
      
      // Verificar conexão da carteira
      let userWallet = walletAddress;
      
      if (!isConnected || !userWallet) {
        toast.error("Carteira não conectada. Conectando...");
        userWallet = await connectWallet();
        
        if (!userWallet) {
          toast.error("Falha ao conectar carteira. Por favor, tente novamente.");
          setIsProcessing(false);
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
            setIsProcessing(false);
            return false;
          }
        } else if (connectedWallet.toLowerCase() !== userWallet.toLowerCase()) {
          toast.error("Endereço da carteira mudou. Por favor, reconecte sua carteira.");
          setIsProcessing(false);
          return false;
        }
      }

      // Inserir solicitação de compra no Supabase (sempre fazer isso, antes de interagir com blockchain)
      const supabaseSuccess = await insertPurchaseRequest(tokenId, valor, userWallet);
      
      // Mesmo se o registro falhar, tentar a compra no blockchain
      try {
        // Usa buyToken diretamente em vez de mintToken
        const purchaseSuccess = await buyToken(tokenId, userWallet);
        
        if (purchaseSuccess) {
          toast.success(`Token ${tokenId} comprado com sucesso!`);
          return true;
        } else if (supabaseSuccess) {
          toast.info("A operação foi registrada, mas não pôde ser finalizada no blockchain. Um administrador entrará em contato.");
          return true; // Consideramos sucesso se pelo menos o registro foi feito
        } else {
          toast.error("Não foi possível registrar nem finalizar a compra. Tente novamente mais tarde.");
          return false;
        }
      } catch (blockchainError: any) {
        console.error("Erro na interação com blockchain:", blockchainError);
        
        // Se deu erro no blockchain mas o registro foi feito, ainda consideramos parcialmente bem-sucedido
        if (supabaseSuccess) {
          toast.info("A solicitação foi registrada, mas ocorreu um erro na interação com o blockchain. Um administrador entrará em contato para finalizar a compra.");
          return true;
        } else {
          toast.error("Ocorreu um erro na transação e não foi possível registrá-la. Tente novamente mais tarde.");
          return false;
        }
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
