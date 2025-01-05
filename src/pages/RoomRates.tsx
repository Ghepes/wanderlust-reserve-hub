import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Wifi, Tv, Coffee, Bath, MapPin, Star, MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";

interface RoomType {
  id: string;
  name: string;
  capacity: number;
  basePrice: number;
  images: string[];
  amenities: string[];
  size: string;
  description: string;
}

const RoomRates = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

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
      description: "Spacious apartment with modern amenities and city views"
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

  const handleBook = (roomId: string) => {
    navigate("/booking", {
      state: {
        hotelId,
        roomId,
      }
    });
  };

  const calculatePrice = (basePrice: number, adults: number, children: number) => {
    const adultPrice = basePrice;
    const childPrice = basePrice * 0.5;
    return adultPrice * adults + childPrice * children;
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi className="w-4 h-4" />;
      case "TV":
        return <Tv className="w-4 h-4" />;
      case "Coffee maker":
        return <Coffee className="w-4 h-4" />;
      case "Private bathroom":
        return <Bath className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {roomTypes.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg mb-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="col-span-2 aspect-video">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-2">
                {room.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-video">
                    <img
                      src={image}
                      alt={`${room.name} view ${index + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Room Details */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Guest Selection */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold">Select Guests</h3>
                  <div className="flex gap-4">
                    <div className="w-32">
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <Users className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Adults" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Adult' : 'Adults'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32">
                      <Select defaultValue="0">
                        <SelectTrigger>
                          <Users className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Children" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Child' : 'Children'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Price and Booking */}
                <div className="bg-booking-primary/10 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xl font-bold">From ${room.basePrice}</p>
                      <p className="text-sm text-gray-600">per night</p>
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

              {/* Map and Location */}
              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <div className="aspect-square relative">
                    {/* Map would go here - using placeholder for now */}
                    <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Guest Reviews
                  </h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                          {review.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-gray-600">{review.country}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          <Star className="h-4 w-4 fill-booking-accent text-booking-accent" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-gray-600">{property.location}</p>
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
      </div>

      {/* Footer */}
      <footer className="bg-booking-secondary text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>About Booking.com</li>
                <li>Careers</li>
                <li>Press Center</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>Customer Service</li>
                <li>Partner Help</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Support</li>
                <li>Affiliate Program</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p>&copy; 2024 Booking.com™. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoomRates;