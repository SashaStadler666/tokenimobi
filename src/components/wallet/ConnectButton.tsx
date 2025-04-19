
import { Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectButtonProps {
  isConnecting: boolean;
  onClick: () => void;
}

const ConnectButton = ({ isConnecting, onClick }: ConnectButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isConnecting}
      className="button-glow"
      type="button"
      size="lg"
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Conectando
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Conectar Carteira
        </>
      )}
    </Button>
  );
};

export default ConnectButton;
