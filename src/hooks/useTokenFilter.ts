
import { useState, useEffect, useRef } from "react";
import { Token } from "@/lib/models";
import { toast } from "sonner";

export const useTokenFilter = (allTokens: Token[], minPrice: number = 1000) => {
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const notificationShown = useRef(false);

  useEffect(() => {
    // Filter tokens that have a price at or above the minimum price
    const tokensAboveMinPrice = allTokens.filter(token => {
      if (token.isWholeProperty && token.wholePropertyPrice) {
        return token.wholePropertyPrice >= minPrice;
      } else if (!token.isWholeProperty) {
        return token.fractionPrice >= minPrice;
      }
      return false;
    });
    
    if (tokensAboveMinPrice.length > 0) {
      // Find the cheapest token among the filtered tokens
      const cheapestToken = tokensAboveMinPrice.reduce((prev, current) => {
        const prevPrice = prev.isWholeProperty && prev.wholePropertyPrice 
          ? prev.wholePropertyPrice 
          : prev.fractionPrice;
        
        const currentPrice = current.isWholeProperty && current.wholePropertyPrice 
          ? current.wholePropertyPrice 
          : current.fractionPrice;
        
        return prevPrice < currentPrice ? prev : current;
      });
      
      setFilteredTokens([cheapestToken]);
      
      // Only show the toast notification once
      if (!notificationShown.current) {
        toast.success(
          `Token mais barato encontrado: ${cheapestToken.name} - ${
            cheapestToken.isWholeProperty && cheapestToken.wholePropertyPrice
              ? `R$ ${cheapestToken.wholePropertyPrice.toLocaleString('pt-BR')}`
              : `R$ ${cheapestToken.fractionPrice.toFixed(2)}/fração`
          }`
        );
        notificationShown.current = true;
      }
    } else {
      setFilteredTokens([]);
      
      // Only show the error toast notification once
      if (!notificationShown.current) {
        toast.error("Nenhum token encontrado com preço a partir de R$ 1.000,00");
        notificationShown.current = true;
      }
    }
  }, [allTokens, minPrice]);

  return { filteredTokens };
};
