
import React from "react";

const ProductionContent = () => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        A Raiz Digital tokeniza não apenas terrenos, mas também a produção agrícola realizada neles, criando uma segunda camada de valor que permite fracionar safras futuras e antecipar recursos para agricultura familiar.
      </p>
      
      <h4 className="font-semibold mt-4">Etapas da Tokenização de Produção - Camada 2:</h4>
      <ProductionSteps />
      
      <div className="mt-4 bg-secondary/20 p-3 rounded-md">
        <h4 className="font-semibold mb-2">Impacto e Monetização</h4>
        <p className="text-sm text-muted-foreground">
          O projeto antecipa renda para produtores familiares, permitindo acesso a capital sem crédito bancário convencional. Os investidores podem obter retorno através de revenda após valorização, liquidação com entrega do produto, conversão em crédito em ecossistemas parceiros, ou participação em bonificações comunitárias.
        </p>
      </div>
      
      <p className="italic text-sm text-primary mt-4 text-center">
        "Cada safra tem seu valor. Agora ela também tem sua própria identidade digital."
      </p>
    </div>
  );
};

const ProductionSteps = () => {
  const steps = [
    {
      title: "Cadastro da produção",
      description: "O produtor registra a intencionalidade produtiva (ex: soja, tâmara), volume estimado, ciclo produtivo e prazo. O sistema vincula o token da produção ao token do terreno."
    },
    {
      title: "Fracionamento da produção",
      description: "A safra é dividida em tokens (ex: 10 toneladas = 10.000 tokens, cada um representando 1kg). Estes podem ser usados como ativos de investimento ou pré-compra solidária."
    },
    {
      title: "Comercialização",
      description: "Tokens são ofertados no marketplace da plataforma para cooperativas, investidores ou compradores diretos, com possíveis bonificações para quem mantém tokens até o fim da safra."
    },
    {
      title: "Entrega / Liquidação",
      description: "Após a produção ser realizada e auditada, tokens podem ser convertidos em produto físico ou retorno financeiro, com transparência garantida via blockchain."
    }
  ];

  return (
    <ol className="space-y-3 mt-2">
      {steps.map((step, index) => (
        <li key={index} className="pb-2 border-b border-border">
          <span className="font-medium">{step.title}</span>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
};

export default ProductionContent;
