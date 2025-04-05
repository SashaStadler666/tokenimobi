
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, LandPlot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TokenDetailHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o Mercado
      </Button>
      <div className="flex items-center">
        <div className="mr-3 bg-primary/10 p-2 rounded-full">
          <LandPlot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-muted-foreground flex items-center">
            Raiz Digital <span className="mx-2">•</span> Plataforma de Tokenização de Imóveis e Produção Rural
          </h2>
          <p className="text-sm text-muted-foreground">
            Conectando investidores a terrenos rurais e produções agrícolas através da tecnologia blockchain
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailHeader;
