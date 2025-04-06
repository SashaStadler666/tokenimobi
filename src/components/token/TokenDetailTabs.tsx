
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Token, Transaction } from "@/lib/models";
import AboutTab from "./tabs/AboutTab";
import TransactionsTab from "./tabs/TransactionsTab";
import HoldersTab from "./tabs/HoldersTab";
import DocumentsTab from "./tabs/DocumentsTab";

interface TokenDetailTabsProps {
  token: Token;
  transactions: Transaction[];
}

const TokenDetailTabs = ({ token, transactions }: TokenDetailTabsProps) => {
  return (
    <Tabs defaultValue="about" className="mt-8">
      <TabsList>
        <TabsTrigger value="about">Sobre</TabsTrigger>
        <TabsTrigger value="transactions">Transações</TabsTrigger>
        <TabsTrigger value="holders">Investidores</TabsTrigger>
        <TabsTrigger value="documents">Documentos</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <AboutTab token={token} />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab transactions={transactions} />
      </TabsContent>
      <TabsContent value="holders">
        <HoldersTab token={token} />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentsTab />
      </TabsContent>
    </Tabs>
  );
};

export default TokenDetailTabs;
