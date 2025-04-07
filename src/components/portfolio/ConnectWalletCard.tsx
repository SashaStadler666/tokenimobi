
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const ConnectWalletCard = () => {
  const navigate = useNavigate();
  
  const handleConnectWallet = () => {
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    if (termsAccepted) {
      localStorage.setItem("walletConnected", "true");
      window.location.reload();
    } else {
      navigate("/termos-de-uso");
    }
  };
  
  return (
    <Card className="p-6 text-center">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Conecte sua carteira para visualizar seu portfólio</h3>
        <p className="text-muted-foreground mb-6">
          Você precisa conectar sua carteira para poder visualizar e gerenciar seus tokens imobiliários.
        </p>
        <Button 
          onClick={handleConnectWallet}
          className="button-glow"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Conectar Carteira
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectWalletCard;
