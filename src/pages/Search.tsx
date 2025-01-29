import { useLocation } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { SearchFilters, type SearchFilters as FilterType } from "@/components/SearchFilters";
import { HotelCard } from "@/components/HotelCard";
import { useState } from "react";

// Mock data for demonstration
const mockHotels = [
  {
    id: "1",
    name: "Grand Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    location: "New York, USA",
    price: 299,
    rating: 8.9,
    stars: 5,
    amenities: ["Wi-Fi", "Pool", "Spa"]
  },
  {
    id: "2",
    name: "Seaside Resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    location: "Miami, USA",
    price: 199,
    rating: 8.5,
    stars: 4,
    amenities: ["Wi-Fi", "Pool"]
  },
  // Add more mock hotels as needed
];

const Search = () => {
  const location = useLocation();
  const searchParams = location.state;
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const handleFilterChange = (filters: FilterType) => {
    const filtered = mockHotels.filter(hotel => {
      const priceMatch = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
      const starsMatch = filters.stars.length === 0 || filters.stars.includes(hotel.stars);
      const amenitiesMatch = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return priceMatch && starsMatch && amenitiesMatch;
    });
    
    setFilteredHotels(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-booking-primary py-6">
        <SearchBar />
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  image={hotel.image}
                  location={hotel.location}
                  price={hotel.price}
                  rating={hotel.rating}
                  stars={hotel.stars}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;