
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { toast } from "sonner";
import { buyToken, getConnectedWallet } from "@/utils/contractUtils";

export const usePurchaseWithSupabase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress, checkWalletConnection, connectWallet } = useWalletConnection();

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
        return { success: false, message: `Erro ao registrar compra: ${error.message}` };
      }
      
      return { success: true, message: 'Solicitação registrada com sucesso' };
    } catch (error: any) {
      console.error('Erro ao registrar no Supabase:', error);
      return { 
        success: false, 
        message: `Erro ao registrar compra: ${error.message || 'Erro desconhecido'}` 
      };
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
          return { 
            success: false, 
            message: "Falha ao conectar carteira. Por favor, tente novamente." 
          };
        }
      } else {
        // Validar se a carteira ainda está conectada
        const isStillConnected = await checkWalletConnection();
        if (!isStillConnected || !walletAddress) {
          toast.error("Conexão com a carteira perdida. Reconectando...");
          userWallet = await connectWallet();
          
          if (!userWallet) {
            return { 
              success: false, 
              message: "Falha ao reconectar carteira. Por favor, tente novamente." 
            };
          }
        }
      }

      // Inserir solicitação de compra no Supabase (sempre fazer isso, antes de interagir com blockchain)
      const supabaseResult = await insertPurchaseRequest(tokenId, valor, userWallet);
      
      // Mesmo se o registro falhar, tentar a compra no blockchain
      try {
        // Usa buyToken diretamente com o endereço da carteira
        const purchaseSuccess = await buyToken(tokenId, userWallet);
        
        if (purchaseSuccess) {
          return { 
            success: true, 
            message: `Token ${tokenId} comprado com sucesso!` 
          };
        } else if (supabaseResult.success) {
          return { 
            success: false, 
            partialSuccess: true,
            message: "A operação foi registrada, mas não pôde ser finalizada no blockchain." 
          };
        } else {
          return { 
            success: false, 
            message: "Não foi possível registrar nem finalizar a compra. Tente novamente mais tarde." 
          };
        }
      } catch (blockchainError: any) {
        console.error("Erro na interação com blockchain:", blockchainError);
        
        // Se deu erro no blockchain mas o registro foi feito, ainda consideramos parcialmente bem-sucedido
        if (supabaseResult.success) {
          return { 
            success: false, 
            partialSuccess: true,
            message: "Erro no blockchain, mas sua solicitação foi registrada com sucesso." 
          };
        } else {
          return { 
            success: false, 
            message: "Ocorreu um erro na transação e não foi possível registrá-la. Tente novamente mais tarde." 
          };
        }
      }
    } catch (error: any) {
      console.error("Erro ao processar a compra:", error);
      return { 
        success: false, 
        message: error.message || "Erro ao processar a compra" 
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    purchaseToken,
    isProcessing
  };
};
