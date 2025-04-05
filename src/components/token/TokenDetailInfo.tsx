
import { Separator } from "@/components/ui/separator";
import { Token } from "@/lib/mockData";
import { Share2, ExternalLink, MapPin, Users, Wallet, Home, Ruler, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TokenDetailInfoProps {
  token: Token;
  formatMarketCap: string;
  formatVolume: string;
}

const TokenDetailInfo = ({ token, formatMarketCap, formatVolume }: TokenDetailInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="w-full md:w-1/3">
        <div className="rounded-xl overflow-hidden border border-border">
          <img 
            src={token.imageUrl} 
            alt={token.name} 
            className="w-full aspect-square object-cover"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{token.name}</h1>
            <p className="text-muted-foreground">{token.symbol}</p>
            
            {token.location && (
              <div className="flex items-center mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{token.location}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Preço da Fração</p>
            <p className="text-xl font-bold">R$ {token.fractionPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Variação</p>
            <p className={`text-xl font-bold ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor de Mercado</p>
            <p className="text-xl font-bold">{formatMarketCap}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume 24h</p>
            <p className="text-xl font-bold">{formatVolume}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{token.holders.toLocaleString()} investidores</span>
          </div>
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{token.availableFractions.toLocaleString()} frações disponíveis</span>
          </div>
          {token.propertyType && (
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{token.propertyType}</span>
            </div>
          )}
          {token.area && (
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{token.area} m²</span>
            </div>
          )}
          {token.yearBuilt && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Construção em {token.yearBuilt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenDetailInfo;
