
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
    
    // Clean up previous map if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }
    
    // Get coordinates based on token location
    const coordinates = getLocationCoordinates(token.location);
    
    console.log(`Rendering map for ${token.name} at location: ${token.location}`);
    console.log(`Coordinates: ${coordinates}`);
    
    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false, // We'll add zoom control separately
      scrollWheelZoom: false, // Disable scroll zoom initially
      dragging: true, // Enable dragging
      tap: false, // Disable tap (for mobile)
    }).setView(coordinates, 14);
    
    mapInstanceRef.current = map;
    
    // Add tile layer with better styling
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
    
    // Create custom icon for property location
    const propertyIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
    
    // Add marker with enhanced popup
    const popupContent = `
      <div class="p-3 font-medium">
        <div class="font-bold text-base mb-1">${token.name}</div>
        <div class="text-sm mb-1">${token.location}</div>
        <div class="text-xs flex items-center mt-2">
          <span class="bg-primary/10 text-primary px-2 py-1 rounded-full">${token.propertyType}</span>
          <span class="ml-2 text-gray-500">${token.area}m²</span>
        </div>
      </div>
    `;
    
    L.marker(coordinates, { icon: propertyIcon })
      .addTo(map)
      .bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: true,
        maxWidth: 300,
        minWidth: 200,
      })
      .openPopup();
    
    // Add zoom control in a better position
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    
    // Add a faint circle around the marker to indicate the area
    L.circle(coordinates, {
      color: 'var(--primary)',
      fillColor: 'var(--primary)',
      fillOpacity: 0.1,
      weight: 1,
      radius: 300
    }).addTo(map);
    
    // Enable scroll zoom after 1 second (to prevent accidental zooming when scrolling the page)
    setTimeout(() => {
      map.scrollWheelZoom.enable();
    }, 1000);
    
    // Clean up on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [token]);
  
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden border border-border shadow-lg h-[400px] z-10 bg-card/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div ref={mapRef} className="h-full w-full" />
      
      <div className="absolute top-3 left-3 glassmorphism rounded-md px-4 py-2 text-sm font-medium flex items-center shadow-md">
        <MapPin className="h-4 w-4 mr-2 text-primary" />
        <span>{token.location || 'Localização'}</span>
      </div>
      
      <div className="absolute bottom-3 right-3 glassmorphism rounded-md px-3 py-1 text-xs font-medium">
        Clique e arraste para mover o mapa
      </div>
    </motion.div>
  );
};

export default TokenMap;
