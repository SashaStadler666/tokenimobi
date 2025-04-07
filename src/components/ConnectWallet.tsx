
import { useWalletConnection } from "@/hooks/useWalletConnection";
import ConnectSection from "./wallet/ConnectSection";
import WalletSection from "./wallet/WalletSection";

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
    setTermsAccepted
  } = useWalletConnection();

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
