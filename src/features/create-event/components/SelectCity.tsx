import React from "react";
import { ChevronDown } from "lucide-react";
import { City } from "@/types/city";

interface SelectCityProps {
  value: number; // The value will now be a number representing the city id
  onChange: (value: number) => void; // onChange expects a number (city id)
  city: City[]; // Updated data type
  name?: string;
}

const SelectCity = ({
  value,
  onChange,
  city,
  name = "city",
}: SelectCityProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-indigo-100"
      >
        Pilih Kota
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value} // Ensure value is a string for the select element
          onChange={(e) => onChange(Number(e.target.value))} // Convert string to number on change
          className="w-full bg-indigo-950/30 border border-indigo-700/30 rounded-md py-2.5 pl-4 pr-10 text-white 
                    appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400
                    shadow-sm hover:border-indigo-600 transition-colors duration-200"
        >
          <option value="" disabled className="bg-indigo-900 text-indigo-200">
            Pilih kota
          </option>
          {city.map((item) => (
            <option
              key={item.id} // Use item.id as the key
              value={item.id} // Use item.id as the value for the option
              className="bg-indigo-900 text-white"
            >
              {item.name} {/* Display the name of the city */}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-indigo-300" />
        </div>
      </div>
      <p className="text-xs text-indigo-300 mt-1">
        Pilih kota tempat event akan diselenggarakan
      </p>
    </div>
  );
};

export default SelectCity;
