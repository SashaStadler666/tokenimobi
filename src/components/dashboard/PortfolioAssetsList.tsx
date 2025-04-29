
import { Token } from "@/lib/models";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioItem {
  token: Token;
  fractions: number;
}

interface PortfolioAssetsListProps {
  urbanCount: number;
  ruralCount: number;
  ownedTokens: Array<PortfolioItem | null>;
}

const PortfolioAssetsList = ({ 
  urbanCount, 
  ruralCount, 
  ownedTokens 
}: PortfolioAssetsListProps) => {
  return (
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
              {urbanCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ownedTokens.map((item, index) => {
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
              {ruralCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ownedTokens.map((item, index) => {
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
  );
};

export default PortfolioAssetsList;
