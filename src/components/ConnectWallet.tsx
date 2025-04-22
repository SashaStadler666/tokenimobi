
import { useWalletConnection } from "@/hooks/useWalletConnection";
import ConnectSection from "./wallet/ConnectSection";
import WalletSection from "./wallet/WalletSection";
import { useEffect } from "react";

const ConnectWallet = () => {
  const {
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
  } = useWalletConnection();

  // Check if wallet is connected when component loads
  useEffect(() => {
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    if (walletConnected && !isConnected) {
      checkWalletConnection();
    }
  }, []);

  return isConnected ? (
    <WalletSection 
      walletAddress={walletAddress}
      onCopyAddress={copyAddress}
      onExplorerView={goToExplorer}
      onViewTerms={viewTerms}
      onDisconnect={handleDisconnect}
    />
  ) : (
    <ConnectSection 
      isConnecting={isConnecting}
      showTermsDialog={showTermsDialog}
      termsAccepted={termsAccepted}
      onConnect={connectWallet}
      onAcceptTerms={handleAcceptTerms}
      onViewFullTerms={redirectToTermsPage}
      onDialogOpenChange={setShowTermsDialog}
      onTermsChange={() => setTermsAccepted(!termsAccepted)}
    />
  );
};

export default ConnectWallet;
