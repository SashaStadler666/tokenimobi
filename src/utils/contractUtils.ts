
import Web3 from 'web3';
import { toast } from "sonner";

const CONTRACT_ADDRESS = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';

// Simplified ABI with just the functions we need
const CONTRACT_ABI = [
  {
    "inputs": [{"name": "wallet", "type": "address"}],
    "name": "mintK1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "wallet", "type": "address"}],
    "name": "mintK2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
];

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
  const web3 = await initWeb3();
  return new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);
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

export const mintToken = async (
  type: 'K1' | 'K2',
  walletAddress: string
): Promise<boolean> => {
  try {
    const contract = await getContract();
    const isOwner = await isContractOwner(walletAddress);
    
    if (!isOwner) {
      toast.error('Apenas o proprietário do contrato pode realizar esta operação');
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
