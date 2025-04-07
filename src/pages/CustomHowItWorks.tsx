
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, CircleCheck, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const CustomHowItWorks = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const benefitItems = [
    {
      title: "Acessível",
      description: "Investimento a partir de R$1.000, democratizando o acesso ao mercado imobiliário.",
      icon: DollarSign,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "100% Digital e Legal",
      description: "Processos simplificados e documentação 100% digital com conformidade legal.",
      icon: CircleCheck,
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Segurança Blockchain",
      description: "Registros imutáveis e transparentes garantem a segurança de sua propriedade fracionada.",
      icon: CircleCheck,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Liquidez no Marketplace",
      description: "Possibilidade de vender suas frações no marketplace quando desejar.",
      icon: ArrowRight,
      color: "bg-accent/10 text-accent"
    }
  ];

  const investmentSteps = [
    {
      title: "Escolha o Imóvel ou Terreno",
      description: "Navegue pelo nosso catálogo de imóveis e terras tokenizados e selecione o que melhor se adequa ao seu perfil."
    },
    {
      title: "Conecte sua Carteira Digital",
      description: "Conecte sua carteira digital (wallet) compatível com blockchain para iniciar o processo de aquisição."
    },
    {
      title: "Compre Frações",
      description: "Escolha quantas frações deseja adquirir, a partir de apenas R$1.000, e finalize sua compra de forma segura."
    },
    {
      title: "Receba Rendimentos",
      description: "Acompanhe a valorização e os rendimentos de seus investimentos diretamente no dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.h1 
          className="text-4xl font-bold text-center gradient-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Como Funciona
        </motion.h1>
        <motion.p 
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Entenda o processo de investimento em imóveis tokenizados de forma simples e segura
        </motion.p>
        
        {/* Seção 1 - O que é Tokenização */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-6 flex-col md:flex-row">
            <motion.div 
              className="rounded-full p-6 bg-primary/10 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Lightbulb className="h-12 w-12 text-primary" aria-label="ícone lâmpada" />
            </motion.div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold gradient-text mb-6">O que é Tokenização?</h2>
              
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-center gap-2"
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <p>É a divisão de um imóvel em tokens digitais que representam frações da propriedade.</p>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <p>Permite investimento parcial sem a necessidade de comprar o imóvel inteiro.</p>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2" 
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <p>Cada token representa uma fração legal da propriedade, com os mesmos direitos proporcionais.</p>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <p>A tecnologia blockchain garante a segurança e transparência de todas as transações.</p>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.section>
        
        {/* Seção 2 - Etapas do Investimento */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🪜</span> Etapas do Investimento
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nosso processo é simples e transparente. Veja como funciona:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full border border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-muted text-4xl mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Seção 3 - Benefícios */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">💸</span> Benefícios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A tokenização imobiliária oferece diversas vantagens para investidores:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefitItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${item.color}`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Seção Final - Chamada para Ação */}
        <motion.section 
          className="text-center mb-12 py-12 bg-muted/30 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl">🚀</span> Comece Agora Mesmo
          </h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto mb-8">
            Comece agora mesmo sua jornada de investimento digital.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button size="lg" className="button-glow px-8 py-6 text-lg" asChild>
              <Link to="/tokens" className="flex items-center">
                Ver Tokens Disponíveis
                <ArrowRight className="ml-2 h-5 w-5" aria-label="Seta direita" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomHowItWorks;
