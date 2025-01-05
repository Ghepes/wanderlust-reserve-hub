import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-booking-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Booking.com
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:text-booking-accent">
            List your property
          </Button>
          <Button className="bg-booking-accent text-booking-primary hover:bg-booking-accent/90">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};