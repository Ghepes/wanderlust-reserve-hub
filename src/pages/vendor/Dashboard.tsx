import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/vendor/auth");
        return;
      }

      const { data: vendor, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching vendor data:", error);
        return;
      }

      setVendorData(vendor);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/vendor/auth");
  };

  if (!vendorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Company Name:</span> {vendorData.company_name}</p>
              <p><span className="font-medium">VAT Number:</span> {vendorData.vat_number}</p>
              <p><span className="font-medium">Contact Name:</span> {vendorData.contact_name}</p>
              <p><span className="font-medium">Phone:</span> {vendorData.phone}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button 
                className="w-full"
                onClick={() => navigate("/vendor/rooms")}
              >
                Manage Rooms
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate("/vendor/profile")}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}