
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3 } from "lucide-react";
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

// Helper function to generate performance data
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

// Generate token performance data
const generateTokenPerformanceData = (tokens) => {
  return tokens.map(token => ({
    name: token.name.split(' ')[0], // First word of token name
    rendimento: (token.priceChange24h > 0 ? 1 : -1) * Math.random() * 10,
    valorização: token.priceChange24h
  }));
};

// Generate portfolio distribution data
const generateDistributionData = (tokens) => {
  return tokens.map(token => ({
    name: token.name.split(' ')[0], // First word of token name
    value: 50 * token.fractionPrice // 50 fractions of each token
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface PortfolioChartsProps {
  tokens: any[];
}

const PortfolioCharts = ({ tokens }: PortfolioChartsProps) => {
  const performanceData = generatePerformanceData();
  const distributionData = generateDistributionData(tokens);
  const tokenPerformanceData = generateTokenPerformanceData(tokens);

  return (
    <>
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
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
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
    </>
  );
};

export default PortfolioCharts;
