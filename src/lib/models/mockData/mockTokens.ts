
import { Token } from "@/lib/models";

export const mockTokens: Token[] = [
  {
    id: "k1",
    name: "Ulisses Vieira",
    symbol: "K1",
    fractionPrice: 0.01,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1550000,
    volume24h: 10000,
    priceChange24h: 2.5,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k1.jpg",
    description: "Imóvel institucional localizado em São Paulo, com área total de 450m²",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "São Paulo, SP",
    propertyType: "Institucional",
    holders: 0,
    isWholeProperty: false,
    area: 450,
    wholePropertyPrice: 1550000
  },
  {
    id: "k2",
    name: "Parintins",
    symbol: "K2",
    fractionPrice: 0.015,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1300000,
    volume24h: 8500,
    priceChange24h: 1.7,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k2.jpg",
    description: "Imóvel institucional localizado em São Paulo, com área total de 580m²",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "São Paulo, SP",
    propertyType: "Institucional",
    holders: 0,
    isWholeProperty: false,
    area: 580,
    wholePropertyPrice: 1300000
  }
];
