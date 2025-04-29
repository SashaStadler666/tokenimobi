
import { Token } from "@/lib/models";
import TokenCard from "@/components/tokens/TokenCard";
import { motion } from "framer-motion";

interface TokenGridProps {
  tokens: Token[];
  propertyTypeTab: string;
  acquisitionMode: string;
}

const TokenGrid = ({ tokens, propertyTypeTab, acquisitionMode }: TokenGridProps) => {
  // Filter tokens by property type
  // Special handling for K tokens: always include them in urban properties
  const urbanTokens = tokens.filter(t => 
    t.propertyType === "Apartamento" || 
    t.propertyType === "Casa" || 
    t.propertyType === "Flat" ||
    t.propertyType === "Comercial" ||
    t.propertyType === "Industrial" ||
    t.propertyType === "Institucional"  // Make sure Institucional type is included
  );
  
  const ruralTokens = tokens.filter(t => 
    t.propertyType === "Terreno" || 
    t.propertyType === "Fazenda" ||
    t.propertyType === "Rural"
  );
  
  // Select tokens based on property type
  const filteredByPropertyType = propertyTypeTab === "urbano" ? urbanTokens : ruralTokens;
  
  // ALWAYS include K tokens when showing whole properties or when specifically looking for K tokens
  const filteredTokens = acquisitionMode === "fracionados" 
    ? filteredByPropertyType.filter(t => !t.isWholeProperty && t.symbol !== "K1" && t.symbol !== "K2")
    : filteredByPropertyType.filter(t => t.isWholeProperty || t.symbol === "K1" || t.symbol === "K2");

  console.log("Filtered tokens:", filteredTokens);
  console.log("Total tokens available:", tokens.length);
  console.log("Property type:", propertyTypeTab);
  console.log("Acquisition mode:", acquisitionMode);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token, index) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <TokenCard 
                token={token} 
                showWholePrice={acquisitionMode === "inteiros" || token.symbol === "K1" || token.symbol === "K2"} 
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-muted-foreground">
            Nenhum imóvel {propertyTypeTab === "urbano" ? "urbano" : "rural"} {acquisitionMode === "fracionados" ? "fracionado" : "inteiro"} encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenGrid;
