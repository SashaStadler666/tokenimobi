
import React from "react";
import { Token } from "@/lib/models";

interface AllInvestorsContentProps {
  token: Token;
}

const AllInvestorsContent = ({ token }: AllInvestorsContentProps) => {
  return (
    <p className="text-muted-foreground">
      Este token possui {token.holders.toLocaleString()} investidores únicos. A distribuição de tokens entre investidores garante uma estrutura de propriedade justa e descentralizada.
    </p>
  );
};

export default AllInvestorsContent;
