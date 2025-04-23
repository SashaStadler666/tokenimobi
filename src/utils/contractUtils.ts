
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

    // Determine which method to call based on token type
    const method = type === 'K1' ? 'mintK1' : 'mintK2';
    
    // Call the appropriate mint method on the contract
    // This will work as long as the contract's mintK1 and mintK2 functions are 
    // allowed to be called by users (not restricted to owner)
    await contract.methods[method](walletAddress).send({
      from: walletAddress
    });
    
    toast.success(`Token ${type} mintado com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao mintar token:', error);
    
    // Check if the error is related to owner-only restriction
    if (error.message && error.message.includes('revert') && 
        (error.message.includes('owner') || error.message.includes('Ownable'))) {
      toast.error('Essa operação só pode ser realizada pelo proprietário do contrato. Entre em contato com o administrador para adquirir este token.');
    } else if (error.code === 4001) {
      toast.error('Transação rejeitada pelo usuário');
    } else {
      toast.error(error.message || 'Erro ao mintar token');
    }
    
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

    // Try to use the buyToken method if it exists, otherwise fallback to mintKX
    let method;
    let tokenType: 'K1' | 'K2' = 'K1';
    
    if (tokenId === 1 || tokenId === Number("k1")) {
      tokenType = 'K1';
      method = contract.methods.mintK1 ? 'mintK1' : 'buyToken';
    } else {
      tokenType = 'K2';
      method = contract.methods.mintK2 ? 'mintK2' : 'buyToken';
    }
    
    // If using buyToken method (universal buying method)
    if (method === 'buyToken' && contract.methods[method]) {
      await contract.methods[method](tokenId).send({
        from: walletAddress
      });
    } else {
      // Fallback to mintK1/mintK2
      await mintToken(tokenType, walletAddress);
    }
    
    toast.success(`Token ${tokenId} comprado com sucesso!`);
    return true;
  } catch (error: any) {
    console.error('Erro ao comprar token:', error);
    
    // Check if the error is related to owner-only restriction
    if (error.message && error.message.includes('revert') && 
        (error.message.includes('owner') || error.message.includes('Ownable'))) {
      toast.error('Esse token só pode ser comprado pelo proprietário do contrato. Por favor, entre em contato com o administrador.');
    } else if (error.code === 4001) {
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

    // Check if sellToken method exists in the contract
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
