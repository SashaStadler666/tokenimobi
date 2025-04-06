
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { mockTokens, Token, mockTransactions } from "@/lib/models";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, PieChart, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioTokenCard from "@/components/portfolio/PortfolioTokenCard";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Generate mock performance data
const generatePerformanceData = () => {
  const data = [];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  let value = 5000;
  
  for (let i = 0; i < months.length; i++) {
    // Random growth between -5% and +10%
    const change = value * (Math.random() * 0.15 - 0.05);
    value += change;
    
    data.push({
      name: months[i],
      valor: Math.round(value)
    });
  }
  
  return data;
};

// Generate portfolio distribution data
const generateDistributionData = (tokens) => {
  return tokens.map(token => ({
    name: token.name.split(' ')[0], // First word of token name
    value: 50 * token.fractionPrice // 50 fractions of each token
  }));
};

// Generate token performance data
const generateTokenPerformanceData = (tokens) => {
  return tokens.map(token => ({
    name: token.name.split(' ')[0], // First word of token name
    rendimento: (token.priceChange24h > 0 ? 1 : -1) * Math.random() * 10,
    valorização: token.priceChange24h
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Portfolio = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock portfolio data
  const [userTokens, setUserTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [tokenPerformanceData, setTokenPerformanceData] = useState([]);
  
  useEffect(() => {
    // Check if wallet is connected
    const walletConnected = localStorage.getItem("walletConnected") === "true";
    setIsConnected(walletConnected);
    
    if (!walletConnected) {
      // If not connected, we'll still show the page but with a prompt to connect
    } else {
      // In a real app, we would fetch the user's tokens from the API
      // For now, we'll use mock data - assume the user owns these tokens
      const mockUserTokens = mockTokens.slice(0, 3);
      setUserTokens(mockUserTokens);
      
      // Calculate total portfolio value and growth
      const value = mockUserTokens.reduce((total, token) => {
        return total + (token.fractionPrice * 50); // Assume 50 fractions of each token
      }, 0);
      
      setTotalValue(value);
      setTotalGrowth(2.8); // Mock growth percentage
      
      // Generate mock chart data
      setPerformanceData(generatePerformanceData());
      setDistributionData(generateDistributionData(mockUserTokens));
      setTokenPerformanceData(generateTokenPerformanceData(mockUserTokens));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Meu Portfólio</h1>
          <p className="text-muted-foreground">
            Acompanhe seus investimentos e gerencie seus tokens imobiliários
          </p>
        </motion.div>
        
        {isConnected ? (
          <>
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
                    {userTokens.length}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Desempenho do Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`R$ ${value}`, 'Valor']}
                        labelFormatter={(label) => `Mês: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valor" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-4 w-4 mr-2 text-primary" />
                    Distribuição de Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                        labelFormatter={(label) => `Token: ${label}`}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                  Desempenho por Token
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tokenPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rendimento" name="Rendimento (%)" fill="#8884d8" />
                    <Bar dataKey="valorização" name="Valorização (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="tokens" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="tokens">Meus Tokens</TabsTrigger>
                <TabsTrigger value="transactions">Minhas Transações</TabsTrigger>
              </TabsList>
              <TabsContent value="tokens">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userTokens.map((token) => (
                    <PortfolioTokenCard key={token.id} token={token} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <Card>
                  <CardContent className="p-6">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-4 font-medium text-sm border-b bg-muted/50">
                        <div>Tipo</div>
                        <div>Token</div>
                        <div>Quantidade</div>
                        <div>Valor</div>
                        <div>Data</div>
                      </div>
                      {mockTransactions.map((tx) => (
                        <div key={tx.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 text-sm">
                          <div className={tx.type === 'buy' ? 'text-success' : 'text-destructive'}>
                            {tx.type === 'buy' ? 'COMPRA' : 'VENDA'}
                          </div>
                          <div>{mockTokens.find(t => t.id === tx.tokenId)?.name.substring(0, 10) || tx.tokenId}...</div>
                          <div>{tx.fractions} frações</div>
                          <div>R${tx.total.toFixed(2)}</div>
                          <div>{tx.timestamp.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="p-6 text-center">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Conecte sua carteira para visualizar seu portfólio</h3>
              <p className="text-muted-foreground mb-6">
                Você precisa conectar sua carteira para poder visualizar e gerenciar seus tokens imobiliários.
              </p>
              <Button 
                onClick={() => {
                  const termsAccepted = localStorage.getItem("termosAceitos") === "true";
                  if (termsAccepted) {
                    localStorage.setItem("walletConnected", "true");
                    window.location.reload();
                  } else {
                    navigate("/termos-de-uso");
                  }
                }}
                className="button-glow"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Conectar Carteira
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
