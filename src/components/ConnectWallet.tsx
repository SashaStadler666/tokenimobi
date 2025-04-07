
import { useWalletConnection } from "@/hooks/useWalletConnection";
import ConnectButton from "./wallet/ConnectButton";
import TermsDialog from "./wallet/TermsDialog";
import WalletMenu from "./wallet/WalletMenu";

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

  if (!isConnected) {
    return (
      <>
        <ConnectButton 
          isConnecting={isConnecting} 
          onClick={connectWallet} 
        />
        
        <TermsDialog 
          open={showTermsDialog}
          onOpenChange={setShowTermsDialog}
          termsAccepted={termsAccepted}
          onTermsChange={() => setTermsAccepted(!termsAccepted)}
          onAcceptTerms={handleAcceptTerms}
          onViewFullTerms={redirectToTermsPage}
        />
      </>
    );
  }

  return (
    <WalletMenu 
      walletAddress={walletAddress}
      onCopyAddress={copyAddress}
      onExplorerView={goToExplorer}
      onViewTerms={viewTerms}
      onDisconnect={handleDisconnect}
    />
  );
};

export default ConnectWallet;
