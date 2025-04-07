
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  termsAccepted: boolean;
  onTermsChange: () => void;
  onAcceptTerms: () => void;
  onViewFullTerms: () => void;
}

const TermsDialog = ({
  open,
  onOpenChange,
  termsAccepted,
  onTermsChange,
  onAcceptTerms,
  onViewFullTerms,
}: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Termos de Uso</DialogTitle>
          <DialogDescription>
            Antes de conectar sua carteira, você precisa aceitar os termos de uso da plataforma.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="text-sm space-y-4">
              <p>
                A plataforma Token Imobi atua como intermediadora tecnológica e não realiza oferta pública de valores mobiliários. O uso do sistema exige validação de identidade e está em conformidade com as diretrizes da LGPD.
              </p>
              <p>
                O usuário reconhece que investimentos em propriedades tokenizadas estão sujeitos a riscos, incluindo, mas não se limitando a, baixa liquidez, variações de mercado e especificidades regulatórias sobre imóveis urbanos e rurais.
              </p>
              <p>
                Propriedades do tipo agro (fazendas, áreas de cultivo, criação) e urbanas (terrenos para construção civil) possuem características distintas, sendo responsabilidade do investidor verificar os detalhes antes da aquisição de frações.
              </p>
            </div>
          </ScrollArea>
        </div>
        
        <div className="flex items-center space-x-2 pb-4">
          <Checkbox id="terms" checked={termsAccepted} onCheckedChange={onTermsChange} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Eu li e aceito os termos de uso
          </label>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onViewFullTerms}>
            Ver Termos Completos
          </Button>
          <Button 
            disabled={!termsAccepted} 
            onClick={onAcceptTerms}
            className={termsAccepted ? "button-glow" : ""}
          >
            Aceitar e Conectar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
