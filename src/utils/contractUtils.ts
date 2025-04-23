import Web3 from "web3";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "buyToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "sellToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "tokenPrices",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const initWeb3 = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = window.ethereum as any;
    const web3 = new Web3(provider);
    return web3;
  } else {
    toast.error("MetaMask não encontrada");
    throw new Error("MetaMask não encontrada");
  }
};

export const getContract = async () => {
  const web3 = await initWeb3();
  return new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);
};

export const buyToken = async (tokenId: number, walletAddress: string): Promise<boolean> => {
  try {
    const web3 = await initWeb3();
    const contract = await getContract();

    const priceInWei = await contract.methods.tokenPrices(tokenId).call();

    await contract.methods.buyToken(tokenId).send({
      from: walletAddress,
      value: priceInWei,
    });

    toast.success("Token comprado com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao comprar token:", error);
    toast.error(error.message || "Erro ao comprar token");
    return false;
  }
};

export const sellToken = async (tokenId: number, walletAddress: string): Promise<boolean> => {
  try {
    const contract = await getContract();

    await contract.methods.sellToken(tokenId).send({
      from: walletAddress,
    });

    toast.success("Token vendido com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao vender token:", error);
    toast.error(error.message || "Erro ao vender token");
    return false;
  }
};
