
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, ExternalLink, Users, Wallet, Clock, Activity, MapPin, Home, Ruler, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTokens, mockTransactions, Token } from "@/lib/mockData";
import BuySellInterface from "./BuySellInterface";
import { Separator } from "@/components/ui/separator";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the token by ID
  const token = mockTokens.find(t => t.id === id);
  
  if (!token) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Imóvel não encontrado</h2>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Home
        </Button>
      </div>
    );
  }
  
  // Format numbers for display
  const formatMarketCap = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.marketCap);
  
  const formatVolume = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(token.volume24h);
  
  // Token's recent transactions
  const tokenTransactions = mockTransactions.filter(tx => tx.tokenId === token.id);
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o Mercado
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Token info */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="rounded-xl overflow-hidden border border-border">
                <img 
                  src={token.imageUrl} 
                  alt={token.name} 
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{token.name}</h1>
                  <p className="text-muted-foreground">{token.symbol}</p>
                  
                  {token.location && (
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{token.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Preço da Fração</p>
                  <p className="text-xl font-bold">R$ {token.fractionPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Variação</p>
                  <p className={`text-xl font-bold ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor de Mercado</p>
                  <p className="text-xl font-bold">{formatMarketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volume 24h</p>
                  <p className="text-xl font-bold">{formatVolume}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{token.holders.toLocaleString()} investidores</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{token.availableFractions.toLocaleString()} frações disponíveis</span>
                </div>
                {token.propertyType && (
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{token.propertyType}</span>
                  </div>
                )}
                {token.area && (
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{token.area} m²</span>
                  </div>
                )}
                {token.yearBuilt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Construção em {token.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about" className="mt-8">
            <TabsList>
              <TabsTrigger value="about">Sobre</TabsTrigger>
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="holders">Investidores</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="p-4">
              <h3 className="text-xl font-bold mb-4">Sobre {token.name}</h3>
              <p className="text-muted-foreground mb-4">{token.description}</p>
              <p className="text-muted-foreground">
                Este token representa propriedade fracionada de {token.name}. Cada fração dá ao titular direito proporcional sobre o imóvel e seus benefícios. O token é dividido em {token.totalFractions.toLocaleString()} partes iguais, com cada fração custando R${token.fractionPrice.toFixed(2)}.
              </p>
              
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold">Detalhes da Propriedade</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Características</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Tipo de Imóvel:</span>
                          <span>{token.propertyType}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Área Total:</span>
                          <span>{token.area} m²</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Ano de Construção:</span>
                          <span>{token.yearBuilt || "N/A"}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Estado:</span>
                          <span>Excelente</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Rendimentos Previstos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Rendimento Anual:</span>
                          <span>8.5%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Distribuição:</span>
                          <span>Mensal</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Próxima Distribuição:</span>
                          <span>15/04/2025</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Valorização (12m):</span>
                          <span className="text-success">+12.3%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="p-4">
              <h3 className="text-xl font-bold mb-4">Transações Recentes</h3>
              {tokenTransactions.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium text-sm border-b">
                    <div>Tipo</div>
                    <div>Quantidade</div>
                    <div>Preço</div>
                    <div>Total</div>
                    <div>Data</div>
                  </div>
                  {tokenTransactions.map((tx) => (
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
            </TabsContent>
            <TabsContent value="holders" className="p-4">
              <h3 className="text-xl font-bold mb-4">Principais Investidores</h3>
              <p className="text-muted-foreground">
                Este token possui {token.holders.toLocaleString()} investidores únicos. A distribuição de tokens entre investidores garante uma estrutura de propriedade justa e descentralizada.
              </p>
              <div className="mt-6">
                <p className="italic text-muted-foreground text-sm">
                  Informações detalhadas sobre investidores estarão disponíveis em breve.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="p-4">
              <h3 className="text-xl font-bold mb-4">Documentação Legal</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Documentos Disponíveis</CardTitle>
                    <CardDescription>Arquivos para download</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          <span>Escritura do Imóvel</span>
                          <Badge variant="outline" className="ml-2 text-xs">PDF</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          <span>Contrato de Tokenização</span>
                          <Badge variant="outline" className="ml-2 text-xs">PDF</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </li>
                      <li className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          <span>Laudo de Avaliação</span>
                          <Badge variant="outline" className="ml-2 text-xs">PDF</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span>Matrícula do Imóvel</span>
                          <Badge variant="outline" className="ml-2 text-xs">PDF</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Buy/Sell interface */}
        <div>
          <BuySellInterface token={token} />
          
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
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
