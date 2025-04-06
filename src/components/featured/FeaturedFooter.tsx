
import { Button } from "@/components/ui/button";

const FeaturedFooter = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
      <p className="text-center text-muted-foreground max-w-lg">
        Escolha entre oportunidades em grandes centros ou propriedades rurais com alto potencial produtivo. 
        Diversifique sua carteira com segurança, em qualquer tipo de solo.
      </p>
      <Button variant="outline" className="button-glow whitespace-nowrap">
        Ver Todos os Imóveis
      </Button>
    </div>
  );
};

export default FeaturedFooter;
