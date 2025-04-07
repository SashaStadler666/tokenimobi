
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, PieChart } from "lucide-react";

interface PortfolioSummaryCardsProps {
  totalValue: number;
  totalGrowth: number;
  tokenCount: number;
}

const PortfolioSummaryCards = ({ totalValue, totalGrowth, tokenCount }: PortfolioSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center">
            <Wallet className="h-4 w-4 mr-2 text-primary" />
            Valor Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalValue)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
            Crescimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            +{totalGrowth.toFixed(2)}%
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center">
            <PieChart className="h-4 w-4 mr-2 text-primary" />
            Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tokenCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummaryCards;
