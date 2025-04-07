import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, mockTransactions, wholePropertyTokens } from "@/lib/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderSection from "@/components/token/HeaderSection";
import WalletSection from "@/components/token/WalletSection";
import TokenHero from "@/components/token/TokenHero";
import TokenContainer from "@/components/token/TokenContainer";
import FloatingActionButton from "@/components/token/FloatingActionButton";
import { toast } from "sonner";
import PurchaseTokenModal from "@/components/token/PurchaseTokenModal";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
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
    if (!isWalletConnected) {
      toast.error("Carteira não conectada. Conecte sua carteira para realizar esta operação");
    }
    
    // Abre o modal de compra
    setShowPurchaseModal(true);
  };
  
  const handleConnectWallet = () => {
    localStorage.setItem("walletConnected", "true");
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <HeaderSection />
        <WalletSection isWalletConnected={isWalletConnected} />
        <TokenHero token={token} />
        
        <div className="my-6">
          <Button onClick={() => setShowPurchaseModal(true)} className="w-full flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" /> Comprar Token
          </Button>
        </div>
        
        <TokenContainer 
          token={token} 
          tokenTransactions={tokenTransactions}
          formatMarketCap={formatMarketCap}
          formatVolume={formatVolume}
        />
      </div>
      
      <FloatingActionButton token={token} onBuyClick={handleBuyClick} />
      
      <PurchaseTokenModal
        open={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        token={token}
        isWalletConnected={isWalletConnected}
        onConnectWallet={handleConnectWallet}
      />
      
      <Footer />
    </div>
  );
};

export default TokenDetail;
