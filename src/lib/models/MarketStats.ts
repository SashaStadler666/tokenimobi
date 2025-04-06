
export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  totalTokens: number;
  totalHolders: number;
  averageReturn30d: number;
}

export const marketStats: MarketStats = {
  totalMarketCap: 31500000,
  totalVolume24h: 5237000,
  totalTokens: 42,
  totalHolders: 3185,
  averageReturn30d: 6.3
};
