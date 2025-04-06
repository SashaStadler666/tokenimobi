
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const CustomFAQ = () => {
  return (
    <div className="min-h-screen p-4 pt-20">
      <PageHeader 
        title="Perguntas Frequentes" 
        description="Respostas para as dúvidas mais comuns sobre a plataforma Token Imobi."
      />
      
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Aqui incluiríamos o conteúdo original da página FAQ */}
        <p className="text-center text-muted-foreground">
          Conteúdo das perguntas frequentes será exibido aqui.
        </p>
      </motion.div>
    </div>
  );
};

export default CustomFAQ;
