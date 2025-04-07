
import { Link } from "react-router-dom";
import { Token } from "@/lib/models";
import { Button } from "@/components/ui/button";
import TokenCard from "@/components/tokens/TokenCard";
import { motion } from "framer-motion";

interface CheapestTokenDisplayProps {
  tokens: Token[];
}

const CheapestTokenDisplay = ({ tokens }: CheapestTokenDisplayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {tokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="col-span-full md:col-span-1 lg:col-span-1"
            >
              <div className="p-4 border rounded-lg bg-accent/5">
                <div className="mb-2 text-lg font-semibold text-accent">Melhor opção para investimento</div>
                <TokenCard token={token} showWholePrice={token.isWholeProperty} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg bg-muted">
          <p className="text-xl font-semibold mb-2">Nenhum token encontrado</p>
          <p className="text-muted-foreground">Não encontramos tokens com preço a partir de R$ 1.000,00</p>
          <Link to="/tokens">
            <Button variant="outline" className="mt-4">Ver todos os tokens</Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CheapestTokenDisplay;
