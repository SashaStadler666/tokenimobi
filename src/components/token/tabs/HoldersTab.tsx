
import { Token } from "@/lib/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, LandPlot, Leaf, Users } from "lucide-react";
import AllInvestorsContent from "./holders/AllInvestorsContent";
import RealEstateContent from "./holders/RealEstateContent";
import AgriculturalLandContent from "./holders/AgriculturalLandContent";
import ProductionContent from "./holders/ProductionContent";
import TabFooter from "./holders/TabFooter";

interface HoldersTabProps {
  token: Token;
}

const HoldersTab = ({ token }: HoldersTabProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Projeto Raiz Digital</h3>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            <Users className="mr-2 h-4 w-4" />
            Todos os Investidores
          </TabsTrigger>
          <TabsTrigger value="real-estate">
            <Building className="mr-2 h-4 w-4" />
            Imóveis
          </TabsTrigger>
          <TabsTrigger value="agricultural">
            <LandPlot className="mr-2 h-4 w-4" />
            Terrenos Agrícolas
          </TabsTrigger>
          <TabsTrigger value="production">
            <Leaf className="mr-2 h-4 w-4" />
            Produção Rural
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <AllInvestorsContent token={token} />
        </TabsContent>
        
        <TabsContent value="real-estate">
          <RealEstateContent token={token} />
        </TabsContent>
        
        <TabsContent value="agricultural">
          <AgriculturalLandContent token={token} />
        </TabsContent>
        
        <TabsContent value="production">
          <ProductionContent />
        </TabsContent>
      </Tabs>
      
      <TabFooter />
    </div>
  );
};

export default HoldersTab;
