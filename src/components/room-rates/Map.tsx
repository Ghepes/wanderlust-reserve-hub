import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
}

const Map = ({ latitude, longitude, hotelName }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 14
      });

      // Add marker
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${hotelName}</h3>`))
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please enter your Mapbox public token to view the map. 
            You can get one at <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
          </p>
          <Input
            type="text"
            placeholder="Enter your Mapbox token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={initializeMap} className="w-full">
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <div className="aspect-square relative">
        <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      </div>
    </div>
  );
};

export default Map;