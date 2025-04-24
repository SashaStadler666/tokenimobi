
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

    // Obter o preço do token do contrato
    let priceWei;
    try {
      // Primeiro tenta com 'tokenPrice' (nome correto no novo contrato)
      priceWei = await contract.methods.tokenPrice(tokenId).call();
    } catch (err) {
      try {
        // Se falhar, tenta com 'tokenPrices' (para compatibilidade com versões antigas)
        priceWei = await contract.methods.tokenPrices(tokenId).call();
      } catch (secondErr) {
        console.error('Erro ao obter o preço do token:', secondErr);
        toast.error("Não foi possível obter o preço do token");
        return false;
      }
    }

    console.log(`Comprando token ${tokenId} por ${priceWei} wei usando a carteira ${walletAddress}`);
    
    // Verificar saldo da carteira
    const balance = await web3.eth.getBalance(walletAddress);
    console.log(`Saldo da carteira: ${balance} wei`);
    
    if (Number(balance) < Number(priceWei)) {
      toast.error(`Saldo insuficiente para comprar o token. Necessário: ${web3.utils.fromWei(priceWei, 'ether')} ETH`);
      return false;
    }
    
    // Enviar a transação de compra
    const receipt = await contract.methods.buyToken(tokenId).send({
      from: walletAddress,
      value: priceWei,
      gas: 300000 // Fornecer limite de gas explícito para evitar estimativas que possam falhar
    });

    console.log('Transação concluída:', receipt);
    toast.success(`Token #${tokenId} comprado com sucesso!`);
    return true;
  } catch (err: any) {
    console.error('Erro ao comprar token:', err);
    let errorMessage = err.message || "Erro ao comprar token";
    
    // Verificar se é um erro de rejeição pelo usuário
    if (errorMessage.includes("User denied") || errorMessage.includes("rejected")) {
      toast.error("Transação rejeitada pelo usuário");
    } else if (errorMessage.includes("insufficient funds")) {
      toast.error("Saldo insuficiente para concluir a transação");
    } else {
      toast.error(errorMessage.substring(0, 100)); // Limitar o tamanho da mensagem
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
