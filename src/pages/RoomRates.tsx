import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ImageGallery from "@/components/room-rates/ImageGallery";
import GuestSelector from "@/components/room-rates/GuestSelector";
import Reviews from "@/components/room-rates/Reviews";
import SimilarProperties from "@/components/room-rates/SimilarProperties";
import Footer from "@/components/room-rates/Footer";
import Map from "@/components/room-rates/Map";
import { useState } from "react";

interface RoomType {
  id: string;
  name: string;
  capacity: number;
  basePrice: number;
  images: string[];
  amenities: string[];
  size: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const RoomRates = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // This would typically come from an API
  const roomTypes: RoomType[] = [
    {
      id: "1",
      name: "Deluxe Apartment",
      capacity: 4,
      basePrice: 217,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
      ],
      amenities: ["Free WiFi", "TV", "Coffee maker", "Private bathroom", "Balcony", "Kitchen"],
      size: "120m²",
      description: "Spacious apartment with modern amenities and city views",
      location: {
        latitude: 47.497912,
        longitude: 19.040235
      }
    }
  ];

  const similarProperties = [
    {
      id: "2",
      name: "City Center Suite",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      location: "Budapest, Hungary",
      price: 199,
      rating: 8.8,
      stars: 4
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

  const reviews = [
    {
      id: "1",
      author: "Sofia",
      country: "Argentina",
      rating: 8.4,
      comment: "The apartment is really big! We were a group of 7 and we were more than comfortable. Good communication with the host at all times."
    }
  ];

  const handleGuestsChange = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);
  };

  const calculatePrice = (basePrice: number) => {
    const adultPrice = basePrice;
    const childPrice = basePrice * 0.5;
    return adultPrice * adults + childPrice * children;
  };

  const handleBook = (roomId: string) => {
    navigate("/booking", {
      state: {
        hotelId,
        roomId,
        adults,
        children,
        totalPrice: calculatePrice(roomTypes[0].basePrice)
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const room = roomTypes[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-lg mb-8">
          <ImageGallery images={room.images} name={room.name} />

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
              <p className="text-gray-600 mb-4">{room.description}</p>
              
              <GuestSelector onGuestsChange={handleGuestsChange} />

              <div className="bg-booking-primary/10 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xl font-bold">${calculatePrice(room.basePrice)}</p>
                    <p className="text-sm text-gray-600">Total for {adults + children} guests</p>
                  </div>
                  <Button 
                    className="bg-booking-accent text-booking-primary hover:bg-booking-accent/90"
                    onClick={() => handleBook(room.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Map 
                latitude={room.location.latitude}
                longitude={room.location.longitude}
                hotelName={room.name}
              />
              <Reviews reviews={reviews} />
            </div>
          </div>
        </div>

        <SimilarProperties properties={similarProperties} />
      </div>

      <Footer />
    </div>
  );
};

export default RoomRates;
