import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wifi, Tv, Coffee, Bath } from "lucide-react";
import { toast } from "sonner";

interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  size: string;
}

const RoomRates = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API
  const roomTypes: RoomType[] = [
    {
      id: "1",
      name: "Deluxe Room",
      capacity: 2,
      price: 199,
      amenities: ["Free WiFi", "TV", "Coffee maker", "Private bathroom"],
      size: "28m²",
    },
    {
      id: "2",
      name: "Superior Room",
      capacity: 3,
      price: 259,
      amenities: ["Free WiFi", "TV", "Coffee maker", "Private bathroom", "City view"],
      size: "32m²",
    },
  ];

  const handleBook = (roomId: string) => {
    navigate("/booking", {
      state: {
        hotelId,
        roomId,
      }
    });
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
    <div className="min-h-screen bg-gray-50 p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Select Your Room</h1>
        
        <div className="space-y-6">
          {roomTypes.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{room.name}</h2>
                  <p className="text-gray-600">Room size: {room.size}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${room.price}</p>
                  <p className="text-gray-600">per night</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full bg-booking-accent text-booking-primary hover:bg-booking-accent/90"
                onClick={() => handleBook(room.id)}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomRates;