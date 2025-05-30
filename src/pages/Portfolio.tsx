
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
import { supabase } from "@/integrations/supabase/client";
import { Token, kTokens } from "@/lib/models";

const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";

const Portfolio = () => {
  const navigate = useNavigate();
  const { isConnected, walletAddress } = useWalletConnection();
  const [userTokens, setUserTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserTokens = async () => {
      if (!isConnected || !walletAddress) {
        setUserTokens([]);
        setTotalValue(0);
        setTotalGrowth(0);
        setTransactions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const web3 = new Web3(window.ethereum as any);
        const contract = new web3.eth.Contract(TokenK_ABI as any, CONTRACT_ADDRESS);

        let supabaseData: any[] = [];
        try {
          const { data, error } = await supabase
            .from('K Instituto de Desenvolvimento Econômico')
            .select('*')
            .eq('wallet', walletAddress.toLowerCase());

          if (error) {
            console.error('Erro ao buscar do Supabase:', error);
            toast.error('Erro ao carregar tokens do Supabase');
          } else {
            supabaseData = data || [];
          }
        } catch (supabaseError) {
          console.error('Erro de conexão com Supabase:', supabaseError);
          // Continue without Supabase data
        }

        const ownedTokens: Token[] = [];
        const userTransactions: any[] = [];

        for (const token of kTokens) {
          try {
            const tokenId = parseInt(token.id.replace(/\D/g, ''), 10);
            if (isNaN(tokenId)) continue;
            
            try {
              const owner = await contract.methods.ownerOf(tokenId).call();
              console.log(`Token ${tokenId} owner:`, owner);
              
              if (owner.toLowerCase() === walletAddress.toLowerCase()) {
                console.log(`User owns token ${tokenId}`);
                ownedTokens.push(token);
                userTransactions.push({
                  id: `blockchain-${token.id}`,
                  tokenId: token.id,
                  type: 'buy',
                  fractions: 1,
                  total: token.fractionPrice,
                  timestamp: new Date()
                });
              }
            } catch (ownerError) {
              console.log(`Token ${tokenId} não encontrado no blockchain:`, ownerError);
            }
          } catch (err) {
            console.error(`Erro ao verificar token ${token.id}:`, err);
          }
        }

        if (supabaseData.length > 0) {
          for (const record of supabaseData) {
            const tokenIdValue = record.token_id;
            if (!tokenIdValue) continue;
            
            const tokenId = tokenIdValue.toString();
            const alreadyAdded = ownedTokens.some(t => t.id === `k${tokenId}`);
            if (!alreadyAdded) {
              const token = kTokens.find(t => t.id === `k${tokenId}`);
              if (token) {
                ownedTokens.push(token);
                userTransactions.push({
                  id: `supabase-${record.id}`,
                  tokenId: token.id,
                  type: 'buy',
                  fractions: 1,
                  total: token.fractionPrice,
                  timestamp: new Date(record.created_at)
                });
              }
            }
          }
        }

        setUserTokens(ownedTokens);
        setTransactions(userTransactions);
        
        const total = ownedTokens.reduce((sum, token) => sum + token.fractionPrice, 0);
        setTotalValue(total);
        
        const growth = ownedTokens.length > 0 ? 5.2 : 0;
        setTotalGrowth(growth);

      } catch (err) {
        console.error('Erro ao carregar tokens:', err);
        toast.error('Erro ao carregar seus tokens');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserTokens();
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
          isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : userTokens.length > 0 ? (
            <>
              <PortfolioSummaryCards 
                totalValue={totalValue}
                totalGrowth={totalGrowth}
                tokenCount={userTokens.length}
              />

              <PortfolioCharts tokens={userTokens} />

              <PortfolioTabs 
                userTokens={userTokens}
                transactions={transactions}
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
