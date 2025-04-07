
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Token } from "@/lib/models";

interface TokenDetailCardProps {
  token: Token;
}

const TokenDetailCard = ({ token }: TokenDetailCardProps) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Detalhes do Token</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fornecimento Total</span>
            <span>{token.totalSupply.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total de Frações</span>
            <span>{token.totalFractions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frações Disponíveis</span>
            <span>{token.availableFractions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Endereço do Contrato</span>
            <span className="text-xs truncate w-24 text-right">0xaB...1234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blockchain</span>
            <span>Ethereum</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenDetailCard;
