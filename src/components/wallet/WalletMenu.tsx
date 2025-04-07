
import { Link } from "react-router-dom";
import { Wallet, ChevronDown, Copy, ExternalLink, LineChart, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletMenuProps {
  walletAddress: string;
  onCopyAddress: () => void;
  onExplorerView: () => void;
  onViewTerms: () => void;
  onDisconnect: () => void;
}

const WalletMenu = ({
  walletAddress,
  onCopyAddress,
  onExplorerView,
  onViewTerms,
  onDisconnect,
}: WalletMenuProps) => {
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
        <DropdownMenuItem onClick={onCopyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copiar Endereço</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExplorerView}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Ver no Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewTerms}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Termos de Uso</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDisconnect} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Desconectar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletMenu;
