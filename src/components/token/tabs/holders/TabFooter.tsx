
import React from "react";

interface TabFooterProps {
  message?: string;
}

const TabFooter = ({ message }: TabFooterProps) => {
  return (
    <div className="mt-6">
      <p className="italic text-muted-foreground text-sm">
        {message || "Informações detalhadas sobre investidores e projetos estarão disponíveis em breve."}
      </p>
    </div>
  );
};

export default TabFooter;
