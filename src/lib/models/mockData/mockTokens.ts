
import { Token } from "@/lib/models";

export const mockTokens: Token[] = [
  {
    id: "k1",
    name: "Ulisses Vieira",
    symbol: "K1",
    fractionPrice: 1000, // Set to minimum required price
    totalFractions: 1,
    availableFractions: 1,
    marketCap: 1550000,
    volume24h: 10000,
    priceChange24h: 2.5,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k1.jpg",
    description: "Imóvel institucional localizado em Vila Izabel, Curitiba, com área total de 450m²",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "Vila Izabel, Curitiba, PR",
    propertyType: "Institucional",
    holders: 0,
    isWholeProperty: true,
    area: 450,
    wholePropertyPrice: 1550000,
    ownerAddress: "0x0e0584250443BcaB55021975c4F428B794989DB9"
  },
  {
    id: "k2",
    name: "Parintins",
    symbol: "K2",
    fractionPrice: 1000, // Set to minimum required price
    totalFractions: 1,
    availableFractions: 1,
    marketCap: 1300000,
    volume24h: 8500,
    priceChange24h: 1.7,
    imageUrl: "https://raw.githubusercontent.com/SashaStadler666/token/main/images/k2.jpg",
    description: "Imóvel institucional localizado em Vila Izabel, Curitiba, com área total de 580m²",
    totalSupply: 1,
    yearBuilt: 2023,
    location: "Vila Izabel, Curitiba, PR",
    propertyType: "Institucional",
    holders: 0,
    isWholeProperty: true,
    area: 580,
    wholePropertyPrice: 1300000,
    ownerAddress: "0x0e0584250443BcaB55021975c4F428B794989DB9"
  }
];
