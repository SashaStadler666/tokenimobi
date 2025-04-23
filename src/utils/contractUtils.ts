import Web3 from 'web3';
import { toast } from "sonner";
import TokenK_ABI from "@/lib/TokenK_ABI.json";

const CONTRACT_ADDRESS = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';

export const initWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    // Use a type assertion to handle the provider type mismatch
    const provider = window.ethereum as any;
    const web3 = new Web3(provider);
    return web3;
  }
  throw new Error('MetaMask não está instalado');
};

export const getContract = async () => {
  try {
    const web3 = await initWeb3();
    return new web3.eth.Contract(TokenK_ABI as any, CONTRACT_ADDRESS);
  } catch (error) {
    console.error('Erro ao inicializar contrato:', error);
    toast.error('Erro ao conectar com o contrato. Verifique se a MetaMask está instalada e conectada.');
    throw error;
  }
};

export const isContractOwner = async (address: string): Promise<boolean> => {
  try {
    const contract = await getContract();
    // Only check if the owner function exists in the contract
    if (contract.methods.owner) {
      const owner = await contract.methods.owner().call();
      return owner.toLowerCase() === address.toLowerCase();
    }
    return false;
  } catch (error) {
    console.error('Erro ao verificar proprietário:', error);
    return false;
  }
};

export const getConnectedWallet = async (): Promise<string | null> => {
  try {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask não está instalada');
      return null;
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter carteira:', error);
    return null;
  }
};

export const connectWallet = async (): Promise<string | null> => {
  try {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask não está instalada');
      return null;
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    } else {
      toast.error('Nenhuma carteira conectada');
      return null;
    }
  } catch (error: any) {
    console.error('Erro ao conectar carteira:', error);
    if (error.code === 4001) {
      toast.error('Conexão rejeitada pelo usuário');
    } else {
      toast.error('Erro ao conectar carteira');
    }
    return null;
  }
};

export const buyToken = async (
  tokenId: number | string,
  walletAddress: string
): Promise<boolean> => {
  try {
    const contract = await getContract();
    const web3 = await initWeb3();
    const activeWallet = await getConnectedWallet();
    
    if (!activeWallet) {
      const newWallet = await connectWallet();
      if (!newWallet) {
        toast.error('É necessário conectar uma carteira para realizar esta operação');
        return false;
      }
    } else if (activeWallet.toLowerCase() !== walletAddress.toLowerCase()) {
      toast.error('Endereço da carteira conectada não corresponde ao endereço fornecido');
      return false;
    }

    let numericTokenId: number;
    if (typeof tokenId === 'string') {
      if (tokenId === 'k1') numericTokenId = 1;
      else if (tokenId === 'k2') numericTokenId = 2;
      else numericTokenId = parseInt(tokenId);
    } else {
      numericTokenId = tokenId;
    }

    let tokenPriceInEth = 0.01; // Default fallback price in ETH
    try {
      if (contract.methods.tokenPrice) {
        const priceWei = await contract.methods.tokenPrice(numericTokenId).call();
        tokenPriceInEth = web3.utils.fromWei(priceWei, 'ether');
      }
    } catch (error) {
      console.warn('Não foi possível obter o preço do token, usando valor padrão:', error);
    }
    
    const valueInWei = web3.utils.toWei(tokenPriceInEth.toString(), 'ether');
    
    await contract.methods.buyToken(numericTokenId).send({
      from: walletAddress,
      value: valueInWei
    });
    
    toast.success(`Token ${numericTokenId} comprado com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao comprar token:', error);
    
    if (error.code === 4001) {
      toast.error('Transação rejeitada pelo usuário');
    } else if (error.message && error.message.includes('insufficient funds')) {
      toast.error('Fundos insuficientes para completar a transação');
    } else {
      toast.error(error.message || 'Erro ao comprar token');
    }
    
    return false;
  }
};

export const sellToken = async (
  tokenId: number,
  walletAddress: string
): Promise<boolean> => {
  try {
    const contract = await getContract();
    const activeWallet = await getConnectedWallet();
    
    if (!activeWallet) {
      const newWallet = await connectWallet();
      if (!newWallet) {
        toast.error('É necessário conectar uma carteira para realizar esta operação');
        return false;
      }
    }

    if (contract.methods.sellToken) {
      await contract.methods.sellToken(tokenId).send({
        from: walletAddress
      });
      toast.success(`Token ${tokenId} vendido com sucesso!`);
      return true;
    } else {
      throw new Error('Função de venda não disponível neste contrato');
    }
  } catch (error: any) {
    console.error('Erro ao vender token:', error);
    
    if (error.code === 4001) {
      toast.error('Transação rejeitada pelo usuário');
    } else {
      toast.error(error.message || 'Erro ao vender token');
    }
    
    return false;
  }
};

export const mintToken = async (
  type: 'K1' | 'K2',
  walletAddress: string
): Promise<boolean> => {
  const tokenId = type === 'K1' ? 1 : 2;
  return buyToken(tokenId, walletAddress);
};
