
export interface Token {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  fractionPrice: number;
  imageUrl: string;
  description: string;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  totalFractions: number;
  availableFractions: number;
  holders: number;
}

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Blue Chip NFT #1",
    symbol: "BCNFT1",
    totalSupply: 1,
    fractionPrice: 0.05,
    imageUrl: "https://via.placeholder.com/300/3a86ff/ffffff?text=BCNFT1",
    description: "A highly sought-after blue chip NFT, fractionalized for wider accessibility.",
    marketCap: 500000,
    volume24h: 45000,
    priceChange24h: 3.5,
    totalFractions: 10000,
    availableFractions: 3500,
    holders: 450
  },
  {
    id: "2",
    name: "Digital Art Collective",
    symbol: "DAC",
    totalSupply: 1,
    fractionPrice: 0.12,
    imageUrl: "https://via.placeholder.com/300/8338ec/ffffff?text=DAC",
    description: "A collection of premium digital art pieces bundled together as a single fractionalized token.",
    marketCap: 1200000,
    volume24h: 87000,
    priceChange24h: -1.2,
    totalFractions: 10000,
    availableFractions: 1200,
    holders: 840
  },
  {
    id: "3",
    name: "Virtual Land Parcel",
    symbol: "LAND",
    totalSupply: 1,
    fractionPrice: 0.08,
    imageUrl: "https://via.placeholder.com/300/ff006e/ffffff?text=LAND",
    description: "Prime virtual real estate in a popular metaverse, fractionalized for shared ownership.",
    marketCap: 800000,
    volume24h: 65000,
    priceChange24h: 5.8,
    totalFractions: 10000,
    availableFractions: 2800,
    holders: 620
  },
  {
    id: "4",
    name: "Gaming Guild Token",
    symbol: "GGT",
    totalSupply: 1000000,
    fractionPrice: 0.015,
    imageUrl: "https://via.placeholder.com/300/fb5607/ffffff?text=GGT",
    description: "Governance token for a major gaming guild, allowing fractional ownership and voting rights.",
    marketCap: 15000000,
    volume24h: 1200000,
    priceChange24h: 12.3,
    totalFractions: 1000000,
    availableFractions: 350000,
    holders: 12500
  },
  {
    id: "5",
    name: "DeFi Protocol Share",
    symbol: "DPS",
    totalSupply: 100000,
    fractionPrice: 0.21,
    imageUrl: "https://via.placeholder.com/300/ffbe0b/000000?text=DPS",
    description: "Fractionalized ownership of a leading DeFi protocol, including revenue sharing.",
    marketCap: 21000000,
    volume24h: 3500000,
    priceChange24h: -2.7,
    totalFractions: 100000,
    availableFractions: 28000,
    holders: 8700
  },
  {
    id: "6",
    name: "Premium Domain Name",
    symbol: "PDN",
    totalSupply: 1,
    fractionPrice: 0.35,
    imageUrl: "https://via.placeholder.com/300/8ac926/ffffff?text=PDN",
    description: "Fractionalized ownership of a premium web3 domain name with revenue sharing from leasing.",
    marketCap: 3500000,
    volume24h: 420000,
    priceChange24h: 1.5,
    totalFractions: 10000,
    availableFractions: 4200,
    holders: 780
  }
];

export interface Transaction {
  id: string;
  tokenId: string;
  type: 'buy' | 'sell';
  fractions: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  address: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    tokenId: "1",
    type: 'buy',
    fractions: 50,
    price: 0.05,
    total: 2.5,
    timestamp: new Date(Date.now() - 86400000 * 2),
    status: 'completed',
    txHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    address: '0xaBcD...1234'
  },
  {
    id: "tx2",
    tokenId: "3",
    type: 'sell',
    fractions: 25,
    price: 0.08,
    total: 2,
    timestamp: new Date(Date.now() - 86400000 * 1),
    status: 'completed',
    txHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u',
    address: '0xaBcD...1234'
  },
  {
    id: "tx3",
    tokenId: "2",
    type: 'buy',
    fractions: 100,
    price: 0.12,
    total: 12,
    timestamp: new Date(Date.now() - 3600000 * 5),
    status: 'pending',
    txHash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v',
    address: '0xaBcD...1234'
  }
];

export const marketStats = {
  totalMarketCap: 42000000,
  totalVolume24h: 5812000,
  totalTokens: 125,
  totalHolders: 24700,
  averageReturn30d: 7.8
};
