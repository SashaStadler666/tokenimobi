
import { useState, useEffect } from "react";
import { Token } from "@/lib/models";
import { toast } from "sonner";

export const useTokenFilter = (allTokens: Token[], minPrice: number = 1000) => {
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  useEffect(() => {
    const tokensAboveMinPrice = allTokens.filter(token => {
      if (!token.isWholeProperty && token.fractionPrice >= minPrice) {
        return true;
      }
      if (token.isWholeProperty && token.wholePropertyPrice && token.wholePropertyPrice >= minPrice) {
        return true;
      }
      return false;
    });
    
    let cheapestToken: Token | null = null;
    
    if (tokensAboveMinPrice.length > 0) {
      cheapestToken = tokensAboveMinPrice.reduce((prev, current) => {
        const prevPrice = !prev.isWholeProperty ? prev.fractionPrice : (prev.wholePropertyPrice || Infinity);
        const currentPrice = !current.isWholeProperty ? current.fractionPrice : (current.wholePropertyPrice || Infinity);
        return prevPrice < currentPrice ? prev : current;
      });
      
      if (cheapestToken) {
        setFilteredTokens([cheapestToken]);
        
        toast.success(
          `Token mais barato encontrado: ${cheapestToken.name} - ${
            !cheapestToken.isWholeProperty 
              ? `R$ ${cheapestToken.fractionPrice.toFixed(2)}/fração`
              : `R$ ${(cheapestToken.wholePropertyPrice || 0).toLocaleString('pt-BR')}`
          }`
        );
      }
    } else {
      setFilteredTokens([]);
      toast.error("Nenhum token encontrado com preço a partir de R$ 1.000,00");
    }
  }, [allTokens, minPrice]);

  return { filteredTokens };
};
