
import { motion } from "framer-motion";
import { Home, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InfoGraphicSection = () => {
  const steps = [
    {
      icon: Home,
      title: "Escolha sua propriedade",
      description: "Navegue entre opções urbanas e rurais tokenizadas. Veja detalhes, localização e rentabilidade estimada.",
      delay: 0.2,
      color: "bg-primary/10 text-primary",
      ariaLabel: "Ícone casa"
    },
    {
      icon: ShieldCheck,
      title: "Invista com segurança",
      description: "A partir de R$1.000 você pode adquirir frações tokenizadas registradas em blockchain, com total transparência.",
      delay: 0.4,
      color: "bg-accent/10 text-accent",
      ariaLabel: "Ícone segurança"
    },
    {
      icon: TrendingUp,
      title: "Acompanhe seus ganhos",
      description: "Veja rendimentos, valorização, histórico de distribuição e negocie suas frações no marketplace quando quiser.",
      delay: 0.6,
      color: "bg-primary/10 text-primary",
      ariaLabel: "Ícone crescimento"
    }
  ];

  return (
    <section className="py-20 px-4">
      <motion.div 
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Como Funciona a Tokenização Imobiliária</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Entenda de forma simples como investir em imóveis com tecnologia blockchain a partir de R$1.000.
        </p>

        {/* Cards de steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className={`rounded-full p-3 ${step.color} w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                <step.icon className="w-8 h-8" aria-label={step.ariaLabel} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Infográfico de fluxo */}
        <motion.div 
          className="relative p-8 rounded-xl border border-border bg-secondary/30 mb-10 hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="flex justify-between items-center relative">
            {/* Linha conectando os itens */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent -z-10"></div>
            
            {/* Item 1: Imóvel */}
            <motion.div 
              className="flex flex-col items-center bg-background p-4 rounded-xl border border-border z-10"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <Home className="w-6 h-6 text-primary" aria-label="Ícone casa" />
              </div>
              <p className="text-sm font-medium">Propriedade</p>
            </motion.div>

            {/* Seta */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <ArrowRight className="w-6 h-6 text-muted-foreground" aria-label="Seta para direita" />
            </motion.div>

            {/* Item 2: Tokenização */}
            <motion.div 
              className="flex flex-col items-center bg-background p-4 rounded-xl border border-border z-10"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="rounded-full bg-accent/10 p-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-accent" aria-label="Ícone segurança" />
              </div>
              <p className="text-sm font-medium">Tokenização</p>
            </motion.div>

            {/* Seta */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <ArrowRight className="w-6 h-6 text-muted-foreground" aria-label="Seta para direita" />
            </motion.div>

            {/* Item 3: Investidores */}
            <motion.div 
              className="flex flex-col items-center bg-background p-4 rounded-xl border border-border z-10"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" aria-label="Ícone crescimento" />
              </div>
              <p className="text-sm font-medium">Investidores</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Botão de call to action */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button size="lg" className="button-glow" asChild>
            <Link to="/tokens" className="flex items-center">
              Comece a Investir Agora
              <ArrowRight className="ml-2 h-4 w-4" aria-label="Seta para direita" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoGraphicSection;
