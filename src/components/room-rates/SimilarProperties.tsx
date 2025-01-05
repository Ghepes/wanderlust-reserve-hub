import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  stars: number;
}

interface SimilarPropertiesProps {
  properties: Property[];
}

const SimilarProperties = ({ properties }: SimilarPropertiesProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{property.name}</h3>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {property.location}
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-booking-accent text-booking-accent" />
                  <span>{property.rating}</span>
                </div>
                <p className="font-bold">From ${property.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;