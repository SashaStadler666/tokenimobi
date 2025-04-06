
import React from "react";
import { Token } from "@/lib/models";

interface RealEstateContentProps {
  token?: Token;
}

const RealEstateContent = ({ token }: RealEstateContentProps) => {
  const realEstateInvestors = token ? Math.round(token.holders * 0.65).toLocaleString() : "0";
  
  return (
    <p className="text-muted-foreground">
      Aproximadamente {realEstateInvestors} investidores (65%) focam em imóveis residenciais e comerciais. Estes investidores buscam valorização imobiliária e renda de aluguel.
    </p>
  );
};

export default RealEstateContent;
