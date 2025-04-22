
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
    const owner = await contract.methods.owner().call();
    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Erro ao verificar proprietário:', error);
    return false;
  }
};

export const getConnectedWallet = async (): Promise<string | null> => {
  try {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask não está instalada');
      return null;
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    } else {
      // Only show this toast if the user is actively trying to connect
      // toast.error('Nenhuma carteira conectada');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter carteira:', error);
    toast.error('Erro ao verificar carteira conectada');
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

export const mintToken = async (
  type: 'K1' | 'K2',
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
    } else if (activeWallet.toLowerCase() !== walletAddress.toLowerCase()) {
      toast.error('Endereço da carteira conectada não corresponde ao endereço fornecido');
      return false;
    }

    const method = type === 'K1' ? 'mintK1' : 'mintK2';
    
    await contract.methods[method](walletAddress).send({
      from: walletAddress
    });
    
    toast.success(`Token ${type} mintado com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao mintar token:', error);
    toast.error(error.message || 'Erro ao mintar token');
    return false;
  }
};

export const buyToken = async (
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
    } else if (activeWallet.toLowerCase() !== walletAddress.toLowerCase()) {
      toast.error('Endereço da carteira conectada não corresponde ao endereço fornecido');
      return false;
    }

    // Determine which method to call based on tokenId
    const method = tokenId === 1 ? 'mintK1' : 'mintK2';
    
    // Call the appropriate buy method on the contract
    await contract.methods[method](walletAddress).send({
      from: walletAddress
    });
    
    toast.success(`Token ${tokenId} comprado com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao comprar token:', error);
    if (error.code === 4001) {
      toast.error('Transação rejeitada pelo usuário');
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

    // Call sellToken method if it exists in the contract
    // This is just a placeholder since we don't have the exact contract method
    await contract.methods.sellToken(tokenId).send({
      from: walletAddress
    });
    
    toast.success(`Token ${tokenId} vendido com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao vender token:', error);
    toast.error(error.message || 'Erro ao vender token');
    return false;
  }
};
