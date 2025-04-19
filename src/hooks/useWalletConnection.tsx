
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    // Check if wallet was previously connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    
    if (walletConnected) {
      checkWalletConnection();
    }
    
    setTermsAccepted(termsAccepted || false);
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Get the connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletConnected", "true");
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setIsConnected(false);
        localStorage.removeItem("walletConnected");
      }
    }
  };

  const connectWallet = async () => {
    // Check if terms have been accepted
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    
    if (!termsAccepted) {
      setShowTermsDialog(true);
      return;
    }
    
    if (typeof window.ethereum === 'undefined') {
      toast.error("MetaMask não encontrada. Por favor, instale a extensão MetaMask.");
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletConnected", "true");
        toast.success("Carteira conectada com sucesso!");
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
      } else {
        toast.error("Nenhuma conta selecionada. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error(error.message || "Erro ao conectar carteira. Tente novamente.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      handleDisconnect();
    } else {
      // User switched accounts
      setWalletAddress(accounts[0]);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletConnected");
    toast.info("Carteira desconectada");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Endereço copiado para a área de transferência");
  };

  const goToExplorer = () => {
    window.open(`https://etherscan.io/address/${walletAddress}`, "_blank");
  };

  const viewTerms = () => {
    window.open("/termos-de-uso", "_blank");
  };
  
  const handleAcceptTerms = () => {
    localStorage.setItem("termosAceitos", "true");
    setTermsAccepted(true);
    setShowTermsDialog(false);
    connectWallet();
  };
  
  const redirectToTermsPage = () => {
    setShowTermsDialog(false);
    window.location.href = "/termos-de-uso";
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
