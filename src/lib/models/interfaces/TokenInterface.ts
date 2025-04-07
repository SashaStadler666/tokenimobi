
export interface Token {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  fractionPrice: number;
  wholePropertyPrice?: number;
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
  isWholeProperty?: boolean;
}
