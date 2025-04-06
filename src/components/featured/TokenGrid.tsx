
import { Token } from "@/lib/models";
import TokenCard from "@/components/TokenCard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface TokenGridProps {
  tokens: Token[];
  propertyTypeTab: string;
}

const TokenGrid = ({ tokens, propertyTypeTab }: TokenGridProps) => {
  return (
    <Tabs value={propertyTypeTab} className="w-full">
      <TabsContent value="urbano" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <TokenCard token={token} />
            </motion.div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="rural" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <TokenCard token={token} />
            </motion.div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TokenGrid;
