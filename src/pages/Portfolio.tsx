
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { mockTokens, Token, mockTransactions } from "@/lib/models";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import PortfolioSummaryCards from "@/components/portfolio/PortfolioSummaryCards";
import PortfolioCharts from "@/components/portfolio/PortfolioCharts";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import ConnectWalletCard from "@/components/portfolio/ConnectWalletCard";

const Portfolio = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock portfolio data
  const [userTokens, setUserTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  
  useEffect(() => {
    // Check if wallet is connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    setIsConnected(walletConnected);
    
    if (!walletConnected) {
      // If not connected, we'll still show the page but with a prompt to connect
    } else {
      // In a real app, we would fetch the user's tokens from the API
      // For now, we'll use mock data - assume the user owns these tokens
      const mockUserTokens = mockTokens.slice(0, 3);
      setUserTokens(mockUserTokens);
      
      // Calculate total portfolio value and growth
      const value = mockUserTokens.reduce((total, token) => {
        return total + (token.fractionPrice * 50); // Assume 50 fractions of each token
      }, 0);
      
      setTotalValue(value);
      setTotalGrowth(2.8); // Mock growth percentage
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <PortfolioHeader />
        
        {isConnected ? (
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
          <ConnectWalletCard />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
