
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, Token, mockTransactions } from "@/lib/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TokenDetailHeader from "@/components/token/TokenDetailHeader";
import TokenDetailInfo from "@/components/token/TokenDetailInfo";
import TokenDetailTabs from "@/components/token/TokenDetailTabs";
import TokenDetailSidebar from "@/components/token/TokenDetailSidebar";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWallet from "@/components/ConnectWallet";
import { motion } from "framer-motion";

// Import whole property tokens from Tokens page
import { wholePropertyTokens } from "@/pages/Tokens";

// Function to get fallback images based on property type
const getImageForType = (type: string | undefined) => {
  switch (type?.toLowerCase()) {
    case "apartamento":
      return "https://images.unsplash.com/photo-1598928506311-f4fe0afa1bd6";
    case "casa":
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
    case "flat":
      return "https://images.unsplash.com/photo-1599423300746-b62533397364";
    case "rural":
    case "fazenda":
    case "agro":
      return "https://images.unsplash.com/photo-1566438480900-0609be27a4be";
    default:
      return "https://images.unsplash.com/photo-1501183638710-841dd1904471";
  }
};

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  
  // Look for token in both regular tokens and whole property tokens
  const token = [...mockTokens, ...wholePropertyTokens].find(t => t.id === id);
  
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
  
  // Apply fallback image if imageUrl is missing or empty
  if (!token.imageUrl) {
    token.imageUrl = getImageForType(token.propertyType);
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-lg overflow-hidden border"
        >
          <img
            src={token.imageUrl}
            alt={token.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </motion.div>
        
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
      
      <Footer />
    </div>
  );
};

export default TokenDetail;
