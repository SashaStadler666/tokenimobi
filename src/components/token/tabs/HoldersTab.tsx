
import { Token } from "@/lib/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, LandPlot, Leaf, Users } from "lucide-react";

interface HoldersTabProps {
  token: Token;
}

const HoldersTab = ({ token }: HoldersTabProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Projeto Raiz Digital</h3>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            <Users className="mr-2 h-4 w-4" />
            Todos os Investidores
          </TabsTrigger>
          <TabsTrigger value="real-estate">
            <Building className="mr-2 h-4 w-4" />
            Imóveis
          </TabsTrigger>
          <TabsTrigger value="agricultural">
            <LandPlot className="mr-2 h-4 w-4" />
            Terrenos Agrícolas
          </TabsTrigger>
          <TabsTrigger value="production">
            <Leaf className="mr-2 h-4 w-4" />
            Produção Rural
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <p className="text-muted-foreground">
            Este token possui {token.holders.toLocaleString()} investidores únicos. A distribuição de tokens entre investidores garante uma estrutura de propriedade justa e descentralizada.
          </p>
        </TabsContent>
        
        <TabsContent value="real-estate">
          <p className="text-muted-foreground">
            Aproximadamente {Math.round(token.holders * 0.65).toLocaleString()} investidores (65%) focam em imóveis residenciais e comerciais. Estes investidores buscam valorização imobiliária e renda de aluguel.
          </p>
        </TabsContent>
        
        <TabsContent value="agricultural">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Cerca de {Math.round(token.holders * 0.35).toLocaleString()} investidores (35%) estão focados em terrenos agrícolas. Este grupo valoriza a produção sustentável e rentabilidade de longo prazo, com terrenos regularizados e digitalizados para agricultura familiar.
            </p>
            
            <div className="mt-4 space-y-3">
              <h4 className="font-semibold">Etapas do Projeto Raiz Digital - Camada 1: Terrenos Rurais</h4>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Terreno regularizado e digitalizado com documentação completa</li>
                <li>Associado a produtor/agricultor familiar com contrato formal</li>
                <li>Token do terreno representa o direito de uso vinculado à produção</li>
              </ul>
            </div>
            
            <div className="mt-4 bg-secondary/20 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Tipos de Terrenos Rurais Tokenizados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium">Terrenos para Agricultura</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Áreas preparadas para cultivo de diversos produtos agrícolas como soja, milho, 
                    algodão e hortaliças. Geralmente incluem infraestrutura básica de irrigação 
                    e acesso a água.
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium">Terrenos para Fruticultura</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Áreas dedicadas ao cultivo de árvores frutíferas como tâmara, manga, 
                    abacate e citros. Requerem planejamento de longo prazo devido ao 
                    tempo de maturação das árvores.
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium">Pastagens para Pecuária</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Áreas com gramíneas adequadas para criação de gado de corte ou leiteiro. 
                    Incluem acesso a fontes de água e, em alguns casos, infraestrutura para 
                    manejo do rebanho.
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium">Áreas de Preservação e Produção</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Combinam áreas produtivas com reservas legais de preservação ambiental, 
                    permitindo exploração sustentável e gerando créditos de carbono como 
                    fonte adicional de renda.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold">Benefícios da Tokenização de Terrenos Rurais</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="flex flex-col items-center text-center p-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <LandPlot className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-medium text-sm">Acesso Democrático</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pequenos investidores podem acessar o mercado de terras rurais a partir de investimentos reduzidos
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-medium text-sm">Transparência e Formalização</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Todas as transações e acordos são registrados em blockchain, garantindo segurança jurídica
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-medium text-sm">Desenvolvimento Rural</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Conecta agricultores familiares a capital de investimento para melhorar a produtividade das terras
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="production">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              A Raiz Digital tokeniza não apenas terrenos, mas também a produção agrícola realizada neles, criando uma segunda camada de valor que permite fracionar safras futuras e antecipar recursos para agricultura familiar.
            </p>
            
            <h4 className="font-semibold mt-4">Etapas da Tokenização de Produção - Camada 2:</h4>
            <ol className="space-y-3 mt-2">
              <li className="pb-2 border-b border-border">
                <span className="font-medium">Cadastro da produção</span>
                <p className="text-sm text-muted-foreground">O produtor registra a intencionalidade produtiva (ex: soja, tâmara), volume estimado, ciclo produtivo e prazo. O sistema vincula o token da produção ao token do terreno.</p>
              </li>
              <li className="pb-2 border-b border-border">
                <span className="font-medium">Fracionamento da produção</span>
                <p className="text-sm text-muted-foreground">A safra é dividida em tokens (ex: 10 toneladas = 10.000 tokens, cada um representando 1kg). Estes podem ser usados como ativos de investimento ou pré-compra solidária.</p>
              </li>
              <li className="pb-2 border-b border-border">
                <span className="font-medium">Comercialização</span>
                <p className="text-sm text-muted-foreground">Tokens são ofertados no marketplace da plataforma para cooperativas, investidores ou compradores diretos, com possíveis bonificações para quem mantém tokens até o fim da safra.</p>
              </li>
              <li className="pb-2 border-b border-border">
                <span className="font-medium">Entrega / Liquidação</span>
                <p className="text-sm text-muted-foreground">Após a produção ser realizada e auditada, tokens podem ser convertidos em produto físico ou retorno financeiro, com transparência garantida via blockchain.</p>
              </li>
            </ol>
            
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
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <p className="italic text-muted-foreground text-sm">
          Informações detalhadas sobre investidores e projetos estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
};

export default HoldersTab;
