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
    "name": "tokenPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const initWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = window.ethereum as any;
      const web3 = new Web3(provider);
      return web3;
    } catch (error) {
      console.error('Erro ao inicializar Web3:', error);
      throw new Error('Erro ao conectar ao MetaMask');
    }
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

    console.log(`Iniciando compra do token ${tokenId} usando carteira ${walletAddress}`);

    // Obter o preço do token
    let priceWei;
    try {
      priceWei = await contract.methods.tokenPrice(tokenId).call();
      console.log(`Preço do token em Wei: ${priceWei}`);
    } catch (err) {
      console.error('Erro ao obter preço do token:', err);
      toast.error("Não foi possível obter o preço do token");
      return false;
    }

    // Verificar saldo da carteira
    const balance = await web3.eth.getBalance(walletAddress);
    console.log(`Saldo da carteira em Wei: ${balance}`);
    
    if (Number(balance) < Number(priceWei)) {
      toast.error(`Saldo insuficiente. Necessário: ${web3.utils.fromWei(priceWei, 'ether')} ETH`);
      return false;
    }

    // Enviar transação de compra
    const receipt = await contract.methods.buyToken(tokenId).send({
      from: walletAddress,
      value: priceWei,
      gas: 300000
    });

    console.log('Transação concluída:', receipt);
    toast.success(`Token #${tokenId} comprado com sucesso!`);
    return true;
  } catch (err: any) {
    console.error('Erro na compra do token:', err);
    
    if (err.message.includes("User denied")) {
      toast.error("Transação rejeitada pelo usuário");
    } else if (err.message.includes("insufficient funds")) {
      toast.error("Saldo insuficiente para completar a transação");
    } else {
      toast.error(err.message.substring(0, 100));
    }
    
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

export const connectWallet = async (): Promise<string | null> => {
  try {
    if (!window.ethereum) {
      toast.error("MetaMask não está instalada");
      return null;
    }
    
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao conectar carteira:', error);
    toast.error(error.message || "Erro ao conectar carteira");
    return null;
  }
};
