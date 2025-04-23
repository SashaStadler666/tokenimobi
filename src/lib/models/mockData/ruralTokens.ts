
import { Token } from "../interfaces/TokenInterface";

export const ruralTokens: Token[] = [
  {
    id: "6",
    name: "Terreno Litoral Norte",
    symbol: "TLNP",
    totalSupply: 1,
    fractionPrice: 95.75,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Terreno em área de expansão no litoral norte de São Paulo. Ótima oportunidade para desenvolvimento residencial ou empreendimento turístico.",
    marketCap: 3500000,
    volume24h: 420000,
    priceChange24h: 1.5,
    totalFractions: 800,
    availableFractions: 420,
    holders: 280,
    location: "Ubatuba, São Paulo, SP",
    area: 1200,
    propertyType: "Terreno",
    yearBuilt: null,
    isWholeProperty: false
  },
  {
    id: "7",
    name: "Fazenda Produtiva MT",
    symbol: "FZMT",
    totalSupply: 1,
    fractionPrice: 185.30,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Fazenda produtiva com 1.500 hectares em Mato Grosso. Alto rendimento com produção de soja e algodão. Investimento rural com retornos consistentes.",
    marketCap: 25000000,
    volume24h: 780000,
    priceChange24h: 4.2,
    totalFractions: 3000,
    availableFractions: 1200,
    holders: 580,
    location: "Sorriso, Mato Grosso, MT",
    area: 15000000, // em m²
    propertyType: "Fazenda",
    yearBuilt: null,
    isWholeProperty: false
  },
  {
    id: "8",
    name: "Terras Agriculturáveis GO",
    symbol: "TAGO",
    totalSupply: 1,
    fractionPrice: 142.60,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Terras para agricultura em Goiás com excelente localização e infraestrutura. Potencial de valorização e produção agrícola diversificada.",
    marketCap: 18000000,
    volume24h: 520000,
    priceChange24h: 2.8,
    totalFractions: 2500,
    availableFractions: 950,
    holders: 420,
    location: "Rio Verde, Goiás, GO",
    area: 8000000, // em m²
    propertyType: "Rural",
    yearBuilt: null,
    isWholeProperty: false
  },
  {
    id: "9",
    name: "Rancho Produtor MG",
    symbol: "RPMG",
    totalSupply: 1,
    fractionPrice: 98.40,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Rancho com produção de leite e gado de corte em Minas Gerais. Estrutura completa e em operação, gerando rendimentos mensais.",
    marketCap: 8500000,
    volume24h: 320000,
    priceChange24h: 1.7,
    totalFractions: 1500,
    availableFractions: 780,
    holders: 320,
    location: "Uberaba, Minas Gerais, MG",
    area: 3000000, // em m²
    propertyType: "Rural",
    yearBuilt: 2012,
    isWholeProperty: false
  }
];
