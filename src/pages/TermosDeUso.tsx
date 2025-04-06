
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TermosDeUso = () => {
  const [accepted, setAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    localStorage.setItem("termsAccepted", "true");
    toast.success("Termos aceitos com sucesso!");
    
    // Add a small delay for the animation and toast to be visible
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-28">
        <PageHeader 
          title="Termos de Uso" 
          description="Leia atentamente os nossos termos antes de utilizar a plataforma."
        />
        
        <motion.div
          className="bg-card rounded-lg p-8 shadow-sm mt-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="prose prose-slate max-w-none">
            <h2>Termos e Condições</h2>
            
            <p>Bem-vindo aos termos e condições de uso da plataforma de tokenização de imóveis. Ao utilizar nossa plataforma, você concorda com estes termos. Por favor, leia-os cuidadosamente.</p>
            
            <h3>1. Aceitação dos Termos</h3>
            <p>Ao acessar ou usar nosso serviço, você concorda em cumprir estes termos e todas as leis e regulamentos aplicáveis. Se você não concordar com alguma parte destes termos, você não pode usar nosso serviço.</p>
            
            <h3>2. Mudanças nos Termos</h3>
            <p>Podemos modificar estes termos a qualquer momento. É sua responsabilidade verificar periodicamente se houve alterações. O uso continuado do serviço após a publicação de alterações constitui aceitação dessas alterações.</p>
            
            <h3>3. Descrição do Serviço</h3>
            <p>Nossa plataforma permite a tokenização de ativos imobiliários, permitindo que usuários invistam em frações de imóveis através de tokens digitais. Nossos serviços estão sujeitos a mudanças sem aviso prévio.</p>
            
            <h3>4. Elegibilidade</h3>
            <p>Para usar nossos serviços, você deve ter pelo menos 18 anos e ter a capacidade legal para celebrar contratos vinculativos. Ao usar nosso serviço, você declara e garante que atende a esses requisitos.</p>
            
            <h3>5. Contas e Registros</h3>
            <p>Ao criar uma conta, você deve fornecer informações precisas e completas. Você é responsável por manter a confidencialidade de sua conta e senha, e concorda em aceitar a responsabilidade por todas as atividades que ocorrem em sua conta.</p>
            
            <h3>6. Riscos de Investimento</h3>
            <p>Os investimentos em tokens imobiliários envolvem riscos. Os valores dos ativos podem flutuar e você pode perder parte ou todo o seu investimento. Você deve considerar cuidadosamente sua situação financeira e buscar aconselhamento profissional antes de investir.</p>
            
            <h3>7. Privacidade e Proteção de Dados</h3>
            <p>Nossa política de privacidade descreve como coletamos, usamos e protegemos suas informações pessoais. Ao usar nosso serviço, você concorda com nossa política de privacidade.</p>
            
            <h3>8. Limitação de Responsabilidade</h3>
            <p>Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou por qualquer perda de lucros ou receitas, seja direta ou indiretamente, ou por qualquer perda de dados, uso, ágio ou outras perdas intangíveis.</p>
            
            <h3>9. Lei Aplicável</h3>
            <p>Estes termos são regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições de conflito de leis.</p>
            
            <h3>10. Contato</h3>
            <p>Se você tiver alguma dúvida sobre estes termos, entre em contato conosco pelo e-mail: contato@tokenização.com.br</p>
          </div>
          
          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept" 
                checked={accepted} 
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setAccepted(checked);
                  }
                }}
              />
              <label 
                htmlFor="accept" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Eu li e concordo com os Termos de Uso e Política de Privacidade
              </label>
            </div>
            
            <Button 
              onClick={handleAccept} 
              disabled={!accepted}
              className="w-full sm:w-auto"
            >
              Aceitar Termos
            </Button>
          </div>
          
          <div className="mt-8 pt-4 border-t text-sm text-muted-foreground text-center">
            <p>Investimentos envolvem riscos. Leia os documentos com atenção.</p>
          </div>
        </motion.div>
      </div>
      
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a entrar nesse mundo maravilhoso de tokenização e responsabilidade. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Sim, estou pronto!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TermosDeUso;
