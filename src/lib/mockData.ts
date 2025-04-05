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
  location?: string;
  area?: number;
  propertyType?: string;
  yearBuilt?: number;
}

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Apartamento Jardins",
    symbol: "APJD",
    totalSupply: 1,
    fractionPrice: 125.50,
    imageUrl: "https://via.placeholder.com/300/3a86ff/ffffff?text=Apt+SP",
    description: "Apartamento de luxo no bairro Jardins, São Paulo. Localização privilegiada com fácil acesso a restaurantes, shopping e transporte público.",
    marketCap: 3500000,
    volume24h: 45000,
    priceChange24h: 3.5,
    totalFractions: 1000,
    availableFractions: 350,
    holders: 450,
    location: "Jardins, São Paulo, SP",
    area: 120,
    propertyType: "Apartamento",
    yearBuilt: 2018
  },
  {
    id: "2",
    name: "Casa Barra da Tijuca",
    symbol: "CSBT",
    totalSupply: 1,
    fractionPrice: 212.75,
    imageUrl: "https://via.placeholder.com/300/8338ec/ffffff?text=Casa+RJ",
    description: "Casa de alto padrão em condomínio fechado na Barra da Tijuca, Rio de Janeiro. Área de lazer completa com piscina e churrasqueira.",
    marketCap: 7200000,
    volume24h: 87000,
    priceChange24h: -1.2,
    totalFractions: 1000,
    availableFractions: 120,
    holders: 840,
    location: "Barra da Tijuca, Rio de Janeiro, RJ",
    area: 350,
    propertyType: "Casa",
    yearBuilt: 2015
  },
  {
    id: "3",
    name: "Flat Comercial Paulista",
    symbol: "FCPL",
    totalSupply: 1,
    fractionPrice: 89.25,
    imageUrl: "https://via.placeholder.com/300/ff006e/ffffff?text=Flat+SP",
    description: "Flat comercial na Av. Paulista, com serviços de hotelaria e ótima rentabilidade para investidores. Mobiliado e pronto para locação.",
    marketCap: 2800000,
    volume24h: 65000,
    priceChange24h: 5.8,
    totalFractions: 1000,
    availableFractions: 280,
    holders: 620,
    location: "Av. Paulista, São Paulo, SP",
    area: 45,
    propertyType: "Flat",
    yearBuilt: 2010
  },
  {
    id: "4",
    name: "Loja Centro Histórico",
    symbol: "LCHS",
    totalSupply: 1,
    fractionPrice: 75.50,
    imageUrl: "https://via.placeholder.com/300/fb5607/ffffff?text=Loja+MG",
    description: "Loja comercial no centro histórico de Belo Horizonte. Excelente fluxo de pessoas e visibilidade para seu negócio.",
    marketCap: 1500000,
    volume24h: 120000,
    priceChange24h: 12.3,
    totalFractions: 500,
    availableFractions: 175,
    holders: 125,
    location: "Centro, Belo Horizonte, MG",
    area: 80,
    propertyType: "Comercial",
    yearBuilt: 1985
  },
  {
    id: "5",
    name: "Galpão Logístico Guarulhos",
    symbol: "GLGU",
    totalSupply: 1,
    fractionPrice: 165.25,
    imageUrl: "https://via.placeholder.com/300/ffbe0b/000000?text=Galpao+SP",
    description: "Galpão logístico de alto padrão em Guarulhos, próximo ao aeroporto internacional. Ideal para empresas de logística e e-commerce.",
    marketCap: 12000000,
    volume24h: 3500000,
    priceChange24h: -2.7,
    totalFractions: 2000,
    availableFractions: 560,
    holders: 870,
    location: "Guarulhos, São Paulo, SP",
    area: 5000,
    propertyType: "Industrial",
    yearBuilt: 2020
  },
  {
    id: "6",
    name: "Terreno Litoral Norte",
    symbol: "TLNP",
    totalSupply: 1,
    fractionPrice: 95.75,
    imageUrl: "https://via.placeholder.com/300/8ac926/ffffff?text=Terreno+SP",
    description: "Terreno em área de expansão no litoral norte de São Paulo. Ótima oportunidade para desenvolvimento residencial ou empreendimento turístico.",
    marketCap: 3500000,
    volume24h: 420000,
    priceChange24h: 1.5,
    totalFractions: 800,
    availableFractions: 420,
    holders: 280,
    location: "Ubatuba, São Paulo, SP",
    area: 1200,
    propertyType: "Terreno",
    yearBuilt: null
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
  totalMarketCap: 31500000,
  totalVolume24h: 5237000,
  totalTokens: 42,
  totalHolders: 3185,
  averageReturn30d: 6.3
};
