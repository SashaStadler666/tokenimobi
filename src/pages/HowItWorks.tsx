
import Navbar from "@/components/Navbar";
import HowItWorksComponent from "@/components/HowItWorks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, FileText, Lock, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center gradient-text mb-4">Como Funciona</h1>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Entenda o processo de investimento em imóveis tokenizados de forma simples e segura
          </p>
          
          <HowItWorksComponent />
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Perguntas Comuns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2 text-primary" />
                      Preciso de uma carteira digital?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sim, você precisará de uma carteira digital (wallet) compatível com blockchain para comprar, 
                      armazenar e vender seus tokens imobiliários. Não se preocupe, temos um guia simples para ajudá-lo a configurar.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Como funciona a documentação?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cada imóvel tokenizado possui documentação completa verificada e disponível para consulta. 
                      Você pode acessar escrituras, matrículas e todos os documentos relevantes na página do token.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      Quais garantias eu tenho?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Os imóveis são tokenizados através de contratos inteligentes auditados e seguros. 
                      Cada token representa uma fração real do imóvel ou terra, com garantias legais e contratuais.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-primary" />
                      Como recebo meus rendimentos?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Os rendimentos dos imóveis (aluguéis, arrendamentos ou valorização) são distribuídos 
                      proporcionalmente a cada detentor de token, diretamente em sua carteira digital.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Button size="lg" className="button-glow">
                  <Link to="/faq">Ver todas as perguntas frequentes</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
