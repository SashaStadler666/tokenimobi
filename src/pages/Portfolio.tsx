import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import PortfolioSummaryCards from "@/components/portfolio/PortfolioSummaryCards";
import PortfolioCharts from "@/components/portfolio/PortfolioCharts";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import ConnectWalletCard from "@/components/portfolio/ConnectWalletCard";
import { Button } from "@/components/ui/button";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import Web3 from "web3";
import TokenK_ABI from "@/lib/TokenK_ABI.json";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";

const Portfolio = () => {
  const navigate = useNavigate();
  const { isConnected, walletAddress } = useWalletConnection();
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);

  useEffect(() => {
    const loadUserTokens = async () => {
      try {
        const web3 = new Web3(window.ethereum as any);
        const contract = new web3.eth.Contract(TokenK_ABI as any, CONTRACT_ADDRESS);

        const tokens = [];
        for (let tokenId = 1; tokenId <= 2; tokenId++) {
          const owner = await contract.methods.ownerOf(tokenId).call();
          if (owner.toLowerCase() === walletAddress.toLowerCase()) {
            const desc = await contract.methods.getTokenDescription(tokenId).call();
            tokens.push({ id: tokenId, description: desc });
          }
        }
        setUserTokens(tokens);
        setTotalValue(tokens.length); 
        setTotalGrowth(0); 
      } catch (err) {
        toast.error("Erro ao carregar tokens: " + err);
        console.error(err);
      }
    };

    if (isConnected && walletAddress) {
      loadUserTokens();
    } else {
      setUserTokens([]);
      setTotalValue(0);
      setTotalGrowth(0);
    }
  }, [isConnected, walletAddress]);

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
                transactions={[]} // Placeholder se não tiver integração de transações reais ainda
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
