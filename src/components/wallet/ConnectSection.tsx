
import ConnectButton from "./ConnectButton";
import TermsDialog from "./TermsDialog";

interface ConnectSectionProps {
  isConnecting: boolean;
  showTermsDialog: boolean;
  termsAccepted: boolean;
  onConnect: () => void;
  onAcceptTerms: () => void;
  onViewFullTerms: () => void;
  onDialogOpenChange: (open: boolean) => void;
  onTermsChange: () => void;
}

const ConnectSection = ({ 
  isConnecting, 
  showTermsDialog, 
  termsAccepted, 
  onConnect, 
  onAcceptTerms, 
  onViewFullTerms, 
  onDialogOpenChange, 
  onTermsChange
}: ConnectSectionProps) => {
  return (
    <>
      <ConnectButton 
        isConnecting={isConnecting} 
        onClick={onConnect} 
      />
      
      <TermsDialog 
        open={showTermsDialog}
        onOpenChange={onDialogOpenChange}
        termsAccepted={termsAccepted}
        onTermsChange={onTermsChange}
        onAcceptTerms={onAcceptTerms}
        onViewFullTerms={onViewFullTerms}
      />
    </>
  );
};

export default ConnectSection;
