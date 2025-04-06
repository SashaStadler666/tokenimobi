
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
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Check if wallet is already connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    if (walletConnected) {
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
    }
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setWalletAddress("0xaBcD...1234");
      localStorage.setItem("walletConnected", "true");
      toast.success("Wallet connected successfully");
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("walletConnected");
    toast.info("Wallet disconnected");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0xaBcD1234567890AbCdEf1234567890aBcDeF1234");
    toast.success("Address copied to clipboard");
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect} 
        disabled={isConnecting}
        className="button-glow"
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
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
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/portfolio" className="flex items-center w-full">
            <LineChart className="mr-2 h-4 w-4" />
            <span>My Portfolio</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWallet;
