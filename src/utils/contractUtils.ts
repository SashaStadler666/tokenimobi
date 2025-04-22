import Web3 from 'web3';
import { toast } from "sonner";

const CONTRACT_ADDRESS = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';

const CONTRACT_ABI = [
  {
    "inputs": [{"name": "to", "type": "address"}],
    "name": "mintK1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "to", "type": "address"}],
    "name": "mintK2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "buyToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "sellToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "getTokenDescription",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const initWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum as any);
    return web3;
  }
  throw new Error('MetaMask não está instalada');
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
    await contract.methods[method](walletAddress).send({ from: walletAddress });
    toast.success(`Token ${type} mintado com sucesso!`);
    return true;
  } catch (error: any) {
    toast.error(error.message || 'Erro ao mintar token');
    return false;
  }
};

export const buyToken = async (tokenId: number, from: string, valueInEther: number): Promise<boolean> => {
  try {
    const contract = await getContract();
    const valueInWei = Web3.utils.toWei(valueInEther.toString(), "ether");

    await contract.methods.buyToken(tokenId).send({
      from,
      value: valueInWei
    });

    toast.success("Compra realizada com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao comprar token:", error);
    toast.error(error.message || "Erro ao comprar token");
    return false;
  }
};

export const sellToken = async (tokenId: number, from: string): Promise<boolean> => {
  try {
    const contract = await getContract();
    await contract.methods.sellToken(tokenId).send({ from });
    toast.success("Token vendido com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao vender token:", error);
    toast.error(error.message || "Erro ao vender token");
    return false;
  }
};
