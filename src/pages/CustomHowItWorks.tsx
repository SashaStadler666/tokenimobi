
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const CustomHowItWorks = () => {
  return (
    <div className="min-h-screen p-4 pt-20">
      <PageHeader 
        title="Como Funciona" 
        description="Entenda como funciona o processo de tokenização de imóveis na Token Imobi."
      />
      
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Aqui incluiríamos o conteúdo original da página HowItWorks */}
        <p className="text-center text-muted-foreground">
          Conteúdo explicativo sobre como funciona a plataforma será exibido aqui.
        </p>
      </motion.div>
    </div>
  );
};

export default CustomHowItWorks;
