
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
