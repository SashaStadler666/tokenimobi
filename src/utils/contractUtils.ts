
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
  console.log('Inicializando Web3...');
  
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = window.ethereum as any;
      const web3 = new Web3(provider);
      
      console.log('Web3 inicializado com sucesso');
      return web3;
    } catch (error) {
      console.error('Erro ao inicializar Web3:', error);
      throw new Error('Erro ao conectar ao MetaMask');
    }
  }
  
  console.error('MetaMask não detectado');
  throw new Error('MetaMask não está instalada');
};

export const getContract = async () => {
  const web3 = await initWeb3();
  return new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);
};

export const buyToken = async (tokenId: number, walletAddress: string): Promise<boolean> => {
  console.log(`[buyToken] Iniciando compra - Token: ${tokenId}, Carteira: ${walletAddress}`);
  
  try {
    // Verificar se o MetaMask está conectado
    if (!window.ethereum) {
      console.error('MetaMask não encontrado');
      toast.error("MetaMask não está instalado");
      return false;
    }

    const web3 = await initWeb3();
    const contract = await getContract();

    console.log(`[buyToken] Contrato carregado: ${CONTRACT_ADDRESS}`);

    // Verificar se a conta está conectada
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) {
      console.error('Nenhuma conta conectada');
      toast.error("Nenhuma conta conectada ao MetaMask");
      return false;
    }

    const connectedAccount = accounts[0].toLowerCase();
    const expectedAccount = walletAddress.toLowerCase();
    
    if (connectedAccount !== expectedAccount) {
      console.warn(`Conta conectada (${connectedAccount}) diferente da esperada (${expectedAccount})`);
      toast.warning("Verifique se a conta correta está selecionada no MetaMask");
    }

    // Obter o preço do token
    let priceWei;
    try {
      priceWei = await contract.methods.tokenPrice(tokenId).call();
      console.log(`[buyToken] Preço do token em Wei: ${priceWei}`);
      
      if (!priceWei || priceWei === '0') {
        console.error('Preço do token inválido');
        toast.error("Token não disponível para compra");
        return false;
      }
    } catch (err) {
      console.error('Erro ao obter preço do token:', err);
      toast.error("Não foi possível obter informações do token");
      return false;
    }

    // Verificar saldo da carteira
    const balance = await web3.eth.getBalance(walletAddress);
    console.log(`[buyToken] Saldo da carteira: ${balance} Wei (${web3.utils.fromWei(balance, 'ether')} ETH)`);
    
    if (Number(balance) < Number(priceWei)) {
      const requiredEth = web3.utils.fromWei(priceWei, 'ether');
      const currentEth = web3.utils.fromWei(balance, 'ether');
      console.error(`Saldo insuficiente. Necessário: ${requiredEth} ETH, Disponível: ${currentEth} ETH`);
      toast.error(`Saldo insuficiente. Necessário: ${requiredEth} ETH`);
      return false;
    }

    console.log(`[buyToken] Enviando transação...`);
    
    // Mostrar toast de carregamento
    toast.loading("Processando transação...", {
      description: "Confirme a transação no MetaMask"
    });

    // Enviar transação de compra
    const receipt = await contract.methods.buyToken(tokenId).send({
      from: walletAddress,
      value: priceWei,
      gas: 300000
    });

    console.log('[buyToken] Transação concluída:', receipt);
    
    // Remover toast de carregamento
    toast.dismiss();
    
    if (receipt && receipt.status) {
      toast.success(`Token #${tokenId} comprado com sucesso!`);
      return true;
    } else {
      console.error('Transação falhou:', receipt);
      toast.error("Transação falhou");
      return false;
    }
    
  } catch (err: any) {
    console.error('[buyToken] Erro na compra:', err);
    
    // Remover toast de carregamento se estiver ativo
    toast.dismiss();
    
    if (err.code === 4001 || err.message?.includes("User denied")) {
      toast.error("Transação cancelada pelo usuário");
    } else if (err.code === -32603 || err.message?.includes("insufficient funds")) {
      toast.error("Saldo insuficiente para completar a transação");
    } else if (err.message?.includes("execution reverted")) {
      toast.error("Transação rejeitada pelo contrato");
    } else {
      const errorMsg = err.message?.substring(0, 100) || "Erro desconhecido";
      toast.error(`Erro na transação: ${errorMsg}`);
    }
    
    return false;
  }
};

export const getConnectedWallet = async (): Promise<string | null> => {
  try {
    if (!window.ethereum) return null;
    
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts && accounts.length > 0) {
      console.log('Carteira conectada:', accounts[0]);
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
    
    console.log('Solicitando conexão da carteira...');
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    
    if (accounts && accounts.length > 0) {
      console.log('Carteira conectada com sucesso:', accounts[0]);
      return accounts[0];
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao conectar carteira:', error);
    toast.error(error.message || "Erro ao conectar carteira");
    return null;
  }
};
