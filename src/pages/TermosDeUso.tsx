
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

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
  const [aceito, setAceito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accepted = localStorage.getItem("termosAceitos");
    if (accepted) {
      setAceito(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termosAceitos", "true");
    setAceito(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  if (aceito) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-success">Termos aceitos com sucesso!</h2>
      </div>
    );
  }

  const examplePropertyTypes = ["Apartamento", "Casa", "Flat", "Fazenda"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
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
                Ao clicar em "Aceitar", você declara estar ciente de todas as informações apresentadas e concorda integralmente com os termos de uso.
              </p>
            </div>
          </ScrollArea>
          <Button className="w-full" onClick={handleAccept}>
            Aceitar e Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
