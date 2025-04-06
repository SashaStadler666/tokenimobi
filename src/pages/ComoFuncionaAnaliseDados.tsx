
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ComoFuncionaAnaliseDados = () => {
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
              <div className="bg-accent/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Analise os Dados</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Antes de investir, é essencial analisar cuidadosamente todos os dados disponíveis 
              sobre o imóvel tokenizado para tomar uma decisão informada
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <TrendingUp className="text-accent mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Histórico de Valorização</h3>
                </div>
                <p className="text-muted-foreground">
                  Cada token imobiliário possui um histórico detalhado de valorização. Analise:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Valor histórico da propriedade nos últimos anos</li>
                  <li>Comparativo com imóveis similares da região</li>
                  <li>Projeção de valorização futura baseada em análises de mercado</li>
                  <li>Impacto de desenvolvimentos urbanos próximos</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <FileText className="text-accent mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Documentação Completa</h3>
                </div>
                <p className="text-muted-foreground">
                  Todos os imóveis tokenizados possuem documentação verificada disponível para análise:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Escritura e matrícula do imóvel</li>
                  <li>Laudos de avaliação por especialistas independentes</li>
                  <li>Certificados de regularidade fiscal</li>
                  <li>Contratos de locação ou arrendamento (quando aplicável)</li>
                  <li>Documentação da tokenização (contratos inteligentes)</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ferramentas de Análise Disponíveis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-md">
                    <h4 className="font-medium mb-2">Gráficos Interativos</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualize o desempenho histórico do imóvel e projeções futuras através 
                      de gráficos dinâmicos e interativos.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-md">
                    <h4 className="font-medium mb-2">Comparador de Tokens</h4>
                    <p className="text-sm text-muted-foreground">
                      Compare diferentes tokens imobiliários lado a lado para identificar 
                      a melhor oportunidade para seu perfil de investimento.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-md">
                    <h4 className="font-medium mb-2">Relatórios Detalhados</h4>
                    <p className="text-sm text-muted-foreground">
                      Acesse relatórios completos sobre o imóvel, incluindo análises técnicas, 
                      jurídicas e financeiras realizadas por especialistas.
                    </p>
                  </div>
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
              <Link to="/como-funciona/escolha-imovel" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar: Escolha de Imóvel
              </Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/como-funciona/simule-investimento" className="flex items-center">
                Próximo: Simulação de Investimento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaAnaliseDados;
