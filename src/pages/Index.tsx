
import FeaturedTokens from "@/components/FeaturedTokens";
import MarketOverview from "@/components/MarketOverview";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Index = () => {
  const howItWorksRef = useRef<HTMLElement>(null);
  
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Seção de introdução */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Invista em Imóveis Tokenizados
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Invista a partir de <strong>R$1.000</strong> em imóveis fracionados.
          Participe do mercado imobiliário com liquidez, transparência e segurança blockchain.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="button-glow" onClick={scrollToHowItWorks}>
            Quero Começar
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Simular Investimento
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <Link to="/termos-de-uso" className="flex items-center justify-center hover:text-primary transition-colors">
            <FileText className="h-3 w-3 mr-1" />
            Leia nossos Termos de Uso
          </Link>
        </div>
      </section>
      
      <MarketOverview />
      
      {/* Componente "Como Funciona" */}
      <section ref={howItWorksRef}>
        <HowItWorks />
      </section>
      
      {/* Card explicativo sobre tokenização */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-secondary/30 border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">O que é Tokenização Imobiliária?</h3>
                <p className="text-muted-foreground">
                  É a divisão de um imóvel em tokens digitais que representam frações da propriedade,
                  permitindo investimento parcial sem a necessidade de comprar o imóvel inteiro.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Benefícios</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Acesso democrático ao mercado imobiliário</li>
                  <li>• Baixo valor de entrada e alta liquidez</li>
                  <li>• Divisão de rendimentos proporcionais</li>
                  <li>• Valorização do capital com segurança</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Como Investir</h3>
                <p className="text-muted-foreground">
                  Escolha um imóvel, defina quantas frações deseja adquirir, faça o pagamento
                  e acompanhe seus rendimentos. Você pode vender suas frações a qualquer momento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <FeaturedTokens />
    </div>
  );
};

export default Index;
