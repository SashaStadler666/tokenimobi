
import React from "react";
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

const TabContent = ({ value, children }: TabContentProps) => {
  return (
    <TabsContent value={value} className="mt-4 space-y-4">
      {children}
    </TabsContent>
  );
};

export default TabContent;
