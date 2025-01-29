import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import RoomRates from "./pages/RoomRates";
import VendorAuth from "./pages/auth/VendorAuth";
import VendorDashboard from "./pages/vendor/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/hotel/:hotelId/rates" element={<RoomRates />} />
          <Route path="/vendor/auth" element={<VendorAuth />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;