
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Token, mockTransactions } from "@/lib/models";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PortfolioTokenCardImage from "./PortfolioTokenCardImage";
import PortfolioTokenCardPriceInfo from "./PortfolioTokenCardPriceInfo";
import PortfolioTokenCardFractionsInfo from "./PortfolioTokenCardFractionsInfo";
import PortfolioTokenSellDialog from "./PortfolioTokenSellDialog";

interface PortfolioTokenCardProps {
  token: Token;
}

const PortfolioTokenCard = ({ token }: PortfolioTokenCardProps) => {
  const [userOwnedFractions, setUserOwnedFractions] = useState(0);

  useEffect(() => {
    const tokenTransactions = mockTransactions.filter(
      tx => tx.tokenId === token.id
    );
    const owned = tokenTransactions.reduce((total, tx) => {
      if (tx.type === "buy") {
        return total + tx.fractions;
      } else if (tx.type === "sell") {
        return total - tx.fractions;
      }
      return total;
    }, 0);

    setUserOwnedFractions(owned);
  }, [token.id]);

  // Use the sell dialog to update the owned fractions
  const handleSell = (fractionsSold: number) => {
    setUserOwnedFractions(prev => prev - fractionsSold);
  };

  return (
    <Card className="overflow-hidden border border-muted">
      <PortfolioTokenCardImage token={token} />

      <CardContent className="p-4">
        <PortfolioTokenCardPriceInfo token={token} />
        <PortfolioTokenCardFractionsInfo
          token={token}
          userOwnedFractions={userOwnedFractions}
        />

        <div className="flex space-x-2">
          <PortfolioTokenSellDialog
            token={token}
            userOwnedFractions={userOwnedFractions}
            onSell={handleSell}
          />

          <Link to={`/token/${token.id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              Detalhes
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M7 7h10v10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTokenCard;
