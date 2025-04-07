
import { Transaction, mockTokens, Token } from "@/lib/models";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TransactionsTabProps {
  transactions: Transaction[];
}

const TransactionsTab = ({ transactions }: TransactionsTabProps) => {
  const getTokenName = (tokenId: string): string => {
    const token = mockTokens.find(t => t.id === tokenId);
    return token ? token.name : `Token ${tokenId}`;
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Transações Recentes</h3>
      {transactions.length > 0 ? (
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-4 font-medium text-sm border-b">
            <div>Tipo</div>
            <div>Token</div>
            <div>Quantidade</div>
            <div>Total</div>
            <div>Data</div>
          </div>
          {transactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 text-sm">
              <div className={tx.type === 'buy' ? 'text-success' : 'text-destructive'}>
                {tx.type === 'buy' ? 'COMPRA' : 'VENDA'}
              </div>
              <div>{getTokenName(tx.tokenId)}</div>
              <div>{tx.fractions.toLocaleString()} frações</div>
              <div>R${tx.total.toFixed(2)}</div>
              <div>{format(tx.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Sem transações para este token.</p>
      )}
    </div>
  );
};

export default TransactionsTab;
