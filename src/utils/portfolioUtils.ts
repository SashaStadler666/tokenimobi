
import { Token, Transaction, mockTokens } from "@/lib/models";

interface PortfolioData {
  totalInvestment: number;
  tokenCount: number;
  urbanCount: number;
  ruralCount: number;
  monthlyIncome: number;
  ownedTokens: Array<{
    token: Token;
    fractions: number;
  } | null>;
}

// Calculate user portfolio data from transactions
export const calculatePortfolioData = (transactions: Transaction[]): PortfolioData => {
  // Get user token holdings
  const userTokenIds = new Set<string>();
  
  transactions.forEach(tx => {
    if (tx.type === 'buy') {
      userTokenIds.add(tx.tokenId);
    }
  });
  
  // Calculate owned fractions per token
  const ownedTokens = Array.from(userTokenIds).map(tokenId => {
    const token = mockTokens.find(t => t.id === tokenId);
    if (!token) return null;
    
    // Calculate how many fractions user owns
    const fractions = transactions
      .filter(tx => tx.tokenId === tokenId)
      .reduce((total, tx) => {
        if (tx.type === 'buy') return total + tx.fractions;
        if (tx.type === 'sell') return total - tx.fractions;
        return total;
      }, 0);
    
    // Only return tokens where user still owns fractions
    return fractions > 0 ? { token, fractions } : null;
  }).filter(Boolean);

  // Calculate total investment
  const totalInvestment = ownedTokens.reduce((sum, item) => {
    if (!item) return sum;
    return sum + (item.token.fractionPrice * item.fractions);
  }, 0);

  // Count token types
  const urbanCount = ownedTokens.filter(item => 
    item && (item.token.propertyType === "Apartamento" || 
    item.token.propertyType === "Casa" || 
    item.token.propertyType === "Flat" ||
    item.token.propertyType === "Comercial")
  ).length;

  const ruralCount = ownedTokens.filter(item => 
    item && (item.token.propertyType === "Terreno" || 
    item.token.propertyType === "Fazenda" ||
    item.token.propertyType === "Rural")
  ).length;

  // Calculate monthly income (simplified)
  const monthlyIncome = ownedTokens.reduce((sum, item) => {
    if (!item) return sum;
    // Assume 0.5% monthly return on average
    return sum + (item.token.fractionPrice * item.fractions * 0.005);
  }, 0);

  return {
    totalInvestment,
    tokenCount: ownedTokens.length,
    urbanCount,
    ruralCount,
    monthlyIncome,
    ownedTokens
  };
};

// Mock data for charts
export const generatePerformanceData = (initial = 1000, months = 7) => {
  const data = [];
  let currentValue = initial;
  
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const currentMonth = new Date().getMonth();
  
  for (let i = 0; i < months; i++) {
    let adjustedMonthIndex = (currentMonth - (months - 1) + i) % 12;
    if (adjustedMonthIndex < 0) {
      adjustedMonthIndex += 12;
    }
    
    const month = monthNames[adjustedMonthIndex];
    
    // Random growth between -3% and +8%
    const changePercent = -3 + Math.random() * 11;
    currentValue = currentValue * (1 + changePercent / 100);
    
    data.push({
      month,
      value: Math.round(currentValue)
    });
  }
  
  return data;
};
