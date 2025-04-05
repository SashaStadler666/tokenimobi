
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
    </div>
  );
};

export default TokenDetailHeader;
