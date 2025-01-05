import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dates } = location.state || {};

  const handleBooking = () => {
    toast.success("Booking confirmed! Thank you for choosing us.");
    navigate("/");
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

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Your Stay</h2>
              <p className="text-gray-600">
                Check-in: {dates?.from ? format(dates.from, "PPP") : "Not selected"}
              </p>
              <p className="text-gray-600">
                Check-out: {dates?.to ? format(dates.to, "PPP") : "Not selected"}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Price Details</h2>
              <p className="text-gray-600">Room rate: $199/night</p>
              <p className="text-gray-600">Taxes & fees: $30</p>
              <p className="font-semibold mt-2">Total: $229</p>
            </div>
          </div>

          <Button 
            className="w-full bg-booking-accent text-booking-primary hover:bg-booking-accent/90"
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;