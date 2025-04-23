
// Re-export the Token interface and mock data from their respective files
export type { Token } from './interfaces/TokenInterface';
export { mockTokens } from './mockData/mockTokens';
export { wholePropertyTokens } from './mockData/wholePropertyTokens';
export { urbanTokens } from './mockData/urbanTokens';
export { ruralTokens } from './mockData/ruralTokens';

// Add the K tokens for Instituto K
export const kTokens = [
  {
    id: "k1",
    name: "Instituto K Professor Ulisses Vieira",
    symbol: "K1",
    totalSupply: 1,
    fractionPrice: 100,
    imageUrl: "/lovable-uploads/3d927806-fff9-4cf1-8af0-3b7e05c7afae.png",
    description: "Token K1 representando participação no Instituto K de Desenvolvimento Econômico",
    marketCap: 1000000,
    volume24h: 50000,
    priceChange24h: 2.3,
    totalFractions: 1000,
    availableFractions: 1000,
    holders: 0,
    location: "São Paulo, SP",
    area: 450,
    propertyType: "Institucional",
    yearBuilt: 2023,
    isWholeProperty: false
  },
  {
    id: "k2",
    name: "Instituto K de Desenvolvimento Econômico",
    symbol: "K2",
    totalSupply: 1,
    fractionPrice: 150,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    description: "Token K2 representando participação no Instituto K de Desenvolvimento Econômico",
    marketCap: 1500000,
    volume24h: 75000,
    priceChange24h: 1.8,
    totalFractions: 1000,
    availableFractions: 850,
    holders: 15,
    location: "Rio de Janeiro, RJ",
    area: 580,
    propertyType: "Institucional",
    yearBuilt: 2022,
    isWholeProperty: false
  }
];
