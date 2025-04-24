
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
    fractionPrice: 0.01,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1550000,
    volume24h: 10000,
    priceChange24h: 2.5,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k1.jpg",
    description: "Imóvel institucional localizado em São Paulo, com área total de 450m².\nPosse original: 0x0e0584250443BcaB55021975c4F428B794989DB9",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "São Paulo, SP",
    propertyType: "Institucional",
    holders: 1,
    isWholeProperty: false,
    area: 450,
    wholePropertyPrice: 1550000,
    ownerAddress: "0x0e0584250443BcaB55021975c4F428B794989DB9"
  },
  {
    id: "k2",
    name: "Instituto K Parintins",
    symbol: "K2",
    fractionPrice: 0.015,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1300000,
    volume24h: 8500,
    priceChange24h: 1.7,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k2.jpg",
    description: "Imóvel institucional localizado em São Paulo, com área total de 580m².\nPosse original: 0x0e0584250443BcaB55021975c4F428B794989DB9",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "São Paulo, SP",
    propertyType: "Institucional",
    holders: 1,
    isWholeProperty: false,
    area: 580,
    wholePropertyPrice: 1300000,
    ownerAddress: "0x0e0584250443BcaB55021975c4F428B794989DB9"
  }
];

