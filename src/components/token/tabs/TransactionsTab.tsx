import { Transaction } from "@/lib/models";

interface TransactionsTabProps {
  transactions: Transaction[];
}

const TransactionsTab = ({ transactions }: TransactionsTabProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Transações Recentes</h3>
      {transactions.length > 0 ? (
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-4 font-medium text-sm border-b">
            <div>Tipo</div>
            <div>Quantidade</div>
            <div>Preço</div>
            <div>Total</div>
            <div>Data</div>
          </div>
          {transactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-5 p-4 border-b last:border-b-0 text-sm">
              <div className={tx.type === 'buy' ? 'text-success' : 'text-destructive'}>
                {tx.type === 'buy' ? 'COMPRA' : 'VENDA'}
              </div>
              <div>{tx.fractions.toLocaleString()} frações</div>
              <div>R${tx.price.toFixed(2)}</div>
              <div>R${tx.total.toFixed(2)}</div>
              <div>{tx.timestamp.toLocaleString()}</div>
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
