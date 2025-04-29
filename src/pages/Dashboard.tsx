
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { mockTransactions } from "@/lib/models";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { calculatePortfolioData, generatePerformanceData } from "@/utils/portfolioUtils";
import DashboardStatsCards from "@/components/dashboard/DashboardStatsCards";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import PortfolioAssetsList from "@/components/dashboard/PortfolioAssetsList";

const Dashboard = () => {
  const { isConnected } = useWalletConnection();
  const [portfolioData, setPortfolioData] = useState({
    totalInvestment: 0,
    tokenCount: 0,
    urbanCount: 0,
    ruralCount: 0,
    monthlyIncome: 0,
    ownedTokens: []
  });
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    if (isConnected) {
      const data = calculatePortfolioData(mockTransactions);
      setPortfolioData(data);
      
      // Generate performance data based on total investment
      const chartData = generatePerformanceData(
        data.totalInvestment > 0 ? data.totalInvestment : 1000
      );
      setPerformanceData(chartData);
    }
  }, [isConnected, mockTransactions]);

  return (
    <div className="min-h-screen p-4 pt-20 bg-gradient-to-b from-background to-secondary/5">
      <PageHeader 
        title="Dashboard" 
        description="Bem-vindo ao seu painel de controle da Token Imobi."
      />
      
      <div className="container mx-auto mt-8">
        <DashboardStatsCards
          totalInvestment={portfolioData.totalInvestment}
          tokenCount={portfolioData.tokenCount}
          ruralCount={portfolioData.ruralCount}
          urbanCount={portfolioData.urbanCount}
          monthlyIncome={portfolioData.monthlyIncome}
          isConnected={isConnected}
        />

        <PerformanceChart performanceData={performanceData} />

        <PortfolioAssetsList
          urbanCount={portfolioData.urbanCount}
          ruralCount={portfolioData.ruralCount}
          ownedTokens={portfolioData.ownedTokens}
        />
      </div>
    </div>
  );
};

export default Dashboard;
