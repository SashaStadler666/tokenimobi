
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Check } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const getImageForType = (type) => {
  switch (type?.toLowerCase()) {
    case "apartamento":
      return "https://images.unsplash.com/photo-1598928506311-f4fe0afa1bd6";
    case "casa":
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
    case "flat":
      return "https://images.unsplash.com/photo-1599423300746-b62533397364";
    case "rural":
    case "fazenda":
    case "agro":
      return "https://images.unsplash.com/photo-1566438480900-0609be27a4be";
    default:
      return "https://images.unsplash.com/photo-1501183638710-841dd1904471";
  }
};

export default function TermosDeUso() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  useEffect(() => {
    // Check if terms have already been accepted
    const accepted = localStorage.getItem("termosAceitos") === "true";
    setTermsAccepted(accepted);
  }, []);

  const handleDownloadTerms = () => {
    // In a real application, this would be a link to a real PDF
    // This is just a simulation for the demo
    toast.success("Baixando termos de uso...");
    // Normally you'd have something like:
    // window.open("/documents/termos-de-uso.pdf", "_blank");
  };
  
  const handleAcceptTerms = () => {
    localStorage.setItem("termosAceitos", "true");
    setTermsAccepted(true);
    toast.success("Termos aceitos com sucesso!");
  };
  
  const handleContinue = () => {
    // Redirect to the previous page or home
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const examplePropertyTypes = ["Apartamento", "Casa", "Flat", "Fazenda"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-5xl px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a Página Inicial
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full">
        {examplePropertyTypes.map((type, index) => (
          <motion.img
            key={index}
            src={getImageForType(type)}
            alt={`Exemplo de propriedade: ${type}`}
            loading="lazy"
            className="w-full h-48 object-cover rounded-lg shadow"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <Card className="max-w-3xl w-full border shadow-xl">
        <CardHeader>
          <CardTitle>Termos de Uso</CardTitle>
          <CardDescription>
            Leia os termos com atenção antes de continuar utilizando a plataforma Token Imobi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScrollArea className="h-64 p-2 border rounded-md bg-muted/10">
            <div className="text-sm space-y-4">
              <p>
                A plataforma Token Imobi atua como intermediadora tecnológica e não realiza oferta pública de valores mobiliários. O uso do sistema exige validação de identidade e está em conformidade com as diretrizes da LGPD.
              </p>
              <p>
                O usuário reconhece que investimentos em propriedades tokenizadas estão sujeitos a riscos, incluindo, mas não se limitando a, baixa liquidez, variações de mercado e especificidades regulatórias sobre imóveis urbanos e rurais.
              </p>
              <p>
                Propriedades do tipo agro (fazendas, áreas de cultivo, criação) e urbanas (terrenos para construção civil) possuem características distintas, sendo responsabilidade do investidor verificar os detalhes antes da aquisição de frações.
              </p>
              <p>
                Ao utilizar a plataforma, o usuário assume a responsabilidade por todas as transações e investimentos realizados por meio do sistema, estando ciente de que o mercado imobiliário e de tokens digitais está sujeito a flutuações.
              </p>
              <p>
                A Token Imobi se reserva ao direito de alterar os termos de uso a qualquer momento, sendo responsabilidade do usuário verificar periodicamente as atualizações.
              </p>
              <p>
                Todas as transações realizadas na plataforma são registradas em blockchain e são imutáveis, não podendo ser revertidas pela Token Imobi.
              </p>
            </div>
          </ScrollArea>
          
          <div className="flex flex-col space-y-4">
            {!termsAccepted && (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" onCheckedChange={(checked) => setTermsAccepted(checked === true)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eu li e aceito os termos de uso da plataforma Token Imobi
                </label>
              </div>
            )}
            
            <div className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleDownloadTerms} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
              
              {termsAccepted ? (
                <Button onClick={handleContinue} className="button-glow">
                  <Check className="mr-2 h-4 w-4" />
                  Continuar
                </Button>
              ) : (
                <Button 
                  onClick={handleAcceptTerms} 
                  disabled={!termsAccepted} 
                  className={termsAccepted ? "button-glow" : ""}>
                  Aceitar Termos
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
