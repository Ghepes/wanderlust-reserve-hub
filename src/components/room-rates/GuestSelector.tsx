import React from 'react';
import { Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuestSelectorProps {
  onGuestsChange: (adults: number, children: number) => void;
}

const GuestSelector = ({ onGuestsChange }: GuestSelectorProps) => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="font-semibold">Select Guests</h3>
      <div className="flex gap-4">
        <div className="w-32">
          <Select 
            defaultValue="2" 
            onValueChange={(value) => onGuestsChange(parseInt(value), 0)}
          >
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
          <Select 
            defaultValue="0"
            onValueChange={(value) => onGuestsChange(2, parseInt(value))}
          >
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
  );
};

export default GuestSelector;