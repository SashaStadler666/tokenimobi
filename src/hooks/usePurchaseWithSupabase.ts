
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { toast } from "sonner";
import { buyToken } from "@/utils/contractUtils";

export const usePurchaseWithSupabase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, walletAddress, checkWalletConnection, connectWallet } = useWalletConnection();

  const insertPurchaseRequest = async (tokenId: number, valor: number, wallet: string) => {
    try {
      console.log('Inserindo no Supabase:', { tokenId, valor, wallet });
      
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
        // Não falhar por erro do Supabase, continuar com a compra
        return { success: false, message: `Aviso: ${error.message}`, continueWithPurchase: true };
      }
      
      console.log('Inserção no Supabase bem-sucedida:', data);
      return { success: true, message: 'Solicitação registrada com sucesso' };
    } catch (error: any) {
      console.error('Erro ao registrar no Supabase:', error);
      // Não falhar por erro do Supabase, continuar com a compra
      return { 
        success: false, 
        message: `Aviso: ${error.message || 'Erro desconhecido'}`,
        continueWithPurchase: true
      };
    }
  };

  const purchaseToken = async (tokenId: number, valor: number) => {
    console.log('Iniciando compra:', { tokenId, valor, isConnected, walletAddress });
    
    setIsProcessing(true);

    try {
      // Verificar se a carteira está conectada
      if (!isConnected || !walletAddress) {
        console.log('Carteira não conectada, tentando conectar...');
        const newWalletAddress = await connectWallet();
        
        if (!newWalletAddress) {
          setIsProcessing(false);
          return { 
            success: false, 
            message: "Falha ao conectar carteira. Por favor, verifique se o MetaMask está instalado e desbloqueado." 
          };
        }
        
        console.log('Carteira conectada:', newWalletAddress);
      }

      // Usar o endereço da carteira atual
      const currentWalletAddress = walletAddress || await connectWallet();
      
      if (!currentWalletAddress) {
        setIsProcessing(false);
        return { 
          success: false, 
          message: "Endereço da carteira não encontrado." 
        };
      }

      console.log('Usando endereço da carteira:', currentWalletAddress);

      // Tentar inserir no Supabase (opcional)
      const supabaseResult = await insertPurchaseRequest(tokenId, valor, currentWalletAddress);
      
      if (supabaseResult.success) {
        console.log('Registro no Supabase OK, prosseguindo com blockchain...');
      } else if (supabaseResult.continueWithPurchase) {
        console.log('Erro no Supabase mas continuando com blockchain:', supabaseResult.message);
        toast.info("Continuando com a compra...");
      }

      // Executar compra no blockchain
      console.log('Iniciando transação blockchain para token:', tokenId);
      const purchaseSuccess = await buyToken(tokenId, currentWalletAddress);
      
      if (purchaseSuccess) {
        console.log('Compra blockchain bem-sucedida');
        return { 
          success: true, 
          message: `Token ${tokenId} comprado com sucesso!` 
        };
      } else {
        console.log('Compra blockchain falhou');
        return { 
          success: false, 
          message: "Erro na transação blockchain. Verifique sua carteira e tente novamente." 
        };
      }
      
    } catch (error: any) {
      console.error("Erro ao processar a compra:", error);
      return { 
        success: false, 
        message: error.message || "Erro inesperado ao processar a compra" 
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
