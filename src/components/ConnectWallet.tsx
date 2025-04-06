
import { useState, useEffect } from "react";
import { Wallet, ChevronDown, Loader2, LogOut, Copy, ExternalLink, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    if (walletConnected) {
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
    }
  }, []);

  const handleConnectRequest = () => {
    // Check if terms have been accepted
    const termsAccepted = localStorage.getItem("termosAceitos") === "true";
    
    if (termsAccepted) {
      // If terms already accepted, connect directly
      connectWallet();
    } else {
      // Show terms dialog
      setShowTerms(true);
    }
  };

  const connectWallet = () => {
    setIsConnecting(true);
    setShowTerms(false);
    
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
      localStorage.setItem("walletConnected", "true");
      toast.success("Carteira conectada com sucesso");
    }, 1000);
  };

  const handleAcceptTerms = () => {
    localStorage.setItem("termosAceitos", "true");
    connectWallet();
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

  if (!isConnected) {
    return (
      <>
        <Button 
          onClick={handleConnectRequest} 
          disabled={isConnecting}
          className="button-glow"
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

        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Termos de Uso</DialogTitle>
              <DialogDescription>
                Por favor, leia e aceite os termos antes de continuar.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-64 p-2 border rounded-md bg-muted/10">
              <div className="text-sm space-y-4">
                <p>
                  A plataforma Token Imobi atua como intermediadora tecnológica e não realiza oferta pública de valores mobiliários. O uso do sistema exige validação de identidade e está em conformidade com as diretrizes da LGPD.
                </p>
                <p>
                  O usuário reconhece que investimentos em propriedades tokenizadas estão sujeitos a riscos, incluindo, mas não se limitando a, baixa liquidez, variações de mercado e especificidades regulatórias sobre imóveis urbanos e rurais.
                </p>
                <p>
                  Propriedades do tipo agro (fazendas, áreas de cultivo, criação) e urbanas (terrenos para construção civil) possuem características distintas, sendo responsabilidade do investidor verificar os detalhes antes da aquisição de frações.
                </p>
                <p>
                  Ao clicar em "Aceitar", você declara estar ciente de todas as informações apresentadas e concorda integralmente com os termos de uso.
                </p>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowTerms(false)}>Cancelar</Button>
              <Button onClick={handleAcceptTerms}>Aceitar e Conectar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary/50 button-glow">
          <Wallet className="mr-2 h-4 w-4 text-primary" />
          {walletAddress}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Carteira</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/portfolio" className="flex items-center w-full">
            <LineChart className="mr-2 h-4 w-4" />
            <span>Meu Portfólio</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copiar Endereço</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToExplorer}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Ver no Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Desconectar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWallet;
