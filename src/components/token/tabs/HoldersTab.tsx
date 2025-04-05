
import { Token } from "@/lib/mockData";

interface HoldersTabProps {
  token: Token;
}

const HoldersTab = ({ token }: HoldersTabProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Principais Investidores</h3>
      <p className="text-muted-foreground">
        Este token possui {token.holders.toLocaleString()} investidores únicos. A distribuição de tokens entre investidores garante uma estrutura de propriedade justa e descentralizada.
      </p>
      <div className="mt-6">
        <p className="italic text-muted-foreground text-sm">
          Informações detalhadas sobre investidores estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
};

export default HoldersTab;
