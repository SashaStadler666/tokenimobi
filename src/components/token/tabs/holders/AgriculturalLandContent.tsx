
import { Card } from "@/components/ui/card";
import { Leaf, LandPlot, Users } from "lucide-react";
import { Token } from "@/lib/models";

interface AgriculturalLandContentProps {
  token?: Token;
}

const AgriculturalLandContent = ({ token }: AgriculturalLandContentProps) => {
  const agriculturalInvestors = token ? Math.round(token.holders * 0.35).toLocaleString() : "0";
  
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Cerca de {agriculturalInvestors} investidores (35%) estão focados em terrenos agrícolas. Este grupo valoriza a produção sustentável e rentabilidade de longo prazo, com terrenos regularizados e digitalizados para agricultura familiar.
      </p>
      
      <div className="mt-4 space-y-3">
        <h4 className="font-semibold">Etapas do Projeto Raiz Digital - Camada 1: Terrenos Rurais</h4>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Terreno regularizado e digitalizado com documentação completa</li>
          <li>Associado a produtor/agricultor familiar com contrato formal</li>
          <li>Token do terreno representa o direito de uso vinculado à produção</li>
        </ul>
      </div>
      
      <div className="mt-4 bg-secondary/20 p-4 rounded-md">
        <h4 className="font-semibold mb-2">Tipos de Terrenos Rurais Tokenizados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-border rounded-md p-3">
            <h5 className="font-medium">Terrenos para Agricultura</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Áreas preparadas para cultivo de diversos produtos agrícolas como soja, milho, 
              algodão e hortaliças. Geralmente incluem infraestrutura básica de irrigação 
              e acesso a água.
            </p>
          </Card>
          <Card className="border border-border rounded-md p-3">
            <h5 className="font-medium">Terrenos para Fruticultura</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Áreas dedicadas ao cultivo de árvores frutíferas como tâmara, manga, 
              abacate e citros. Requerem planejamento de longo prazo devido ao 
              tempo de maturação das árvores.
            </p>
          </Card>
          <Card className="border border-border rounded-md p-3">
            <h5 className="font-medium">Pastagens para Pecuária</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Áreas com gramíneas adequadas para criação de gado de corte ou leiteiro. 
              Incluem acesso a fontes de água e, em alguns casos, infraestrutura para 
              manejo do rebanho.
            </p>
          </Card>
          <Card className="border border-border rounded-md p-3">
            <h5 className="font-medium">Áreas de Preservação e Produção</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Combinam áreas produtivas com reservas legais de preservação ambiental, 
              permitindo exploração sustentável e gerando créditos de carbono como 
              fonte adicional de renda.
            </p>
          </Card>
        </div>
      </div>
      
      <TokenizationBenefits />
    </div>
  );
};

const TokenizationBenefits = () => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold">Benefícios da Tokenização de Terrenos Rurais</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        <BenefitCard 
          icon={<LandPlot className="h-6 w-6 text-primary" />}
          title="Acesso Democrático"
          description="Pequenos investidores podem acessar o mercado de terras rurais a partir de investimentos reduzidos"
        />
        <BenefitCard 
          icon={<Users className="h-6 w-6 text-primary" />}
          title="Transparência e Formalização"
          description="Todas as transações e acordos são registrados em blockchain, garantindo segurança jurídica"
        />
        <BenefitCard 
          icon={<Leaf className="h-6 w-6 text-primary" />}
          title="Desenvolvimento Rural"
          description="Conecta agricultores familiares a capital de investimento para melhorar a produtividade das terras"
        />
      </div>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="flex flex-col items-center text-center p-3">
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h5 className="font-medium text-sm">{title}</h5>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default AgriculturalLandContent;
