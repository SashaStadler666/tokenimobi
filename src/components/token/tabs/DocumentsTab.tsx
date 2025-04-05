
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DocumentsTab = () => {
  return (
    <div className="p-4">
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
    </div>
  );
};

export default DocumentsTab;
