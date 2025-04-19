
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedFooter = () => {
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    navigate("/tokens");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
      <p className="text-center text-muted-foreground max-w-lg">
        Escolha entre oportunidades em grandes centros ou propriedades rurais com alto potencial produtivo. 
        Diversifique sua carteira com segurança, em qualquer tipo de solo.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Button 
          variant="outline" 
          className="button-glow whitespace-nowrap flex items-center"
          onClick={handleViewAllClick}
        >
          Ver Todos os Imóveis
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default FeaturedFooter;
