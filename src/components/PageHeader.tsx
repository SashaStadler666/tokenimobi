
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  backTo = "/", 
  backLabel = "Voltar para a Página Inicial" 
}: PageHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="mb-8 container mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button 
        variant="ghost" 
        onClick={() => navigate(backTo)}
        className="mb-4 hover:bg-primary/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </motion.div>
  );
};

export default PageHeader;
