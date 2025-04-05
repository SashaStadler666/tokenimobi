
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { mockTokens, mockTransactions } from "@/lib/mockData";
import { ArrowRight, Clock, Activity, Wallet, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import ConnectWallet from "@/components/ConnectWallet";

const Dashboard = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  // Mocked user portfolio data
  const portfolioTokens = mockTokens.slice(0, 3).map(token => ({
    ...token,
    userFractions: Math.floor(Math.random() * 200) + 50,
    value: 0,
  })).map(token => ({
    ...token,
    value: token.userFractions * token.fractionPrice
  }));
  
  const portfolioValue = portfolioTokens.reduce((total, token) => total + token.value, 0);
  const portfolioChange24h = 3.2; // Mocked portfolio 24h change
  
  // Format dates for transactions
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (!isWalletConnected) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your portfolio, transactions and holdings.
          </p>
          <div onClick={() => setIsWalletConnected(true)}>
            <ConnectWallet />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">Your Portfolio</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Portfolio Value</CardTitle>
            <CardDescription>Your total holdings across all tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2 mb-1">
              <span className="text-3xl font-bold">${portfolioValue.toFixed(2)}</span>
              <span className={`text-sm ${portfolioChange24h >= 0 ? 'text-success' : 'text-destructive'} flex items-center`}>
                {portfolioChange24h >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(portfolioChange24h).toFixed(2)}% (24h)
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Wallet className="h-4 w-4 mr-1" />
                  <span className="text-xs">Total Tokens</span>
                </div>
                <p className="font-medium">{portfolioTokens.length}</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Activity className="h-4 w-4 mr-1" />
                  <span className="text-xs">Transactions</span>
                </div>
                <p className="font-medium">{mockTransactions.length}</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">First Purchase</span>
                </div>
                <p className="font-medium">7 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between">
              Buy Tokens
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Sell Tokens
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              View All Tokens
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="holdings" className="mb-10">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="holdings" className="p-4">
          <h3 className="text-xl font-medium mb-4">Your Token Holdings</h3>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Token</div>
              <div>Amount</div>
              <div>Price</div>
              <div>Value</div>
              <div>24h Change</div>
            </div>
            {portfolioTokens.map((token) => (
              <div key={token.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 items-center">
                <div className="flex items-center">
                  <img 
                    src={token.imageUrl} 
                    alt={token.name} 
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-xs text-muted-foreground">{token.symbol}</p>
                  </div>
                </div>
                <div>{token.userFractions.toLocaleString()}</div>
                <div>${token.fractionPrice.toFixed(3)}</div>
                <div>${token.value.toFixed(2)}</div>
                <div className={token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="p-4">
          <h3 className="text-xl font-medium mb-4">Your Recent Transactions</h3>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 font-medium border-b">
              <div>Type</div>
              <div>Token</div>
              <div>Amount</div>
              <div>Price</div>
              <div>Total</div>
              <div>Date</div>
            </div>
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="grid grid-cols-6 p-4 border-b last:border-b-0">
                <div className={`flex items-center ${tx.type === 'buy' ? 'text-success' : 'text-destructive'}`}>
                  {tx.type === 'buy' ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {tx.type.toUpperCase()}
                </div>
                <div>
                  {(mockTokens.find(t => t.id === tx.tokenId) || { symbol: '?' }).symbol}
                </div>
                <div>{tx.fractions} fractions</div>
                <div>${tx.price.toFixed(3)}</div>
                <div>${tx.total.toFixed(2)}</div>
                <div>{formatDate(tx.timestamp)}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
