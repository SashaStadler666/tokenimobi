
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center gradient-text mb-4">Perguntas Frequentes</h1>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Encontre respostas para as dúvidas mais comuns sobre tokenização imobiliária
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="col-span-1 md:col-span-3 bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle>Investimento em Tokens Imobiliários</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>O que é tokenização imobiliária?</AccordionTrigger>
                    <AccordionContent>
                      Tokenização imobiliária é o processo de converter a propriedade de um imóvel físico em tokens 
                      digitais na blockchain. Cada token representa uma fração do imóvel, permitindo que múltiplos 
                      investidores possuam partes da mesma propriedade com todos os direitos proporcionais.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Qual o valor mínimo para investir?</AccordionTrigger>
                    <AccordionContent>
                      O valor mínimo para investir em nossos tokens imobiliários é de R$1.000. Este valor permite que 
                      você adquira frações de imóveis de alto padrão, tanto urbanos quanto rurais, com potencial de 
                      valorização e geração de rendimentos proporcionais à sua participação.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Como funciona a liquidez dos tokens?</AccordionTrigger>
                    <AccordionContent>
                      Os tokens imobiliários podem ser negociados no mercado secundário a qualquer momento, 
                      oferecendo liquidez superior a investimentos imobiliários tradicionais. Você pode vender 
                      suas frações quando desejar, sem depender da venda integral do imóvel.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle>Imóveis Urbanos</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="urban-1">
                    <AccordionTrigger>Que tipos de imóveis urbanos estão disponíveis?</AccordionTrigger>
                    <AccordionContent>
                      Nosso portfólio inclui apartamentos, salas comerciais, lojas, galpões e edifícios completos 
                      em localizações estratégicas com potencial de valorização. Cada imóvel passa por rigorosa 
                      avaliação técnica e jurídica antes de ser tokenizado.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="urban-2">
                    <AccordionTrigger>Como são distribuídos os rendimentos de aluguéis?</AccordionTrigger>
                    <AccordionContent>
                      Os rendimentos provenientes de aluguéis são distribuídos proporcionalmente entre os 
                      detentores de tokens, de acordo com sua participação. Os pagamentos são realizados 
                      mensalmente diretamente em sua carteira digital ou conta bancária.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle>Terras Rurais</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="rural-1">
                    <AccordionTrigger>Como funciona o investimento em terras rurais?</AccordionTrigger>
                    <AccordionContent>
                      O investimento em tokens de terras rurais permite que você seja proprietário de frações 
                      de propriedades agrícolas produtivas. Os rendimentos podem vir de arrendamentos para produção, 
                      cultivo direto ou valorização da terra ao longo do tempo.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="rural-2">
                    <AccordionTrigger>Quais culturas e atividades são desenvolvidas nas terras tokenizadas?</AccordionTrigger>
                    <AccordionContent>
                      Nossas terras rurais tokenizadas abrangem diversas culturas, como soja, milho, café, 
                      cana-de-açúcar, além de atividades como pecuária e silvicultura. Cada token específica 
                      claramente a atividade produtiva da terra e suas projeções de rendimento.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle>Aspectos Legais</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="legal-1">
                    <AccordionTrigger>Como é garantida a segurança jurídica dos tokens?</AccordionTrigger>
                    <AccordionContent>
                      Todos os imóveis tokenizados possuem documentação legal completa e são vinculados a 
                      sociedades de propósito específico (SPEs) que garantem os direitos dos investidores. 
                      Os contratos inteligentes na blockchain registram de forma imutável a propriedade fracionada.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="legal-2">
                    <AccordionTrigger>Quais impostos incidem sobre os rendimentos e transações?</AccordionTrigger>
                    <AccordionContent>
                      Os rendimentos de tokens imobiliários seguem a tributação de renda imobiliária tradicional, 
                      com alíquotas entre 15% e 22,5% dependendo do prazo. As transações de compra e venda no 
                      mercado secundário podem estar sujeitas a imposto sobre ganho de capital.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-12">
            <Link to="/tokens">
              <Button size="lg" className="button-glow">
                Ver Imóveis Disponíveis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
