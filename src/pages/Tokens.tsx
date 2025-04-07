import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTokens, Token } from "@/lib/models";
import { useLocation } from "react-router-dom";
import TokensPageHeader from "@/components/tokens/TokensPageHeader";
import TokenFilterControls from "@/components/tokens/TokenFilterControls";
import CheapestTokenDisplay from "@/components/tokens/CheapestTokenDisplay";
import { useTokenFilter } from "@/hooks/useTokenFilter";

// Sample whole property tokens
export const wholePropertyTokens: Token[] = [
  {
    id: "whole-1",
    name: "Fazenda Horizonte Verde",
    symbol: "FHV",
    description: "Fazenda produtiva com 150 hectares de área cultivável, ideal para cultivo de soja e milho. Infraestrutura completa com galpões, sistema de irrigação e sede.",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    propertyType: "Fazenda",
    location: "Goiás, Brasil",
    area: 1500000, // in m²
    fractionPrice: 0,
    priceChange24h: 1.2,
    totalSupply: 1,
    totalFractions: 1,
    availableFractions: 1,
    isWholeProperty: true,
    wholePropertyPrice: 5500000, // R$ 5.5 milhões
    marketCap: 5500000,
    volume24h: 0,
    holders: 0
  },
  {
    id: "whole-2",
    name: "Terreno Praia do Sol",
    symbol: "TPS",
    description: "Terreno à beira-mar com 5.000m² de área, perfeito para desenvolvimento de resort ou condomínio de luxo. Vista panorâmica para o oceano.",
    imageUrl: "https://images.unsplash.com/photo-1626813621884-bc3bea0d8c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    propertyType: "Terreno",
    location: "Litoral Norte, SP",
    area: 5000, // in m²
    fractionPrice: 0,
    priceChange24h: 0.8,
    totalSupply: 1,
    totalFractions: 1,
    availableFractions: 1,
    isWholeProperty: true,
    wholePropertyPrice: 3200000, // R$ 3.2 milhões
    marketCap: 3200000,
    volume24h: 0,
    holders: 0
  },
  {
    id: "whole-3",
    name: "Mansão Jardins",
    symbol: "MJD",
    description: "Mansão luxuosa em condomínio fechado com 750m² de área construída em terreno de 1.200m². Piscina, sauna, 5 suítes e área gourmet completa.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    propertyType: "Casa",
    location: "São Paulo, SP",
    area: 1200, // in m²
    fractionPrice: 0,
    priceChange24h: 1.5,
    totalSupply: 1,
    totalFractions: 1,
    availableFractions: 1,
    isWholeProperty: true,
    wholePropertyPrice: 8500000, // R$ 8.5 milhões
    marketCap: 8500000,
    volume24h: 0,
    holders: 0
  },
  {
    id: "whole-4",
    name: "Edifício Comercial Centro",
    symbol: "ECC",
    description: "Prédio comercial com 5 andares e 2.000m² de área locável. Localização privilegiada no centro financeiro, com alta taxa de ocupação.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    propertyType: "Comercial",
    location: "Rio de Janeiro, RJ",
    area: 2000, // in m²
    fractionPrice: 0,
    priceChange24h: 0.7,
    totalSupply: 1,
    totalFractions: 1,
    availableFractions: 1,
    isWholeProperty: true,
    wholePropertyPrice: 12000000, // R$ 12 milhões
    marketCap: 12000000,
    volume24h: 0,
    holders: 0
  },
  {
    id: "whole-5",
    name: "Sítio Vale das Águas",
    symbol: "SVA",
    description: "Sítio com 12 hectares, nascentes naturais, pomar, área de pastagem e casa sede com 3 quartos. Ideal para turismo rural ou produção orgânica.",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    propertyType: "Rural",
    location: "Minas Gerais, Brasil",
    area: 120000, // in m²
    fractionPrice: 0,
    priceChange24h: 0.5,
    totalSupply: 1,
    totalFractions: 1,
    availableFractions: 1,
    isWholeProperty: true,
    wholePropertyPrice: 1800000, // R$ 1.8 milhões
    marketCap: 1800000,
    volume24h: 0,
    holders: 0
  }
];

const Tokens = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get('type');
  
  const [propertyTypeTab, setPropertyTypeTab] = useState(typeFromUrl === "rural" ? "rural" : "urbano");
  const [showFilters, setShowFilters] = useState(false);
  const allTokens = [...mockTokens, ...wholePropertyTokens];
  const { filteredTokens } = useTokenFilter(allTokens);
  
  useEffect(() => {
    if (typeFromUrl === "rural") {
      setPropertyTypeTab("rural");
    } else if (typeFromUrl === "urbano") {
      setPropertyTypeTab("urbano");
    }
  }, [typeFromUrl]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <TokensPageHeader 
          title="Token Mais Barato a partir de R$ 1.000,00" 
          description="Exibindo a opção mais acessível para investimento a partir de R$ 1.000,00"
        />
        
        <TokenFilterControls
          propertyTypeTab={propertyTypeTab}
          setPropertyTypeTab={setPropertyTypeTab}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        <CheapestTokenDisplay tokens={filteredTokens} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Tokens;
