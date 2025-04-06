
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building, LandPlot, Wallet, Users } from "lucide-react";

// Mock data for charts
const performanceData = [
  { month: 'Jan', value: 1000 },
  { month: 'Fev', value: 1100 },
  { month: 'Mar', value: 1050 },
  { month: 'Abr', value: 1300 },
  { month: 'Mai', value: 1400 },
  { month: 'Jun', value: 1380 },
  { month: 'Jul', value: 1500 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 pt-20">
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
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Investimento Total</p>
                    <h3 className="text-2xl font-bold">R$ 25.000,00</h3>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Tokens Adquiridos</p>
                    <h3 className="text-2xl font-bold">18</h3>
                    <p className="text-green-500 text-xs mt-1">5 novos tokens</p>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Imóveis Rurais</p>
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-green-500 text-xs mt-1">12 hectares</p>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Rendimento Mensal</p>
                    <h3 className="text-2xl font-bold">R$ 832,50</h3>
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
          <Card>
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Valor']} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
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
                  <p className="text-center text-muted-foreground py-8">
                    Você ainda não possui tokens de imóveis urbanos. 
                    Explore nosso catálogo para começar a investir.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rural">
              <Card>
                <CardHeader>
                  <CardTitle>Suas Terras Rurais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Você ainda não possui tokens de terras rurais. 
                    Explore nosso catálogo para começar a investir.
                  </p>
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
