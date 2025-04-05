
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, ExternalLink, Users, Wallet, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTokens, mockTransactions, Token } from "@/lib/mockData";
import BuySellInterface from "./BuySellInterface";
import { Separator } from "@/components/ui/separator";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the token by ID
  const token = mockTokens.find(t => t.id === id);
  
  if (!token) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Token not found</h2>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }
  
  // Format numbers for display
  const formatMarketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.marketCap);
  
  const formatVolume = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.volume24h);
  
  // Token's recent transactions
  const tokenTransactions = mockTransactions.filter(tx => tx.tokenId === token.id);
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Market
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Token info */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="rounded-xl overflow-hidden border border-border">
                <img 
                  src={token.imageUrl} 
                  alt={token.name} 
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{token.name}</h1>
                  <p className="text-muted-foreground">{token.symbol}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fraction Price</p>
                  <p className="text-xl font-bold">${token.fractionPrice.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className={`text-xl font-bold ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-xl font-bold">{formatMarketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-xl font-bold">{formatVolume}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{token.holders.toLocaleString()} holders</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{token.availableFractions.toLocaleString()} available</span>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about" className="mt-8">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="holders">Holders</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="p-4">
              <h3 className="text-xl font-bold mb-4">About {token.name}</h3>
              <p className="text-muted-foreground mb-4">{token.description}</p>
              <p className="text-muted-foreground">
                This token represents fractional ownership of {token.name}. Each fraction entitles the holder to a proportional claim on the underlying asset and its benefits. The token is divisible into {token.totalFractions.toLocaleString()} equal parts, with each fraction priced at ${token.fractionPrice.toFixed(3)}.
              </p>
            </TabsContent>
            <TabsContent value="transactions" className="p-4">
              <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
              {tokenTransactions.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium text-sm border-b">
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Price</div>
                    <div>Total</div>
                    <div>Time</div>
                  </div>
                  {tokenTransactions.map((tx) => (
                    <div key={tx.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 text-sm">
                      <div className={tx.type === 'buy' ? 'text-success' : 'text-destructive'}>
                        {tx.type.toUpperCase()}
                      </div>
                      <div>{tx.fractions.toLocaleString()} fractions</div>
                      <div>${tx.price.toFixed(3)}</div>
                      <div>${tx.total.toFixed(2)}</div>
                      <div>{tx.timestamp.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No transactions yet for this token.</p>
              )}
            </TabsContent>
            <TabsContent value="holders" className="p-4">
              <h3 className="text-xl font-bold mb-4">Top Holders</h3>
              <p className="text-muted-foreground">
                This token has {token.holders.toLocaleString()} unique holders. The distribution of tokens among holders ensures a fair and decentralized ownership structure.
              </p>
              <div className="mt-6">
                <p className="italic text-muted-foreground text-sm">
                  Detailed holder information will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Buy/Sell interface */}
        <div>
          <BuySellInterface token={token} />
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Token Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span>{token.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Fractions</span>
                  <span>{token.totalFractions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Fractions</span>
                  <span>{token.availableFractions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address</span>
                  <span className="text-xs truncate w-24 text-right">0xaB...1234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
