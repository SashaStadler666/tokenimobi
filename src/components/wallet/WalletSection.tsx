
import WalletMenu from "./WalletMenu";

interface WalletSectionProps {
  walletAddress: string;
  onCopyAddress: () => void;
  onExplorerView: () => void;
  onViewTerms: () => void;
  onDisconnect: () => void;
}

const WalletSection = ({
  walletAddress,
  onCopyAddress,
  onExplorerView,
  onViewTerms,
  onDisconnect
}: WalletSectionProps) => {
  return (
    <WalletMenu 
      walletAddress={walletAddress}
      onCopyAddress={onCopyAddress}
      onExplorerView={onExplorerView}
      onViewTerms={onViewTerms}
      onDisconnect={onDisconnect}
    />
  );
};

export default WalletSection;
