
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const urbanImage = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914";
const ruralImage = "https://images.unsplash.com/photo-1566438480900-0609be27a4be";
const buildingImage = "https://images.unsplash.com/photo-1501183638710-841dd1904471";
const bannerImages = [urbanImage, ruralImage, buildingImage];

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      {bannerImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner ${index === 0 ? 'urbano' : index === 1 ? 'rural' : 'imóvel'}`}
          className="w-full max-w-3xl h-48 object-cover rounded-lg shadow"
        />
      ))}
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
