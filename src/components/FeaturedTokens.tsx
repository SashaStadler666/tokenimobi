
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenCard from "./TokenCard";
import { mockTokens, Token } from "@/lib/mockData";
import { TrendingUp, Home, Building, MapPin, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface FilterValues {
  location?: string;
  propertyType?: string;
  minYield?: number;
  size?: string;
  productivityType?: string;
}

const FeaturedTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [propertyTypeTab, setPropertyTypeTab] = useState("urbano");
  const [showFilters, setShowFilters] = useState(false);
  
  const urbanForm = useForm<FilterValues>({
    defaultValues: {
      location: "",
      propertyType: "",
      minYield: undefined,
    }
  });

  const ruralForm = useForm<FilterValues>({
    defaultValues: {
      location: "",
      size: "",
      productivityType: "",
    }
  });

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
          <p className="text-muted-foreground">Invista em imóveis urbanos e rurais com alto potencial de valorização e renda</p>
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
        <div className="flex justify-between items-center mb-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="urbano">Urbano</TabsTrigger>
            <TabsTrigger value="rural">Rural</TabsTrigger>
          </TabsList>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-muted">
            {propertyTypeTab === "urbano" ? (
              <Form {...urbanForm}>
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField
                    control={urbanForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade, Estado" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={urbanForm.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Imóvel</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apartamento">Apartamento</SelectItem>
                            <SelectItem value="Casa">Casa</SelectItem>
                            <SelectItem value="Comercial">Comercial</SelectItem>
                            <SelectItem value="Flat">Flat</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={urbanForm.control}
                    name="minYield"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rendimento Mínimo (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 6" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <Form {...ruralForm}>
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField
                    control={ruralForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                          <Input placeholder="Estado, Região" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={ruralForm.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tamanho (hectares)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tamanho" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Até 100</SelectItem>
                            <SelectItem value="medium">100-500</SelectItem>
                            <SelectItem value="large">500-1000</SelectItem>
                            <SelectItem value="xlarge">Acima de 1000</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={ruralForm.control}
                    name="productivityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Produção</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cattle">Pecuária</SelectItem>
                            <SelectItem value="crops">Agricultura</SelectItem>
                            <SelectItem value="mixed">Misto</SelectItem>
                            <SelectItem value="forestry">Florestal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </div>
        )}

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
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
        <p className="text-center text-muted-foreground max-w-lg">
          Escolha entre oportunidades em grandes centros ou propriedades rurais com alto potencial produtivo. 
          Diversifique sua carteira com segurança, em qualquer tipo de solo.
        </p>
        <Button variant="outline" className="button-glow whitespace-nowrap">
          Ver Todos os Imóveis
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTokens;
