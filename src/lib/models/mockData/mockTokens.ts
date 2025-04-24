import { Token } from "@/lib/models";

const kTokens: Token[] = [
  {
    id: "1",
    name: "Ulisses Vieira",
    symbol: "K1",
    fractionPrice: 0.01,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1550000,
    volume24h: 10000,
    priceChange24h: 2.5,
    imageUrl: "https://link-da-imagem.com",
  },
  {
    id: "2",
    name: "Parintins",
    symbol: "K2",
    fractionPrice: 0.015,
    totalFractions: 1000,
    availableFractions: 1000,
    marketCap: 1300000,
    volume24h: 8500,
    priceChange24h: 1.7,
    imageUrl: "https://link-da-imagem.com",
  },
];

export const mockTokens = [...kTokens];
