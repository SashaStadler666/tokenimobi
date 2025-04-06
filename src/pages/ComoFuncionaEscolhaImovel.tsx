
import { motion } from "framer-motion";
import { Search, MapPin, Building, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ComoFuncionaEscolhaImovel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Search className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Escolha um Imóvel</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O primeiro passo para investir em imóveis tokenizados é escolher a propriedade 
              que melhor se alinha aos seus objetivos financeiros
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-primary mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Localizações Estratégicas</h3>
                </div>
                <p className="text-muted-foreground">
                  Todos os imóveis disponíveis em nossa plataforma estão localizados em áreas 
                  com alto potencial de valorização. Avaliamos fatores como mobilidade, 
                  infraestrutura, desenvolvimento da região e tendências de mercado.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Building className="text-primary mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Diversidade de Opções</h3>
                </div>
                <p className="text-muted-foreground">
                  Nossa plataforma oferece uma variedade de propriedades tokenizadas, incluindo:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Apartamentos residenciais</li>
                  <li>Imóveis comerciais</li>
                  <li>Loteamentos</li>
                  <li>Terras agrícolas</li>
                  <li>Propriedades de alto padrão</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Search className="text-primary mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Filtros Inteligentes</h3>
                </div>
                <p className="text-muted-foreground">
                  Use nossos filtros avançados para refinar sua busca:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Rendimento projetado</li>
                  <li>Tipo de imóvel</li>
                  <li>Localização</li>
                  <li>Valor mínimo de investimento</li>
                  <li>Data de tokenização</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button size="lg" className="button-glow">
              <Link to="/tokens">Explorar Imóveis Disponíveis</Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/como-funciona/analise-dados" className="flex items-center">
                Próximo Passo: Análise de Dados
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaEscolhaImovel;
