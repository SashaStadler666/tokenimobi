
import { motion } from "framer-motion";
import { Wallet, Shield, ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConnectWallet from "@/components/ConnectWallet";

const ComoFuncionaConecteCarteira = () => {
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
                <Wallet className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Conecte sua Carteira</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O último passo para investir é conectar sua carteira digital, que permitirá 
              a compra, armazenamento e gestão dos seus tokens imobiliários
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
                  <Wallet className="text-accent mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">O que é uma Carteira Digital?</h3>
                </div>
                <p className="text-muted-foreground">
                  Uma carteira digital (wallet) é um software que permite armazenar, enviar e 
                  receber ativos digitais como tokens imobiliários. Ela funciona como uma 
                  conta bancária digital para seus investimentos em blockchain.
                </p>
                <h4 className="font-medium mt-4">Carteiras Compatíveis:</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>MetaMask (mais popular)</li>
                  <li>Coinbase Wallet</li>
                  <li>Trust Wallet</li>
                  <li>WalletConnect</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Shield className="text-accent mr-2 h-5 w-5" />
                  <h3 className="text-xl font-bold">Segurança da sua Carteira</h3>
                </div>
                <p className="text-muted-foreground">
                  A segurança dos seus ativos digitais depende da proteção da sua carteira. 
                  Sempre siga estas recomendações:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Nunca compartilhe sua frase de recuperação (seed phrase)</li>
                  <li>Ative a autenticação de dois fatores quando disponível</li>
                  <li>Verifique sempre os endereços antes de confirmar transações</li>
                  <li>Considere o uso de carteiras físicas (hardware wallets) para maior segurança</li>
                  <li>Mantenha o software da sua carteira sempre atualizado</li>
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
                <h3 className="text-xl font-bold mb-4">Como Conectar sua Carteira</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Passos para Conectar:</h4>
                    <ol className="text-sm space-y-3 pl-5 list-decimal text-muted-foreground">
                      <li>Instale uma carteira digital compatível (ex: MetaMask)</li>
                      <li>Crie ou importe sua conta na carteira</li>
                      <li>Adicione fundos à sua carteira (podem ser necessários para taxas de transação)</li>
                      <li>Clique no botão "Conectar Carteira" abaixo ou no cabeçalho do site</li>
                      <li>Selecione sua carteira na lista de opções</li>
                      <li>Aprove a conexão na janela pop-up da sua carteira</li>
                    </ol>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center space-y-6">
                    <div className="bg-secondary/30 p-4 rounded-md">
                      <div className="flex items-start">
                        <Info className="text-primary h-5 w-5 mr-2 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          Ao conectar sua carteira, você poderá comprar tokens imediatamente. 
                          Sua carteira só será usada quando você confirmar uma transação.
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-48">
                      <ConnectWallet />
                    </div>
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
              <Link to="/como-funciona/simule-investimento" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar: Simulação de Investimento
              </Link>
            </Button>
            
            <Button size="lg" className="button-glow">
              <Link to="/tokens" className="flex items-center">
                Ver Imóveis Disponíveis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaConecteCarteira;
