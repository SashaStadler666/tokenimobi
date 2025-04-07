
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BarChart3, Wallet, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Escolha um imóvel",
    description: "Navegue pelo nosso catálogo de propriedades urbanas e rurais tokenizadas e selecione a que melhor se adequa ao seu perfil de investimento.",
    icon: Search,
    color: "bg-primary/10 text-primary",
    link: "/como-funciona/escolha-imovel"
  },
  {
    title: "Analise os dados",
    description: "Veja o histórico de valorização, documentação e detalhes sobre o rendimento projetado para cada fração do imóvel.",
    icon: BarChart3,
    color: "bg-accent/10 text-accent",
    link: "/como-funciona/analise-dados"
  },
  {
    title: "Simule seu investimento",
    description: "Defina quanto deseja investir (a partir de R$1.000) e veja a projeção de rendimentos ao longo do tempo.",
    icon: TrendingUp,
    color: "bg-primary/10 text-primary",
    link: "/como-funciona/simule-investimento"
  },
  {
    title: "Conecte sua carteira",
    description: "Conecte sua carteira digital para finalizar seu investimento com segurança através da tecnologia blockchain.",
    icon: Wallet,
    color: "bg-accent/10 text-accent",
    link: "/como-funciona/conecte-carteira"
  }
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold gradient-text mb-4">Como Funciona</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Investir em imóveis tokenizados é simples, seguro e acessível para todos. Siga estas etapas para começar:
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link to={step.link}>
              <Card className="border border-border hover:border-primary/40 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`rounded-full p-3 mb-4 ${step.color}`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Button size="lg" className="button-glow" asChild>
            <Link to="/como-funciona" className="flex items-center">
              Ver Mais Detalhes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
