
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Use useCallback to make the function referenceable in dependency arrays
  const checkWalletConnection = useCallback(async (): Promise<boolean> => {
    try {
      if (!window.ethereum) {
        setIsConnected(false);
        setWalletAddress("");
        return false;
      }
      
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletConnected", "true");
        return true;
      } else {
        setIsConnected(false);
        setWalletAddress("");
        localStorage.removeItem("walletConnected");
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar carteira:", error);
      setIsConnected(false);
      setWalletAddress("");
      return false;
    }
  }, []);

  // Inicializa ao carregar
  useEffect(() => {
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    const termosAceitos = localStorage.getItem("termosAceitos") === "true";

    setTermsAccepted(termosAceitos);

    if (walletConnected && termosAceitos) {
      checkWalletConnection();
    }

    // Escuta mudanças na carteira
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("disconnect", handleDisconnect);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [checkWalletConnection]);

  const connectWallet = async (): Promise<string | null> => {
    if (!termsAccepted) {
      setShowTermsDialog(true);
      return null;
    }

    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask não encontrada. Instale para continuar.");
      window.open("https://metamask.io/download/", "_blank");
      return null;
    }

    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletConnected", "true");
        toast.success("Carteira conectada com sucesso!");
        return accounts[0];
      } else {
        toast.error("Nenhuma conta encontrada.");
        return null;
      }
    } catch (error: any) {
      console.error("Erro ao conectar carteira:", error);
      if (error.code === 4001) {
        toast.error("Conexão rejeitada pelo usuário.");
      } else {
        toast.error(error?.message || "Erro ao conectar com a carteira.");
      }
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      localStorage.setItem("walletConnected", "true");
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletConnected");
    toast.info("Carteira desconectada.");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Endereço copiado para a área de transferência!");
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
    setTermsAccepted,
    checkWalletConnection
  };
};
