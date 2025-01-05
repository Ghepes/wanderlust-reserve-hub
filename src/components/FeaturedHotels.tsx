import { HotelCard } from "./HotelCard";

const FEATURED_HOTELS = [
  {
    name: "Grand Hotel Plaza",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Rome, Italy",
    price: 299,
    rating: 9.2,
    stars: 5,
  },
  {
    name: "Seaside Resort & Spa",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Maldives",
    price: 599,
    rating: 9.8,
    stars: 5,
  },
  {
    name: "Mountain View Lodge",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Swiss Alps",
    price: 199,
    rating: 8.9,
    stars: 4,
  },
  {
    name: "Urban Boutique Hotel",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "New York, USA",
    price: 399,
    rating: 9.1,
    stars: 5,
  },
];

export const FeaturedHotels = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_HOTELS.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
        ))}
      </div>
    </div>
  );
};