
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Token, Transaction } from "@/lib/models";
import AboutTab from "./tabs/AboutTab";
import TransactionsTab from "./tabs/TransactionsTab";
import HoldersTab from "./tabs/HoldersTab";
import DocumentsTab from "./tabs/DocumentsTab";
import TabContent from "./tabs/TabContent";
import { useState } from "react";

interface TokenDetailTabsProps {
  token: Token;
  transactions: Transaction[];
}

const TokenDetailTabs = ({ token, transactions }: TokenDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
      <TabsList>
        <TabsTrigger value="about">Sobre</TabsTrigger>
        <TabsTrigger value="transactions">Transações</TabsTrigger>
        <TabsTrigger value="holders">Investidores</TabsTrigger>
        <TabsTrigger value="documents">Documentos</TabsTrigger>
      </TabsList>
      
      <TabContent value="about">
        <AboutTab token={token} />
      </TabContent>
      
      <TabContent value="transactions">
        <TransactionsTab transactions={transactions} />
      </TabContent>
      
      <TabContent value="holders">
        <HoldersTab token={token} />
      </TabContent>
      
      <TabContent value="documents">
        <DocumentsTab />
      </TabContent>
    </Tabs>
  );
};

export default TokenDetailTabs;
