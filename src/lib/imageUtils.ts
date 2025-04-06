// Utility function to get fallback images based on property type
export const getImageForType = (type: string | undefined): string => {
  switch (type?.toLowerCase()) {
    case "apartamento":
      return "https://images.unsplash.com/photo-1598928506311-f4fe0afa1bd6";
    case "casa":
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
    case "flat":
      return "https://images.unsplash.com/photo-1599423300746-b62533397364";
    case "rural":
    case "fazenda":
    case "agro":
      return "https://images.unsplash.com/photo-1566438480900-0609be27a4be";
    default:
      return "https://images.unsplash.com/photo-1501183638710-841dd1904471";
  }
};

// Get property icon based on type
export const getPropertyIcon = (type: string | undefined): string => {
  switch (type?.toLowerCase()) {
    case "apartamento":
      return "🏢";
    case "casa":
      return "🏡";
    case "flat":
      return "🏨";
    case "comercial":
      return "🏪";
    case "industrial":
      return "🏭";
    case "terreno":
      return "📍";
    case "rural":
      return "🌾";
    case "fazenda":
      return "🌱";
    default:
      return "🏠";
  }
};

// Get property description based on type
export const getPropertyDescription = (type: string | undefined): string => {
  switch (type?.toLowerCase()) {
    case "apartamento":
      return "Unidade residencial em prédio multifamiliar";
    case "casa":
      return "Imóvel residencial unifamiliar";
    case "flat":
      return "Apartamento com serviços de hotelaria";
    case "comercial":
      return "Imóvel para uso comercial ou varejo";
    case "industrial":
      return "Galpão ou espaço para operações industriais";
    case "terreno":
      return "Lote sem construção com potencial para desenvolvimento";
    case "rural":
      return "Terreno em zona rural para diversos usos";
    case "fazenda":
      return "Propriedade rural produtiva";
    default:
      return "Imóvel tokenizado";
  }
};

// Get approximate location coordinates based on location name
export const getLocationCoordinates = (location: string | undefined): [number, number] => {
  // Default to Brazil center if no location provided
  if (!location) return [-51.9253, -14.2350];
  
  // Map of common locations to coordinates
  const locationMap: Record<string, [number, number]> = {
    "São Paulo, SP": [-46.6333, -23.5505],
    "Rio de Janeiro, RJ": [-43.1729, -22.9068],
    "Brasília, DF": [-47.9292, -15.7801],
    "Salvador, BA": [-38.5108, -12.9711],
    "Fortaleza, CE": [-38.5266, -3.7319],
    "Belo Horizonte, MG": [-43.9352, -19.9208],
    "Manaus, AM": [-60.0261, -3.1190],
    "Curitiba, PR": [-49.2671, -25.4195],
    "Recife, PE": [-34.8770, -8.0476],
    "Goiânia, GO": [-49.2647, -16.6864],
    "Belém, PA": [-48.4902, -1.4558],
    "Porto Alegre, RS": [-51.2177, -30.0346],
    "Guarulhos, SP": [-46.5333, -23.4628],
    "Campinas, SP": [-47.0626, -22.9056],
    "São Luís, MA": [-44.3028, -2.5297],
    "Minas Gerais": [-44.3800, -18.5122],
    "Goiás": [-49.8362, -15.9278],
    "Litoral Norte, SP": [-45.4041, -23.7715],
  };
  
  // Check for exact match
  for (const [key, coords] of Object.entries(locationMap)) {
    if (location.includes(key)) return coords;
  }
  
  // Check for partial matches
  for (const [key, coords] of Object.entries(locationMap)) {
    const parts = key.split(", ");
    if (parts.some(part => location.includes(part))) return coords;
  }
  
  // Default to Brazil center
  return [-51.9253, -14.2350];
};
