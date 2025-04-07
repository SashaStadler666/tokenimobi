
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ExternalLink, FileCheck, FileText, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const DocumentsTab = () => {
  const [showSmartContract, setShowSmartContract] = useState(false);
  const [isGeneratingContract, setIsGeneratingContract] = useState(false);
  const [contractGenerated, setContractGenerated] = useState(false);
  
  const form = useForm({
    defaultValues: {
      walletAddress: "",
      tokenAmount: "",
    },
  });
  
  const toggleSmartContract = () => {
    setShowSmartContract(!showSmartContract);
  };
  
  const onSubmit = (data: { walletAddress: string; tokenAmount: string }) => {
    setIsGeneratingContract(true);
    
    // Simulação de geração de contrato na blockchain
    setTimeout(() => {
      setIsGeneratingContract(false);
      setContractGenerated(true);
      toast.success("Contrato digital gerado com sucesso na blockchain", {
        description: "Transação: 0xf7a8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1"
      });
    }, 2000);
  };
  
  const viewGeneratedContract = () => {
    toast.info("Visualizando contrato na blockchain", {
      description: "Conectando ao explorador da blockchain..."
    });
    // Este link seria substituído pelo link real do explorador da blockchain
    setTimeout(() => {
      window.open("https://etherscan.io/address/0xaBcD1234567890AbCdEf1234567890aBcDeF1234", "_blank");
    }, 500);
  };
  
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
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleSmartContract}>
              <div>
                <CardTitle className="text-md flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  Contrato Digital Blockchain
                </CardTitle>
                <CardDescription>Gere seu contrato digital na blockchain</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                {showSmartContract ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          
          {showSmartContract && (
            <CardContent>
              {!contractGenerated ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço da Carteira</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0x..." 
                              {...field}
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tokenAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade de Frações</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Ex: 100" 
                              {...field}
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-accent/10 p-3 rounded text-sm my-4">
                      <p className="text-muted-foreground">
                        Ao gerar o contrato digital, você estará criando um registro imutável na 
                        blockchain que comprova sua propriedade sobre as frações do token imobiliário.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full button-glow"
                      disabled={isGeneratingContract}
                    >
                      {isGeneratingContract ? (
                        <>Gerando Contrato...</>
                      ) : (
                        <>Gerar Contrato Digital</>
                      )}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-success">
                    <FileCheck className="h-5 w-5" />
                    <span className="font-medium">Contrato gerado com sucesso!</span>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-muted/10">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-muted-foreground">Hash da Transação:</div>
                      <div className="col-span-2 font-mono text-xs truncate">0xf7a8b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1</div>
                      
                      <div className="text-muted-foreground">Blockchain:</div>
                      <div className="col-span-2">Ethereum</div>
                      
                      <div className="text-muted-foreground">Status:</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success">Confirmado</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setContractGenerated(false)}>
                      Novo Contrato
                    </Button>
                    <Button onClick={viewGeneratedContract} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Ver na Blockchain
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DocumentsTab;
