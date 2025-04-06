
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "./TokenCard";
import { mockTokens, Token } from "@/lib/mockData";
import { TrendingUp, Home, Building, MapPin } from "lucide-react";

const FeaturedTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [propertyTypeTab, setPropertyTypeTab] = useState("urbano");

  useEffect(() => {
    // Filter and sort tokens based on active tab and property type
    const getTokens = () => {
      // First filter by urban/rural property type
      const propertyTypeFiltered = propertyTypeTab === "urbano" 
        ? [...mockTokens].filter(t => 
            t.propertyType === "Apartamento" || 
            t.propertyType === "Casa" || 
            t.propertyType === "Flat" ||
            t.propertyType === "Comercial" ||
            t.propertyType === "Industrial"
          )
        : [...mockTokens].filter(t => 
            t.propertyType === "Terreno" || 
            t.propertyType === "Fazenda" ||
            t.propertyType === "Rural"
          );
      
      // Then apply additional filtering based on active tab
      switch(activeTab) {
        case "residential":
          return propertyTypeFiltered.filter(t => 
            t.propertyType === "Apartamento" || 
            t.propertyType === "Casa" || 
            t.propertyType === "Flat"
          ).slice(0, 6);
        case "commercial":
          return propertyTypeFiltered.filter(t => 
            t.propertyType === "Comercial" || 
            t.propertyType === "Industrial"
          ).slice(0, 6);
        case "performance":
          return propertyTypeFiltered.sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 6);
        case "all":
        default:
          return propertyTypeFiltered.slice(0, 6);
      }
    };
    
    setTokens(getTokens());
  }, [activeTab, propertyTypeTab]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Propriedades em Destaque</h2>
          <p className="text-muted-foreground">Descubra imóveis tokenizados com alto potencial de valorização e renda</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Todos</span>
            </TabsTrigger>
            <TabsTrigger value="residential" className="flex items-center">
              <Home className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Residencial</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center">
              <Building className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Comercial</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Rentabilidade</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs defaultValue="urbano" className="mb-10" onValueChange={setPropertyTypeTab}>
        <TabsList className="w-full sm:w-auto mb-6">
          <TabsTrigger value="urbano">Urbano</TabsTrigger>
          <TabsTrigger value="rural">Rural</TabsTrigger>
        </TabsList>
        <TabsContent value="urbano" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rural" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline" className="button-glow">
          Ver Todos os Imóveis
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTokens;
