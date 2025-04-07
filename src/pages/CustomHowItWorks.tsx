
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building, Wallet, ChartBar, ArrowRight, 
  Coins, Lock, ShieldCheck, BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const CustomHowItWorks = () => {
  // Animation variants
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

  // Process steps data
  const processSteps = [
    {
      title: "Escolha um imóvel",
      description: "Navegue pelo catálogo de imóveis tokenizados e selecione o que melhor se adequa ao seu perfil de investimento.",
      icon: Building,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Conecte sua carteira",
      description: "Utilize sua carteira digital blockchain para uma conexão segura e transparente com a plataforma.",
      icon: Wallet,
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Compre frações",
      description: "Adquira a quantidade de tokens que desejar, a partir de apenas R$1.000 por fração.",
      icon: Coins,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Receba rendimentos",
      description: "Acompanhe o desempenho e receba rendimentos proporcionais às suas frações automaticamente.",
      icon: ChartBar,
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Venda quando quiser",
      description: "Tenha a liberdade de vender suas frações no marketplace quando desejar, com liquidez facilitada.",
      icon: BarChart2,
      color: "bg-primary/10 text-primary"
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: "Baixo valor de entrada",
      description: "Comece a investir com apenas R$1.000, democratizando o acesso ao mercado imobiliário para todos.",
      icon: Coins,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "100% Digital",
      description: "Todo o processo de investimento é realizado online, sem burocracia e com total transparência.",
      icon: Lock,
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Segurança Blockchain",
      description: "Tecnologia blockchain garante a imutabilidade dos registros e a segurança jurídica da propriedade tokenizada.",
      icon: ShieldCheck,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Liquidez Facilitada",
      description: "Venda suas frações no marketplace quando desejar, com liquidez muito superior aos investimentos imobiliários tradicionais.",
      icon: BarChart2,
      color: "bg-accent/10 text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Tokenize sua visão.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Descubra como investir em imóveis digitais com segurança, liquidez e acessibilidade.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <Button size="lg" className="button-glow px-8 py-6 text-lg" asChild>
              <Link to="/tokens" className="flex items-center">
                Ver Tokens Disponíveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Tokenization Explanation */}
      <motion.section 
        className="py-20 bg-muted/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <motion.div 
              className="md:w-1/3 text-center md:text-left"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-block rounded-full p-6 bg-primary/10 mb-6">
                <motion.div 
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <span className="text-5xl">💡</span>
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-4">O que é Tokenização?</h2>
            </motion.div>
            
            <div className="md:w-2/3">
              <ul className="space-y-5">
                <motion.li 
                  className="flex items-start gap-3"
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                >
                  <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary mt-0.5">
                    <span className="text-sm font-medium text-primary-foreground">1</span>
                  </div>
                  <p className="text-lg">
                    É a divisão digital de um imóvel em tokens que representam frações da propriedade.
                  </p>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary mt-0.5">
                    <span className="text-sm font-medium text-primary-foreground">2</span>
                  </div>
                  <p className="text-lg">
                    Cada token possui valor proporcional e representa direitos reais sobre o imóvel.
                  </p>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary mt-0.5">
                    <span className="text-sm font-medium text-primary-foreground">3</span>
                  </div>
                  <p className="text-lg">
                    A tecnologia blockchain garante transparência, segurança e rastreabilidade em todas as transações.
                  </p>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary mt-0.5">
                    <span className="text-sm font-medium text-primary-foreground">4</span>
                  </div>
                  <p className="text-lg">
                    Você pode comprar, vender ou transferir suas frações digitalmente a qualquer momento.
                  </p>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Process Steps (Timeline) */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-5xl">🪜</span>
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Etapas do Processo
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              O caminho para o investimento imobiliário tokenizado é simples e transparente
            </p>
          </div>
          
          {/* Process Steps Timeline */}
          <div className="relative">
            {/* The central line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-primary/30 -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.title}
                  className={`flex flex-col md:flex-row md:items-center gap-8 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  variants={fadeIn}
                  custom={(index + 1) * 0.2}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  {/* Step Icon/Number */}
                  <div className="flex-1 flex md:justify-center">
                    <motion.div 
                      className={`z-10 relative rounded-full p-4 ${step.color} md:absolute md:left-1/2 md:-translate-x-1/2`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>
                  </div>

                  {/* Step Content */}
                  <motion.div 
                    className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border border-border hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Infographic Visual */}
      <motion.section 
        className="py-20 bg-muted/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              O Processo Simplificado
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Compreenda visualmente como funciona a tokenização imobiliária
            </p>
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto relative py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Circular Infographic */}
            <div className="hidden md:block absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full border-2 border-dashed border-primary/30 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                className="absolute inset-2 rounded-full border-2 border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Property Tokenization */}
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full p-5 bg-primary/10 text-primary mb-4">
                      <Building className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Imóvel Original</h3>
                    <p className="text-muted-foreground">
                      Propriedade física é avaliada e dividida em tokens digitais
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Blockchain Security */}
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full p-5 bg-accent/10 text-accent mb-4">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Blockchain</h3>
                    <p className="text-muted-foreground">
                      Contratos inteligentes garantem segurança e rastreabilidade
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Investor Benefits */}
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="rounded-full p-5 bg-primary/10 text-primary mb-4">
                      <Wallet className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Carteira Digital</h3>
                    <p className="text-muted-foreground">
                      Investidores recebem tokens em suas carteiras e direitos proporcionais
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Benefits */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-5xl">💸</span>
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Benefícios da Tokenização
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Vantagens que fazem da tokenização imobiliária o futuro dos investimentos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeIn}
                whileHover={{ y: -10, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`rounded-full p-3 ${benefit.color} mb-6 inline-block`}>
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Final CTA */}
      <motion.section 
        className="py-24 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="inline-block mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-5xl">🚀</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8 max-w-3xl mx-auto">
            Comece agora sua jornada no mercado imobiliário digital
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de investidores que já transformaram a maneira de investir em imóveis
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="lg" className="button-glow px-8 py-6 text-lg" asChild>
              <Link to="/tokens" className="flex items-center">
                Investir Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default CustomHowItWorks;
