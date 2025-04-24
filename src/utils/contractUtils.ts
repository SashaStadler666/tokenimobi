
import Web3 from 'web3';
import { toast } from 'sonner';

const CONTRACT_ADDRESS = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';

const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "buyToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenPrices",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const initWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = window.ethereum as any;
    const web3 = new Web3(provider);
    return web3;
  }
  throw new Error('MetaMask não está instalada');
};

export const getContract = async () => {
  const web3 = await initWeb3();
  return new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);
};

export const buyToken = async (tokenId: number, walletAddress: string): Promise<boolean> => {
  try {
    const web3 = await initWeb3();
    const contract = await getContract();

    const priceWei = await contract.methods.tokenPrices(tokenId).call();
    
    await contract.methods.buyToken(tokenId).send({
      from: walletAddress,
      value: priceWei
    });

    toast.success(`Token #${tokenId} comprado com sucesso!`);
    return true;
  } catch (err: any) {
    console.error('Erro ao comprar token:', err);
    toast.error(err.message || "Erro ao comprar token");
    return false;
  }
};

export const getConnectedWallet = async (): Promise<string | null> => {
  try {
    if (!window.ethereum) return null;
    
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    return null;
  } catch (error) {
    console.error('Erro ao verificar carteira:', error);
    return null;
  }
};
