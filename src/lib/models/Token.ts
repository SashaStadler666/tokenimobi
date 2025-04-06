export interface Token {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  fractionPrice: number;
  wholePropertyPrice?: number;
  imageUrl: string;
  description: string;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  totalFractions: number;
  availableFractions: number;
  holders: number;
  location?: string;
  area?: number;
  propertyType?: string;
  yearBuilt?: number;
  isWholeProperty?: boolean;
}

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Apartamento Jardins",
    symbol: "APJD",
    totalSupply: 1,
    fractionPrice: 125.50,
    wholePropertyPrice: 3500000,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
    description: "Apartamento de luxo no bairro Jardins, São Paulo. Localização privilegiada com fácil acesso a restaurantes, shopping e transporte público.",
    marketCap: 3500000,
    volume24h: 45000,
    priceChange24h: 3.5,
    totalFractions: 1000,
    availableFractions: 350,
    holders: 450,
    location: "Jardins, São Paulo, SP",
    area: 120,
    propertyType: "Apartamento",
    yearBuilt: 2018,
    isWholeProperty: false
  },
  {
    id: "2",
    name: "Casa Barra da Tijuca",
    symbol: "CSBT",
    totalSupply: 1,
    fractionPrice: 212.75,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800",
    description: "Casa de alto padrão em condomínio fechado na Barra da Tijuca, Rio de Janeiro. Área de lazer completa com piscina e churrasqueira.",
    marketCap: 7200000,
    volume24h: 87000,
    priceChange24h: -1.2,
    totalFractions: 1000,
    availableFractions: 120,
    holders: 840,
    location: "Barra da Tijuca, Rio de Janeiro, RJ",
    area: 350,
    propertyType: "Casa",
    yearBuilt: 2015,
    isWholeProperty: false
  },
  {
    id: "3",
    name: "Flat Comercial Paulista",
    symbol: "FCPL",
    totalSupply: 1,
    fractionPrice: 89.25,
    imageUrl: "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?auto=format&fit=crop&w=800",
    description: "Flat comercial na Av. Paulista, com serviços de hotelaria e ótima rentabilidade para investidores. Mobiliado e pronto para locação.",
    marketCap: 2800000,
    volume24h: 65000,
    priceChange24h: 5.8,
    totalFractions: 1000,
    availableFractions: 280,
    holders: 620,
    location: "Av. Paulista, São Paulo, SP",
    area: 45,
    propertyType: "Flat",
    yearBuilt: 2010,
    isWholeProperty: false
  },
  {
    id: "4",
    name: "Loja Centro Histórico",
    symbol: "LCHS",
    totalSupply: 1,
    fractionPrice: 75.50,
    imageUrl: "https://images.unsplash.com/photo-1556962236-5ec6c921f6c1?auto=format&fit=crop&w=800",
    description: "Loja comercial no centro histórico de Belo Horizonte. Excelente fluxo de pessoas e visibilidade para seu negócio.",
    marketCap: 1500000,
    volume24h: 120000,
    priceChange24h: 12.3,
    totalFractions: 500,
    availableFractions: 175,
    holders: 125,
    location: "Centro, Belo Horizonte, MG",
    area: 80,
    propertyType: "Comercial",
    yearBuilt: 1985,
    isWholeProperty: false
  },
  {
    id: "5",
    name: "Galpão Logístico Guarulhos",
    symbol: "GLGU",
    totalSupply: 1,
    fractionPrice: 165.25,
    imageUrl: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800",
    description: "Galpão logístico de alto padrão em Guarulhos, próximo ao aeroporto internacional. Ideal para empresas de logística e e-commerce.",
    marketCap: 12000000,
    volume24h: 3500000,
    priceChange24h: -2.7,
    totalFractions: 2000,
    availableFractions: 560,
    holders: 870,
    location: "Guarulhos, São Paulo, SP",
    area: 5000,
    propertyType: "Industrial",
    yearBuilt: 2020,
    isWholeProperty: false
  },
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
  },
  {
    id: "10",
    name: "Terreno Inteiro Litoral SP",
    symbol: "TISP",
    totalSupply: 1,
    fractionPrice: 95.75,
    wholePropertyPrice: 2500000,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Terreno completo pronto para construção no litoral de São Paulo. Área privilegiada com vista para o mar.",
    marketCap: 2500000,
    volume24h: 120000,
    priceChange24h: 2.3,
    totalFractions: 800,
    availableFractions: 0,
    holders: 1,
    location: "Guarujá, São Paulo, SP",
    area: 800,
    propertyType: "Terreno",
    yearBuilt: null,
    isWholeProperty: true
  },
  {
    id: "11",
    name: "Fazenda Completa MT",
    symbol: "FCMT",
    totalSupply: 1,
    fractionPrice: 185.30,
    wholePropertyPrice: 8500000,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800",
    description: "Fazenda completa pronta para operação em Mato Grosso. Infraestrutura completa e alta produtividade.",
    marketCap: 8500000,
    volume24h: 350000,
    priceChange24h: 1.7,
    totalFractions: 3000,
    availableFractions: 0,
    holders: 1,
    location: "Sinop, Mato Grosso, MT",
    area: 5000000, // em m²
    propertyType: "Fazenda",
    yearBuilt: 2015,
    isWholeProperty: true
  }
];
