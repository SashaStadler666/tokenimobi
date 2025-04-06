import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Token } from "@/lib/models";

interface AboutTabProps {
  token: Token;
}

const AboutTab = ({ token }: AboutTabProps) => {
  return (
    <div className="p-4">
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
    </div>
  );
};

export default AboutTab;
