
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border/40 mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold gradient-text">TokenImobi</h3>
            <p className="text-sm text-muted-foreground">
              Investimentos imobiliários tokenizados com segurança e liquidez.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:contato@tokenimobi.com.br" className="text-muted-foreground hover:text-primary" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Imóveis</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tokens?type=urbano" className="text-sm text-muted-foreground hover:text-primary">
                  Imóveis Urbanos
                </Link>
              </li>
              <li>
                <Link to="/tokens?type=rural" className="text-sm text-muted-foreground hover:text-primary">
                  Terras Rurais
                </Link>
              </li>
              <li>
                <Link to="/tokens" className="text-sm text-muted-foreground hover:text-primary">
                  Todos os Imóveis
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Informações</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Contato</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                contato@tokenimobi.com.br
              </li>
              <li className="text-sm text-muted-foreground">
                São Paulo, SP - Brasil
              </li>
              <li className="text-sm text-muted-foreground">
                +55 11 9999-9999
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-border/40" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} TokenImobi. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">
            <Link to="/termos-de-uso" className="hover:text-primary">Política de Privacidade</Link>
            {' • '}
            <Link to="/termos-de-uso" className="hover:text-primary">Termos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
