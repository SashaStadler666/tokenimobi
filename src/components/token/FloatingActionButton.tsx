
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Token } from '@/lib/models';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, Wallet } from 'lucide-react';

interface FloatingActionButtonProps {
  token: Token;
  onBuyClick: () => void;
}

const FloatingActionButton = ({ token, onBuyClick }: FloatingActionButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botão quando o usuário rolar abaixo de um certo ponto
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
      setShowScrollTop(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          {showScrollTop && (
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={scrollToTop}
            >
              <ArrowUpCircle className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            onClick={onBuyClick}
            className="rounded-full shadow-lg flex items-center gap-2 px-5"
          >
            <Wallet className="h-4 w-4" />
            {token.isWholeProperty 
              ? `Comprar por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(token.wholePropertyPrice || 0)}`
              : `Comprar a partir de R$ ${token.fractionPrice.toFixed(2)}`
            }
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default FloatingActionButton;
