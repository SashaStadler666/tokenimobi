import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { toast } from "sonner";

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

  const handleDownloadTerms = () => {
    // In a real application, this would be a link to a real PDF
    // This is just a simulation for the demo
    toast.success("Baixando termos de uso...");
    // Normally you'd have something like:
    // window.open("/documents/termos-de-uso.pdf", "_blank");
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
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleDownloadTerms} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
