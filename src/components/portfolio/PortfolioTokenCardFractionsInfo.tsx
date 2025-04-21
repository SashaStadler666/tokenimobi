
import React from "react";
import { Token } from "@/lib/models";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PortfolioTokenCardFractionsInfoProps {
  token: Token;
  userOwnedFractions: number;
}

const PortfolioTokenCardFractionsInfo = ({ token, userOwnedFractions }: PortfolioTokenCardFractionsInfoProps) => {
  const totalValue = userOwnedFractions * token.fractionPrice;
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-xs text-muted-foreground">Frações possuídas</p>
        <p className="font-medium">{userOwnedFractions}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Valor total</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="font-medium cursor-help">
                R${totalValue.toFixed(2)}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {userOwnedFractions} frações x R$
                {token.fractionPrice.toFixed(2)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PortfolioTokenCardFractionsInfo;
