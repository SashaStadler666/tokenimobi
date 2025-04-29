
import { motion } from "framer-motion";
import { Building, LandPlot, Wallet, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsCardsProps {
  totalInvestment: number;
  tokenCount: number;
  ruralCount: number;
  urbanCount: number;
  monthlyIncome: number;
  isConnected: boolean;
}

const DashboardStatsCards = ({
  totalInvestment,
  tokenCount,
  ruralCount,
  urbanCount,
  monthlyIncome,
  isConnected
}: DashboardStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="card-hover-effect">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">Investimento Total</p>
                <h3 className="text-2xl font-bold">
                  {isConnected 
                    ? `R$ ${totalInvestment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                    : "R$ 0,00"}
                </h3>
                <p className="text-green-500 text-xs mt-1">+12% este mês</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="card-hover-effect">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">Tokens Adquiridos</p>
                <h3 className="text-2xl font-bold">{tokenCount}</h3>
                <p className="text-green-500 text-xs mt-1">
                  {tokenCount > 0 ? `${tokenCount} tokens ativos` : "Nenhum token adquirido"}
                </p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="card-hover-effect">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">Imóveis Rurais</p>
                <h3 className="text-2xl font-bold">{ruralCount}</h3>
                <p className="text-green-500 text-xs mt-1">
                  {ruralCount > 0 ? `${ruralCount} tokens rurais` : "Nenhum token rural"}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <LandPlot className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="card-hover-effect">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">Rendimento Mensal</p>
                <h3 className="text-2xl font-bold">
                  {isConnected 
                    ? `R$ ${monthlyIncome.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                    : "R$ 0,00"}
                </h3>
                <p className="text-green-500 text-xs mt-1">+3.5% que mês anterior</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardStatsCards;
