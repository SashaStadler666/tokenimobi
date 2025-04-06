
import { useParams, useNavigate } from "react-router-dom";
import { mockTokens, Token, mockTransactions } from "@/lib/models";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TokenDetailHeader from "@/components/token/TokenDetailHeader";
import TokenDetailInfo from "@/components/token/TokenDetailInfo";
import TokenDetailTabs from "@/components/token/TokenDetailTabs";
import TokenDetailSidebar from "@/components/token/TokenDetailSidebar";
import TokenMap from "@/components/token/TokenMap";
import FloatingActionButton from "@/components/token/FloatingActionButton";
import { Button } from "@/components/ui/button";
import { Wallet, Building, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWallet from "@/components/ConnectWallet";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { getImageForType, getPropertyIcon, getPropertyDescription } from "@/lib/imageUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Import whole property tokens from Tokens page
import { wholePropertyTokens } from "@/pages/Tokens";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  
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
  
  // Determine display image without mutating the original token
  const displayImage = token.imageUrl || getImageForType(token.propertyType);
  
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
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua carteira para realizar esta operação",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Iniciando processo de compra",
      description: token.isWholeProperty 
        ? "Você está adquirindo o imóvel inteiro" 
        : "Você está comprando frações deste token",
    });
    
    // Scroll to the buy interface
    const buyElement = document.getElementById('buy-section');
    if (buyElement) {
      buyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Determine property type icon
  const PropertyTypeIcon = token.propertyType?.toLowerCase().includes('fazenda') || 
                          token.propertyType?.toLowerCase().includes('rural') ? 
                          Leaf : Building;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <TokenDetailHeader />
          <ThemeToggle />
        </div>
        
        <div className="flex justify-end mb-4">
          {isWalletConnected ? (
            <Link to="/portfolio">
              <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-transform">
                <Wallet className="h-4 w-4" />
                Minha Carteira
              </Button>
            </Link>
          ) : (
            <ConnectWallet />
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-lg overflow-hidden border relative group ring-1 ring-muted/20 glow-shadow"
        >
          <div className="aspect-[16/9] sm:aspect-[3/2] md:aspect-[21/9] lg:aspect-[4/2] w-full relative">
            <img
              src={displayImage}
              alt={token.name}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isImageLoaded ? 'ken-burns-effect' : ''}`}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                  {token.name}
                </h2>
                {token.location && (
                  <p className="text-white/90 text-sm md:text-base mt-1 drop-shadow-md">
                    {token.location}
                  </p>
                )}
                <div className="mt-2">
                  <span className="inline-block bg-primary/90 text-primary-foreground text-xs md:text-sm px-2 py-1 rounded">
                    {token.propertyType}
                  </span>
                  {token.isWholeProperty && (
                    <span className="ml-2 inline-block bg-accent/90 text-accent-foreground text-xs md:text-sm px-2 py-1 rounded">
                      Imóvel Inteiro
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 p-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-xl float-icon">
                      <PropertyTypeIcon className="h-5 w-5 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{getPropertyDescription(token.propertyType)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TokenDetailInfo 
              token={token} 
              formatMarketCap={formatMarketCap} 
              formatVolume={formatVolume} 
            />
            
            {token.location && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Localização</h3>
                <TokenMap token={token} />
              </div>
            )}
            
            <TokenDetailTabs token={token} transactions={tokenTransactions} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            id="buy-section"
          >
            <TokenDetailSidebar token={token} />
          </motion.div>
        </div>
      </div>
      
      <FloatingActionButton token={token} onBuyClick={handleBuyClick} />
      
      <Footer />
    </div>
  );
};

export default TokenDetail;
