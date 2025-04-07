
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TokensPageHeaderProps {
  title: string;
  description: string;
}

const TokensPageHeader = ({ title, description }: TokensPageHeaderProps) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default TokensPageHeader;
