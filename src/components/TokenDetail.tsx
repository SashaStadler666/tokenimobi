
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, mockTransactions } from "@/lib/models";
import TokenDetailHeader from "./token/TokenDetailHeader";
import TokenDetailInfo from "./token/TokenDetailInfo";
import TokenDetailTabs from "./token/TokenDetailTabs";
import TokenDetailSidebar from "./token/TokenDetailSidebar";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  
  const token = mockTokens.find(t => t.id === id);
  
  if (!token) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Imóvel não encontrado</h2>
        <button 
          onClick={() => navigate("/")} 
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Voltar para Home
        </button>
      </div>
    );
  }
  
  const formatMarketCap = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.marketCap);
  
  const formatVolume = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.volume24h);
  
  const tokenTransactions = mockTransactions.filter(tx => tx.tokenId === token.id);
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <TokenDetailHeader />
      
      <div className="flex justify-end mb-4">
        {isWalletConnected ? (
          <Link to="/portfolio">
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Minha Carteira
            </Button>
          </Link>
        ) : (
          <ConnectWallet />
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TokenDetailInfo 
            token={token} 
            formatMarketCap={formatMarketCap} 
            formatVolume={formatVolume} 
          />
          
          <TokenDetailTabs token={token} transactions={tokenTransactions} />
        </div>
        
        <div>
          <TokenDetailSidebar token={token} />
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
