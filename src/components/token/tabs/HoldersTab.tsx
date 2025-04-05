
import { Token } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, LandPlot } from "lucide-react";

interface HoldersTabProps {
  token: Token;
}

const HoldersTab = ({ token }: HoldersTabProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Principais Investidores</h3>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos os Investidores</TabsTrigger>
          <TabsTrigger value="real-estate">
            <Building className="mr-2 h-4 w-4" />
            Imóveis
          </TabsTrigger>
          <TabsTrigger value="agricultural">
            <LandPlot className="mr-2 h-4 w-4" />
            Terrenos Agrícolas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <p className="text-muted-foreground">
            Este token possui {token.holders.toLocaleString()} investidores únicos. A distribuição de tokens entre investidores garante uma estrutura de propriedade justa e descentralizada.
          </p>
        </TabsContent>
        
        <TabsContent value="real-estate">
          <p className="text-muted-foreground">
            Aproximadamente {Math.round(token.holders * 0.65).toLocaleString()} investidores (65%) focam em imóveis residenciais e comerciais. Estes investidores buscam valorização imobiliária e renda de aluguel.
          </p>
        </TabsContent>
        
        <TabsContent value="agricultural">
          <p className="text-muted-foreground">
            Cerca de {Math.round(token.holders * 0.35).toLocaleString()} investidores (35%) estão focados em terrenos agrícolas. Este grupo valoriza a produção sustentável e rentabilidade de longo prazo.
          </p>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <p className="italic text-muted-foreground text-sm">
          Informações detalhadas sobre investidores estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
};

export default HoldersTab;
