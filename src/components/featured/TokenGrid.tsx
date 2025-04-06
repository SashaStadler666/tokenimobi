
import { Token } from "@/lib/models";
import TokenCard from "@/components/TokenCard";
import { Tabs, TabsContent } from "@/components/ui/tabs";

interface TokenGridProps {
  tokens: Token[];
  propertyTypeTab: string;
}

const TokenGrid = ({ tokens, propertyTypeTab }: TokenGridProps) => {
  return (
    <Tabs value={propertyTypeTab} className="w-full">
      <TabsContent value="urbano" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="rural" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TokenGrid;
