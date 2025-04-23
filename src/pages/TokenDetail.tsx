
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, mockTransactions, wholePropertyTokens, kTokens } from "@/lib/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderSection from "@/components/token/HeaderSection";
import TokenHero from "@/components/token/TokenHero";
import TokenContainer from "@/components/token/TokenContainer";
import { toast } from "sonner";
import PurchaseModal from "@/components/token/PurchaseModal";
import PurchasePropertyModal from "@/components/token/PurchasePropertyModal";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import FloatingActionButton from "@/components/token/FloatingActionButton";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected, walletAddress, connectWallet, checkWalletConnection } = useWalletConnection();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showPropertyPurchaseModal, setShowPropertyPurchaseModal] = useState(false);
  
  // Look for token in both regular tokens, whole property tokens, and K tokens
  const token = [...mockTokens, ...wholePropertyTokens, ...kTokens].find(t => t.id === id);
  
  useEffect(() => {
    // Scroll to top when component mounts or token ID changes
    window.scrollTo(0, 0);
    
    // Verify wallet connection status when page loads
    checkWalletConnection();
  }, [id, checkWalletConnection]);
  
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

  const handleBuyClick = async () => {
    // Verificar a conexão da carteira antes de abrir o modal
    const walletConnected = await checkWalletConnection();
    
    if (!isConnected || !walletAddress) {
      toast.error("Carteira não conectada", {
        description: "Conecte sua carteira para realizar esta operação",
        action: {
          label: "Conectar",
          onClick: connectWallet
        }
      });
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
      
      <FloatingActionButton token={token} onBuyClick={handleBuyClick} />
      
      <Footer />
    </div>
  );
};

export default TokenDetail;
