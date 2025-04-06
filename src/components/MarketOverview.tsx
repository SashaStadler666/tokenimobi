
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { marketStats, mockTokens } from "@/lib/models";
import { TrendingUp, BarChart3, Users, Coins, PieChart } from "lucide-react";

const MarketOverview = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  // Mock data for the chart
  const volumeData = mockTokens.map(token => ({
    name: token.symbol,
    volume: token.volume24h,
  })).sort((a, b) => b.volume - a.volume).slice(0, 5);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-4xl font-bold mb-8 text-center gradient-text">
        Fractional Token Market
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Buy and sell fractions of valuable tokens on the blockchain. Own a piece of high-value assets with minimal investment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketStats.totalMarketCap)}</div>
            <p className="text-xs text-muted-foreground">
              Across {marketStats.totalTokens} fractionalized tokens
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Trading Volume</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketStats.totalVolume24h)}</div>
            <p className="text-xs text-muted-foreground">
              +18% from previous day
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketStats.totalHolders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Unique wallet addresses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">30d Average Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{marketStats.averageReturn30d.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all fractionalized tokens
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Trading Volume (24h)</CardTitle>
          <CardDescription>
            The most actively traded fractionalized tokens in the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} layout="vertical">
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Volume"]}
                  contentStyle={{ 
                    background: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)" 
                  }}
                />
                <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
