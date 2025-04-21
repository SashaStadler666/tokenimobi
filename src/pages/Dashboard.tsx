import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building, LandPlot, Wallet, Users } from "lucide-react";
import { mockTokens, mockTransactions } from "@/lib/models";
import { useWalletConnection } from "@/hooks/useWalletConnection";

// Calculate user portfolio data from transactions
const calculatePortfolioData = () => {
  // Get user token holdings
  const userTokenIds = new Set<string>();
  
  mockTransactions.forEach(tx => {
    if (tx.type === 'buy') {
      userTokenIds.add(tx.tokenId);
    }
  });
  
  // Calculate owned fractions per token
  const ownedTokens = Array.from(userTokenIds).map(tokenId => {
    const token = mockTokens.find(t => t.id === tokenId);
    if (!token) return null;
    
    // Calculate how many fractions user owns
    const fractions = mockTransactions
      .filter(tx => tx.tokenId === tokenId)
      .reduce((total, tx) => {
        if (tx.type === 'buy') return total + tx.fractions;
        if (tx.type === 'sell') return total - tx.fractions;
        return total;
      }, 0);
    
    // Only return tokens where user still owns fractions
    return fractions > 0 ? { token, fractions } : null;
  }).filter(Boolean);

  // Calculate total investment
  const totalInvestment = ownedTokens.reduce((sum, item) => {
    if (!item) return sum;
    return sum + (item.token.fractionPrice * item.fractions);
  }, 0);

  // Count token types
  const urbanCount = ownedTokens.filter(item => 
    item && (item.token.propertyType === "Apartamento" || 
    item.token.propertyType === "Casa" || 
    item.token.propertyType === "Flat" ||
    item.token.propertyType === "Comercial")
  ).length;

  const ruralCount = ownedTokens.filter(item => 
    item && (item.token.propertyType === "Terreno" || 
    item.token.propertyType === "Fazenda" ||
    item.token.propertyType === "Rural")
  ).length;

  // Calculate monthly income (simplified)
  const monthlyIncome = ownedTokens.reduce((sum, item) => {
    if (!item) return sum;
    // Assume 0.5% monthly return on average
    return sum + (item.token.fractionPrice * item.fractions * 0.005);
  }, 0);

  return {
    totalInvestment,
    tokenCount: ownedTokens.length,
    urbanCount,
    ruralCount,
    monthlyIncome,
    ownedTokens
  };
};

// Mock data for charts
const generatePerformanceData = (initial = 1000, months = 7) => {
  const data = [];
  let currentValue = initial;
  
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const currentMonth = new Date().getMonth();
  
  for (let i = 0; i < months; i++) {
    let adjustedMonthIndex = (currentMonth - (months - 1) + i) % 12;
    if (adjustedMonthIndex < 0) {
      adjustedMonthIndex += 12;
    }
    
    const month = monthNames[adjustedMonthIndex];
    
    // Random growth between -3% and +8%
    const changePercent = -3 + Math.random() * 11;
    currentValue = currentValue * (1 + changePercent / 100);
    
    data.push({
      month,
      value: Math.round(currentValue)
    });
  }
  
  return data;
};

const Dashboard = () => {
  const { isConnected } = useWalletConnection();
  const [portfolioData, setPortfolioData] = useState({
    totalInvestment: 0,
    tokenCount: 0,
    urbanCount: 0,
    ruralCount: 0,
    monthlyIncome: 0,
    ownedTokens: []
  });
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    if (isConnected) {
      const data = calculatePortfolioData();
      setPortfolioData(data);
      
      // Generate performance data based on total investment
      const chartData = generatePerformanceData(
        data.totalInvestment > 0 ? data.totalInvestment : 1000
      );
      setPerformanceData(chartData);
    }
  }, [isConnected, mockTransactions]);

  return (
    <div className="min-h-screen p-4 pt-20 bg-gradient-to-b from-background to-secondary/5">
      <PageHeader 
        title="Dashboard" 
        description="Bem-vindo ao seu painel de controle da Token Imobi."
      />
      
      <div className="container mx-auto mt-8">
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
                        ? `R$ ${portfolioData.totalInvestment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
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
                    <h3 className="text-2xl font-bold">{portfolioData.tokenCount}</h3>
                    <p className="text-green-500 text-xs mt-1">
                      {portfolioData.tokenCount > 0 ? `${portfolioData.tokenCount} tokens ativos` : "Nenhum token adquirido"}
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
                    <h3 className="text-2xl font-bold">{portfolioData.ruralCount}</h3>
                    <p className="text-green-500 text-xs mt-1">
                      {portfolioData.ruralCount > 0 ? `${portfolioData.ruralCount} tokens rurais` : "Nenhum token rural"}
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
                        ? `R$ ${portfolioData.monthlyIncome.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
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

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="border-border/30 shadow-sm">
            <CardHeader>
              <CardTitle>Desempenho do Portfólio</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Tabs defaultValue="urban">
            <TabsList className="mb-4">
              <TabsTrigger value="urban">Imóveis Urbanos</TabsTrigger>
              <TabsTrigger value="rural">Terras Rurais</TabsTrigger>
            </TabsList>
            <TabsContent value="urban">
              <Card>
                <CardHeader>
                  <CardTitle>Seus Imóveis Urbanos</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolioData.urbanCount > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.ownedTokens.map((item, index) => {
                        if (!item || !['Apartamento', 'Casa', 'Flat', 'Comercial'].includes(item.token.propertyType)) 
                          return null;
                          
                        return (
                          <div key={index} className="flex items-center p-3 border rounded-lg">
                            <img 
                              src={item.token.imageUrl} 
                              alt={item.token.name}
                              className="w-12 h-12 rounded object-cover mr-3"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=64";
                              }}
                            />
                            <div>
                              <p className="font-medium">{item.token.name}</p>
                              <p className="text-xs text-muted-foreground">{item.fractions} frações</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Você ainda não possui tokens de imóveis urbanos. 
                      Explore nosso catálogo para começar a investir.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rural">
              <Card>
                <CardHeader>
                  <CardTitle>Suas Terras Rurais</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolioData.ruralCount > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.ownedTokens.map((item, index) => {
                        if (!item || !['Terreno', 'Fazenda', 'Rural'].includes(item.token.propertyType)) 
                          return null;
                          
                        return (
                          <div key={index} className="flex items-center p-3 border rounded-lg">
                            <img 
                              src={item.token.imageUrl} 
                              alt={item.token.name}
                              className="w-12 h-12 rounded object-cover mr-3"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=64";
                              }}
                            />
                            <div>
                              <p className="font-medium">{item.token.name}</p>
                              <p className="text-xs text-muted-foreground">{item.fractions} frações</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Você ainda não possui tokens de terras rurais. 
                      Explore nosso catálogo para começar a investir.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
