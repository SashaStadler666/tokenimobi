
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
    <div className="min-h-screen p-4 pt-20">
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
