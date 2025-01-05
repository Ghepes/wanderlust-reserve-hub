import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const handleSearch = () => {
    if (!searchQuery) {
      return;
    }
    
    navigate("/search", {
      state: {
        query: searchQuery,
        dates: date,
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto -mt-8 relative z-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input 
          placeholder="Where are you going? (city, country, or hotel)"
          className="md:col-span-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal md:col-span-1"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  format(date.from, "LLL dd")
                )
              ) : (
                <span>Pick dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="md:col-span-1">
          <Users className="mr-2 h-4 w-4" />
          2 adults · 0 children
        </Button>

        <Button 
          className="bg-booking-accent text-booking-primary hover:bg-booking-accent/90 md:col-span-1"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};