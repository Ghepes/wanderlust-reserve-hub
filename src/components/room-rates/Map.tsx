import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
}

const Map = ({ latitude, longitude, hotelName }: MapProps) => {
  const [googleMapsKey, setGoogleMapsKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem'
  };

  const center = {
    lat: latitude,
    lng: longitude
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  };

  const handleInitializeMap = () => {
    if (googleMapsKey) {
      setIsMapInitialized(true);
    }
  };

  if (!isMapInitialized) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please enter your Google Maps API key to view the map. 
            You can get one at{' '}
            <a 
              href="https://console.cloud.google.com/google/maps-apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
          <Input
            type="text"
            placeholder="Enter your Google Maps API key"
            value={googleMapsKey}
            onChange={(e) => setGoogleMapsKey(e.target.value)}
          />
          <Button onClick={handleInitializeMap} className="w-full">
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <div className="aspect-square relative">
        <LoadScript googleMapsApiKey={googleMapsKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={options}
          >
            <Marker
              position={center}
              onClick={() => setShowInfoWindow(true)}
            >
              {showInfoWindow && (
                <InfoWindow
                  position={center}
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div>
                    <h3 className="font-semibold">{hotelName}</h3>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;