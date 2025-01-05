import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedHotels } from "@/components/FeaturedHotels";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-booking-primary h-[300px] relative">
        <div className="container mx-auto pt-20">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Find your next stay
            </h1>
            <p className="text-xl">
              Search deals on hotels, homes, and much more...
            </p>
          </div>
        </div>
      </div>

      <SearchBar />
      <FeaturedHotels />
    </div>
  );
};

export default Index;