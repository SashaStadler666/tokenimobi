
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, mockTransactions, wholePropertyTokens } from "@/lib/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderSection from "@/components/token/HeaderSection";
import TokenHero from "@/components/token/TokenHero";
import TokenContainer from "@/components/token/TokenContainer";
import { toast } from "sonner";
import PurchaseModal from "@/components/token/PurchaseModal";
import PurchasePropertyModal from "@/components/token/PurchasePropertyModal";
import { useWalletConnection } from "@/hooks/useWalletConnection";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useWalletConnection();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showPropertyPurchaseModal, setShowPropertyPurchaseModal] = useState(false);
  
  // Look for token in both regular tokens and whole property tokens
  const token = [...mockTokens, ...wholePropertyTokens].find(t => t.id === id);
  
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center flex-grow">
          <h2 className="text-2xl font-bold mb-4">Imóvel não encontrado</h2>
          <button 
            onClick={() => navigate("/")} 
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Voltar para Home
          </button>
        </div>
        <Footer />
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

  const handleBuyClick = () => {
    if (!isConnected) {
      toast.error("Carteira não conectada. Conecte sua carteira para realizar esta operação");
      return;
    }
    
    if (token.isWholeProperty) {
      setShowPropertyPurchaseModal(true);
    } else {
      setShowPurchaseModal(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <HeaderSection />
        <TokenHero token={token} />
        
        <TokenContainer 
          token={token} 
          tokenTransactions={tokenTransactions}
          formatMarketCap={formatMarketCap}
          formatVolume={formatVolume}
          onBuyClick={handleBuyClick}
        />
      </div>
      
      {!token.isWholeProperty ? (
        <PurchaseModal
          open={showPurchaseModal}
          onOpenChange={setShowPurchaseModal}
          token={token}
        />
      ) : (
        <PurchasePropertyModal
          open={showPropertyPurchaseModal}
          onOpenChange={setShowPropertyPurchaseModal}
          token={token}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default TokenDetail;
