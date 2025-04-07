
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    
    if (walletConnected) {
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
    }
    
    setTermsAccepted(termsAccepted || false);
  }, []);

  const connectWallet = () => {
    // Check if terms have been accepted
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    
    if (!termsAccepted) {
      // Show terms dialog
      setShowTermsDialog(true);
      return;
    }
    
    // If terms accepted, proceed with wallet connection
    proceedWithConnection();
  };
  
  const proceedWithConnection = () => {
    setIsConnecting(true);
    
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
      localStorage.setItem("walletConnected", "true");
      toast.success("Carteira conectada com sucesso");
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletConnected");
    toast.info("Carteira desconectada");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0xaBcD1234567890AbCdEf1234567890aBcDeF1234");
    toast.success("Endereço copiado para a área de transferência");
  };

  const goToExplorer = () => {
    window.open("https://etherscan.io/address/0xaBcD1234567890AbCdEf1234567890aBcDeF1234", "_blank");
    toast.success("Visualizando no explorer");
  };

  const viewTerms = () => {
    navigate("/termos-de-uso");
  };
  
  const handleAcceptTerms = () => {
    localStorage.setItem("termosAceitos", "true");
    setTermsAccepted(true);
    setShowTermsDialog(false);
    proceedWithConnection();
  };
  
  const redirectToTermsPage = () => {
    setShowTermsDialog(false);
    navigate("/termos-de-uso");
  };

  return {
    isConnected,
    isConnecting,
    walletAddress,
    showTermsDialog,
    termsAccepted,
    connectWallet,
    handleDisconnect,
    copyAddress,
    goToExplorer,
    viewTerms,
    handleAcceptTerms,
    redirectToTermsPage,
    setShowTermsDialog,
    setTermsAccepted
  };
};
