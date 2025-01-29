import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  priceRange: [number, number];
  stars: number[];
  amenities: string[];
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    "Wi-Fi",
    "Pool",
    "Spa",
    "Gym",
    "Restaurant",
    "Room Service",
    "Parking",
    "Air Conditioning"
  ];

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    updateFilters({ priceRange: range, stars: selectedStars, amenities: selectedAmenities });
  };

  const handleStarChange = (star: number) => {
    const updatedStars = selectedStars.includes(star)
      ? selectedStars.filter(s => s !== star)
      : [...selectedStars, star];
    setSelectedStars(updatedStars);
    updateFilters({ priceRange, stars: updatedStars, amenities: selectedAmenities });
  };

  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updatedAmenities);
    updateFilters({ priceRange, stars: selectedStars, amenities: updatedAmenities });
  };

  const updateFilters = (filters: SearchFilters) => {
    onFilterChange(filters);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Price Range</h4>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Star Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <Checkbox
                    id={`star-${star}`}
                    checked={selectedStars.includes(star)}
                    onCheckedChange={() => handleStarChange(star)}
                  />
                  <Label htmlFor={`star-${star}`}>{star} Stars</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Amenities</h4>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};