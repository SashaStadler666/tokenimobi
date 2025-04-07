
import { motion } from "framer-motion";
import { Building, Coins, BarChart3, Users, ArrowRight } from "lucide-react";

const InfoGraphicSection = () => {
  const steps = [
    {
      number: "1",
      title: "Escolha sua propriedade",
      description: "Navegue entre opções urbanas e rurais tokenizadas. Veja detalhes, localização e rentabilidade estimada.",
      icon: Building,
      delay: 0.2,
      color: "bg-primary/10 text-primary"
    },
    {
      number: "2",
      title: "Invista com segurança",
      description: "A partir de R$1.000 você pode adquirir frações tokenizadas registradas em blockchain, com total transparência.",
      icon: Coins,
      delay: 0.4,
      color: "bg-accent/10 text-accent"
    },
    {
      number: "3",
      title: "Acompanhe seus ganhos",
      description: "Veja rendimentos, valorização, histórico de distribuição e negocie suas frações no marketplace quando quiser.",
      icon: BarChart3,
      delay: 0.6,
      color: "bg-primary/10 text-primary"
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
                <step.icon className="w-8 h-8" />
              </div>
              <div className="text-primary text-3xl font-bold mb-3">{step.number}</div>
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
                <Building className="w-6 h-6 text-primary" />
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
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
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
                <Coins className="w-6 h-6 text-accent" />
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
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
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
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Investidores</p>
            </motion.div>

            {/* Seta */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
            </motion.div>

            {/* Item 4: Rendimentos */}
            <motion.div 
              className="flex flex-col items-center bg-background p-4 rounded-xl border border-border z-10"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="rounded-full bg-accent/10 p-3 mb-2">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm font-medium">Rendimentos</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Estatísticas e benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { metric: "R$1.000", label: "Investimento mínimo" },
            { metric: "100%", label: "Transparência blockchain" },
            { metric: "24/7", label: "Negociação no mercado" },
            { metric: "Imediato", label: "Recebimento de rendimentos" },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="p-4 rounded-lg border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="text-2xl font-bold gradient-text">{stat.metric}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default InfoGraphicSection;
