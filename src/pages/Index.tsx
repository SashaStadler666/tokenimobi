
import FeaturedTokens from "@/components/FeaturedTokens";
import MarketOverview from "@/components/MarketOverview";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Seção de introdução */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Invista em Imóveis Tokenizados
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Adquira frações de propriedades imobiliárias de alta qualidade a partir de R$50.
          Diversifique seus investimentos no mercado imobiliário com segurança e liquidez.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="button-glow">
            <Link to="/dashboard">Ver Meu Portfólio</Link>
          </Button>
          <Button size="lg" variant="outline">
            Como Funciona
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      <MarketOverview />
      
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
