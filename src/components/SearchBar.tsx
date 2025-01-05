import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export const SearchBar = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto -mt-8 relative z-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input 
          placeholder="Where are you going?"
          className="md:col-span-1"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal md:col-span-1"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="md:col-span-1">
          <Users className="mr-2 h-4 w-4" />
          2 adults · 0 children
        </Button>

        <Button className="bg-booking-accent text-booking-primary hover:bg-booking-accent/90 md:col-span-1">
          Search
        </Button>
      </div>
    </div>
  );
};