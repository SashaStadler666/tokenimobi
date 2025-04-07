
import { Token } from "@/lib/models";
import TokenCard from "@/components/tokens/TokenCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface TokenGridProps {
  tokens: Token[];
  propertyTypeTab: string;
}

const TokenGrid = ({ tokens, propertyTypeTab }: TokenGridProps) => {
  // Certifique-se de que há tokens para mostrar em cada categoria
  const urbanTokens = tokens.filter(t => 
    t.propertyType === "Apartamento" || 
    t.propertyType === "Casa" || 
    t.propertyType === "Flat" ||
    t.propertyType === "Comercial" ||
    t.propertyType === "Industrial"
  );
  
  const ruralTokens = tokens.filter(t => 
    t.propertyType === "Terreno" || 
    t.propertyType === "Fazenda" ||
    t.propertyType === "Rural"
  );
  
  const urbanWholeTokens = urbanTokens.filter(t => t.isWholeProperty);
  const ruralWholeTokens = ruralTokens.filter(t => t.isWholeProperty);
  
  // Adicione logs para depuração
  console.log('Total tokens:', tokens.length);
  console.log('Urban tokens:', urbanTokens.length);
  console.log('Rural tokens:', ruralTokens.length);

  return (
    <Tabs defaultValue="fracionados" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="fracionados">Fracionados</TabsTrigger>
        <TabsTrigger value="inteiros">Imóveis Inteiros</TabsTrigger>
      </TabsList>
      
      <TabsContent value="fracionados">
        <Tabs value={propertyTypeTab} className="w-full">
          <TabsContent value="urbano" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {urbanTokens.length > 0 ? (
                urbanTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <TokenCard token={token} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum imóvel urbano fracionado encontrado.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="rural" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ruralTokens.length > 0 ? (
                ruralTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <TokenCard token={token} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum imóvel rural fracionado encontrado.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
      
      <TabsContent value="inteiros">
        <Tabs value={propertyTypeTab} className="w-full">
          <TabsContent value="urbano" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {urbanWholeTokens.length > 0 ? (
                urbanWholeTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <TokenCard token={token} showWholePrice={true} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum imóvel urbano inteiro encontrado.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="rural" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ruralWholeTokens.length > 0 ? (
                ruralWholeTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <TokenCard token={token} showWholePrice={true} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  Nenhum imóvel rural inteiro encontrado.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default TokenGrid;
