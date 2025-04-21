
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { mockTokens, Token, mockTransactions } from "@/lib/models";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import PortfolioSummaryCards from "@/components/portfolio/PortfolioSummaryCards";
import PortfolioCharts from "@/components/portfolio/PortfolioCharts";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import ConnectWalletCard from "@/components/portfolio/ConnectWalletCard";
import { Button } from "@/components/ui/button";
import { useWalletConnection } from "@/hooks/useWalletConnection";

const Portfolio = () => {
  const navigate = useNavigate();
  const { isConnected } = useWalletConnection();
  const [userTokens, setUserTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  
  useEffect(() => {
    if (isConnected) {
      // Determine user tokens based on transaction history
      const userTokenIds = new Set<string>();
      
      mockTransactions.forEach(tx => {
        if (tx.type === 'buy') {
          userTokenIds.add(tx.tokenId);
        }
      });
      
      // Calculate owned fractions per token
      const ownedTokens = Array.from(userTokenIds).map(tokenId => {
        const token = mockTokens.find(t => t.id === tokenId);
        if (!token) return null;
        
        // Calculate how many fractions user owns
        const fractions = mockTransactions
          .filter(tx => tx.tokenId === tokenId)
          .reduce((total, tx) => {
            if (tx.type === 'buy') return total + tx.fractions;
            if (tx.type === 'sell') return total - tx.fractions;
            return total;
          }, 0);
        
        // Only include tokens where user still owns fractions
        return fractions > 0 ? token : null;
      }).filter(Boolean) as Token[];
      
      setUserTokens(ownedTokens);
      
      // Calculate total value and growth
      const value = ownedTokens.reduce((sum, token) => 
        sum + (token.fractionPrice * token.totalFractions), 0);
      
      setTotalValue(value);
      
      const growth = ownedTokens.length > 0 
        ? ownedTokens.reduce((sum, token) => sum + token.priceChange24h, 0) / ownedTokens.length
        : 0;
      
      setTotalGrowth(growth);
    } else {
      setUserTokens([]);
      setTotalValue(0);
      setTotalGrowth(0);
    }
  }, [isConnected, mockTransactions]);
  
  const handleExploreTokens = () => {
    navigate('/tokens');
  };

  const EmptyPortfolio = () => (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">Seu portfólio está vazio</h3>
      <p className="text-muted-foreground mb-6">
        Você ainda não possui tokens em seu portfólio. 
        Comece explorando nossos tokens disponíveis.
      </p>
      <Button onClick={handleExploreTokens} className="button-glow">
        Explorar Tokens Disponíveis
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen p-4 pt-20 bg-gradient-to-b from-background to-secondary/5">
      <Navbar />
      
      <div className="container mx-auto mt-8">
        <PortfolioHeader />
        
        {isConnected ? (
          userTokens.length > 0 ? (
            <>
              <PortfolioSummaryCards 
                totalValue={totalValue}
                totalGrowth={totalGrowth}
                tokenCount={userTokens.length}
              />
              
              <PortfolioCharts tokens={userTokens} />
              
              <PortfolioTabs 
                userTokens={userTokens}
                transactions={mockTransactions}
              />
            </>
          ) : (
            <EmptyPortfolio />
          )
        ) : (
          <ConnectWalletCard />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
