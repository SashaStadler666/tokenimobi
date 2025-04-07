
import { Token } from "@/lib/models";
import TokenCard from "@/components/tokens/TokenCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";

interface TokenGridProps {
  tokens: Token[];
  propertyTypeTab: string;
}

const TokenGrid = ({ tokens, propertyTypeTab }: TokenGridProps) => {
  const [acquisitionMode, setAcquisitionMode] = useState<string>("fracionados");

  // Filter tokens by property type
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
  
  // Further filter by acquisition mode (whole property or fractions)
  const urbanWholeTokens = urbanTokens.filter(t => t.isWholeProperty);
  const urbanFractionTokens = urbanTokens.filter(t => !t.isWholeProperty);
  const ruralWholeTokens = ruralTokens.filter(t => t.isWholeProperty);
  const ruralFractionTokens = ruralTokens.filter(t => !t.isWholeProperty);
  
  return (
    <div className="space-y-6">
      <Tabs value={acquisitionMode} onValueChange={setAcquisitionMode} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="fracionados">Fracionados</TabsTrigger>
          <TabsTrigger value="inteiros">Imóveis Inteiros</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fracionados">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypeTab === "urbano" ? (
              urbanFractionTokens.length > 0 ? (
                urbanFractionTokens.map((token, index) => (
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
              )
            ) : (
              ruralFractionTokens.length > 0 ? (
                ruralFractionTokens.map((token, index) => (
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
              )
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="inteiros">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypeTab === "urbano" ? (
              urbanWholeTokens.length > 0 ? (
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
              )
            ) : (
              ruralWholeTokens.length > 0 ? (
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
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenGrid;
