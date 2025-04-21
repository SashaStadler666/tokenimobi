
import React from "react";
import { Token } from "@/lib/models";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioTokenCardPriceInfoProps {
  token: Token;
}

const PortfolioTokenCardPriceInfo = ({ token }: PortfolioTokenCardPriceInfoProps) => (
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <p className="text-xs text-muted-foreground">Preço por fração</p>
      <p className="font-medium">R${token.fractionPrice.toFixed(2)}</p>
    </div>
    <div>
      <p className="text-xs text-muted-foreground">Variação 24h</p>
      <p
        className={`font-medium flex items-center ${
          token.priceChange24h >= 0 ? "text-success" : "text-destructive"
        }`}
      >
        {token.priceChange24h >= 0 ? (
          <TrendingUp className="h-3 w-3 mr-1" />
        ) : (
          <TrendingDown className="h-3 w-3 mr-1" />
        )}
        {Math.abs(token.priceChange24h).toFixed(2)}%
      </p>
    </div>
  </div>
);

export default PortfolioTokenCardPriceInfo;
