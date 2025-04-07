
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Token, Transaction, mockTokens } from "@/lib/models";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PortfolioTokenCard from "./PortfolioTokenCard";

interface PortfolioTabsProps {
  userTokens: Token[];
  transactions: Transaction[];
}

const PortfolioTabs = ({ userTokens, transactions }: PortfolioTabsProps) => {
  return (
    <Tabs defaultValue="tokens" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="tokens">Meus Tokens</TabsTrigger>
        <TabsTrigger value="transactions">Minhas Transações</TabsTrigger>
      </TabsList>
      <TabsContent value="tokens">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTokens.map((token) => (
            <PortfolioTokenCard key={token.id} token={token} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="transactions">
        <Card>
          <CardContent className="p-6">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium text-sm border-b bg-muted/50">
                <div>Tipo</div>
                <div>Token</div>
                <div>Quantidade</div>
                <div>Valor</div>
                <div>Data</div>
              </div>
              {transactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 text-sm">
                  <div className={tx.type === 'buy' ? 'text-success' : 'text-destructive'}>
                    {tx.type === 'buy' ? 'COMPRA' : 'VENDA'}
                  </div>
                  <div>{mockTokens.find(t => t.id === tx.tokenId)?.name.substring(0, 10) || tx.tokenId}...</div>
                  <div>{tx.fractions} frações</div>
                  <div>R${tx.total.toFixed(2)}</div>
                  <div>{format(tx.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PortfolioTabs;
