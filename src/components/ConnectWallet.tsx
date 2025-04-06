
import { useState, useEffect } from "react";
import { Wallet, ChevronDown, Loader2, LogOut, Copy, ExternalLink, LineChart, FileText } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    if (walletConnected) {
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
    }
  }, []);

  const connectWallet = () => {
    setIsConnecting(true);
    
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
      localStorage.setItem("walletConnected", "true");
      toast.success("Carteira conectada com sucesso");
    }, 1000);
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

  const viewTerms = () => {
    navigate("/termos-de-uso");
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
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
        <DropdownMenuItem onClick={viewTerms}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Termos de Uso</span>
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
