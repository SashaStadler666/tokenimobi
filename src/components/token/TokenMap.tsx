
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Token } from '@/lib/models';
import { getLocationCoordinates } from '@/lib/imageUtils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TokenMapProps {
  token: Token;
}

const TokenMap = ({ token }: TokenMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Limpar mapa anterior se existir
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }
    
    // Obter coordenadas baseadas na localização do token
    const coordinates = getLocationCoordinates(token.location);
    
    // Inicializar mapa
    const map = L.map(mapRef.current).setView(coordinates, 12);
    mapInstanceRef.current = map;
    
    // Adicionar camada de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Criar ícone customizado baseado no tipo de propriedade
    const propertyIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
    
    // Adicionar marcador
    L.marker(coordinates, { icon: propertyIcon })
      .addTo(map)
      .bindPopup(`<b>${token.name}</b><br>${token.location || 'Localização aproximada'}`)
      .openPopup();
    
    // Adicionando controle de zoom
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    
    // Desabilitar scroll zoom para evitar conflitos
    map.scrollWheelZoom.disable();
    
    // Limpar ao desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [token]);
  
  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden border border-border shadow-lg h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div ref={mapRef} className="h-full w-full" />
      
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-foreground/20 backdrop-blur-sm rounded-md px-3 py-1.5 text-sm font-medium flex items-center shadow-md">
        <MapPin className="h-4 w-4 mr-1 text-primary" />
        <span>{token.location || 'Localização aproximada'}</span>
      </div>
    </motion.div>
  );
};

export default TokenMap;
