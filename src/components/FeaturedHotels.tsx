import { HotelCard } from "./HotelCard";

export const FeaturedHotels = () => {
  const hotels = [
    {
      id: "1",
      name: "Downtown Synagogue",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      location: "Budapest, Hungary",
      price: 217,
      rating: 8.4,
      stars: 4
    },
    {
      id: "2",
      name: "Luxury Riverside Hotel",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      location: "Budapest, Hungary",
      price: 255,
      rating: 9.2,
      stars: 5
    },
    {
      id: "3",
      name: "Riverside Luxury Hotel",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      location: "Budapest, Hungary",
      price: 245,
      rating: 9.1,
      stars: 5
    },
    {
      id: "4",
      name: "Historic Palace Hotel",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      location: "Budapest, Hungary",
      price: 280,
      rating: 9.3,
      stars: 5
    },
    {
      id: "5",
      name: "Modern Design Hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      location: "Budapest, Hungary",
      price: 185,
      rating: 8.9,
      stars: 4
    }
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} {...hotel} />
        ))}
      </div>
    </section>
  );
};