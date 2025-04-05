
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "./TokenCard";
import { mockTokens, Token } from "@/lib/mockData";
import { TrendingUp, ArrowUpDown, Flame } from "lucide-react";

const FeaturedTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    // Filter and sort tokens based on active tab
    const getTokens = () => {
      switch(activeTab) {
        case "trending":
          return [...mockTokens].sort((a, b) => b.volume24h - a.volume24h).slice(0, 6);
        case "gainers":
          return [...mockTokens].sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 6);
        case "new":
          return [...mockTokens].slice(0, 6); // Just a mock, in reality would be sorted by listing date
        default:
          return mockTokens.slice(0, 6);
      }
    };
    
    setTokens(getTokens());
  }, [activeTab]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Featured Tokens</h2>
          <p className="text-muted-foreground">Discover curated fractional tokens with high potential</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="trending" className="flex items-center">
              <Flame className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="gainers" className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Top Gainers</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center">
              <ArrowUpDown className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Newest</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline" className="button-glow">
          View All Tokens
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTokens;
