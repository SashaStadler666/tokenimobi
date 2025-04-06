
import { motion } from "framer-motion";
import { TrendingUp, Calculator, BarChart3, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ComoFuncionaSimuleInvestimento = () => {
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
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Simule seu Investimento</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use nossa ferramenta de simulação para visualizar o potencial retorno do seu 
              investimento em tokens imobiliários ao longo do tempo
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border border-border">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-2xl font-bold">Como Funciona a Simulação</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-2">
                        <Calculator className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium">Defina o Valor</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Escolha quanto você deseja investir, começando com o mínimo de R$1.000.
                      Você pode ajustar esse valor de acordo com seu orçamento e objetivos.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium">Visualize Projeções</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Veja gráficos detalhados mostrando o crescimento projetado do seu investimento 
                      ao longo de diferentes períodos: 1, 5 e 10 anos.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium">Compare Cenários</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nossa simulação apresenta três cenários possíveis: conservador, moderado e otimista, 
                      baseados em dados históricos e análises de mercado.
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-6 rounded-lg mt-6">
                  <h4 className="font-bold mb-4">Exemplo de Simulação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Investimento Inicial: R$5.000</h5>
                      <ul className="text-sm space-y-2 pl-5 list-disc text-muted-foreground">
                        <li>Rendimento mensal estimado: R$35 a R$45</li>
                        <li>Rendimento anual estimado: R$420 a R$540</li>
                        <li>Valorização projetada do imóvel: 8% ao ano</li>
                        <li>Valor estimado após 5 anos: R$7.346,64</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Investimento Inicial: R$10.000</h5>
                      <ul className="text-sm space-y-2 pl-5 list-disc text-muted-foreground">
                        <li>Rendimento mensal estimado: R$70 a R$90</li>
                        <li>Rendimento anual estimado: R$840 a R$1.080</li>
                        <li>Valorização projetada do imóvel: 8% ao ano</li>
                        <li>Valor estimado após 5 anos: R$14.693,28</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Nota: Estes são apenas exemplos ilustrativos. Os rendimentos reais 
                    podem variar de acordo com o desempenho do mercado e as características específicas de cada imóvel.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button variant="outline" size="lg">
              <Link to="/como-funciona/analise-dados" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar: Análise de Dados
              </Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/como-funciona/conecte-carteira" className="flex items-center">
                Próximo: Conectar Carteira
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaSimuleInvestimento;
