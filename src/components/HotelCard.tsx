import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HotelCardProps {
  name: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  stars: number;
}

export const HotelCard = ({ name, image, location, price, rating, stars }: HotelCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-booking-accent text-booking-accent" />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        <div className="flex items-center justify-between">
          <div className="bg-booking-success/10 text-booking-success px-2 py-1 rounded">
            {rating}/10
          </div>
          <p className="text-xl font-bold">${price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-booking-primary hover:bg-booking-secondary">
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
};