import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 pt-20">
      <PageHeader 
        title="Dashboard" 
        description="Bem-vindo ao seu painel de controle da Token Imobi."
      />
      
      {/* Conteúdo do dashboard aqui */}
      <motion.div 
        className="container mx-auto mt-8 p-6 bg-muted/30 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="text-center text-muted-foreground">
          Área em desenvolvimento. Em breve você poderá gerenciar seus tokens e acompanhar seus investimentos.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
