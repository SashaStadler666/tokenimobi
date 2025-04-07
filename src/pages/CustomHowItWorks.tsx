
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Home, Trees, FileText, ShieldCheck, BarChart3, Wallet, UserRound } from "lucide-react";
import HowItWorksComponent from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const CustomHowItWorks = () => {
  const steps = [
    {
      icon: Building,
      title: "Seleção de Imóveis",
      description: "Nossa equipe de especialistas seleciona meticulosamente propriedades urbanas e rurais com alto potencial de valorização e rendimento.",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "Tokenização",
      description: "O imóvel passa por uma rigorosa auditoria legal e é convertido em tokens digitais, cada um representando uma fração do valor total do ativo.",
      color: "text-accent"
    },
    {
      icon: ShieldCheck,
      title: "Segurança Jurídica",
      description: "Todos os contratos inteligentes são auditados e garantem a segurança da propriedade fracional, com respaldo jurídico completo.",
      color: "text-primary"
    },
    {
      icon: Wallet,
      title: "Acessibilidade",
      description: "Investidores podem adquirir frações a partir de valores acessíveis, democratizando o acesso ao mercado imobiliário.",
      color: "text-accent"
    },
    {
      icon: BarChart3,
      title: "Rentabilidade",
      description: "Os tokens geram rendimentos a partir de aluguéis, arrendamentos ou valorização do imóvel, distribuídos proporcionalmente.",
      color: "text-primary"
    },
    {
      icon: UserRound,
      title: "Liquidez",
      description: "Os tokens podem ser negociados a qualquer momento em nosso marketplace, oferecendo mais liquidez que investimentos imobiliários tradicionais.",
      color: "text-accent"
    }
  ];

  const categories = [
    {
      icon: Home,
      title: "Imóveis Urbanos",
      description: "Apartamentos, casas e propriedades comerciais em localizações estratégicas com alto potencial de valorização.",
      color: "bg-primary/10"
    },
    {
      icon: Trees,
      title: "Propriedades Rurais",
      description: "Fazendas produtivas, terras para cultivo e áreas de preservação ambiental com rendimentos de arrendamento ou exploração sustentável.",
      color: "bg-accent/10"
    }
  ];

  return (
    <div className="min-h-screen p-4 pt-20">
      <PageHeader 
        title="Como Funciona" 
        description="Entenda como funciona o processo de tokenização de imóveis na Token Imobi."
      />
      
      {/* Adicionado o componente HowItWorks aqui */}
      <HowItWorksComponent />
      
      <motion.div 
        className="container mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold gradient-text mb-4">Processo de Tokenização</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Transformamos ativos imobiliários em tokens digitais, permitindo que você invista 
            em frações de imóveis de alta qualidade sem a burocracia tradicional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`rounded-full p-3 ${step.color} bg-muted/50 mb-4`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold gradient-text mb-4">Categorias de Ativos</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Oferecemos diferentes categorias de imóveis tokenizados para atender a diversos perfis de investidores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className={`border ${index % 2 === 0 ? 'border-primary/20' : 'border-accent/20'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${category.color}`}>
                      <category.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="rounded-lg bg-muted/30 p-6 border border-border">
          <h3 className="text-xl font-semibold mb-4 text-center">Vantagens da Tokenização</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Investimento a partir de pequenos valores</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Maior liquidez comparado a imóveis tradicionais</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Diversificação em diferentes tipos de ativos imobiliários</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Gestão profissional das propriedades</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Transparência total nas transações via blockchain</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full h-6 w-6 bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
              <p>Rendimentos distribuídos automaticamente</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default CustomHowItWorks;
