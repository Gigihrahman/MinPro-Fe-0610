import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
interface SelectProps {
  id: number;
  name: string;
  slug: string;
}
interface CardFilterProps {
  value: string; // Tambahkan properti `value` untuk mengikat ke nilai yang dipilih
  onChange: (value: string) => void;
  data: SelectProps[] | undefined;
  label: string;
}

const CardFilter: FC<CardFilterProps> = ({ value, onChange, data, label }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      {" "}
      {/* Menambahkan value di Select */}
      <SelectTrigger className="w-[300px] bg-white/90 backdrop-blur-sm text-gray-800 border-0 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 shadow-md px-4 py-3 transition-all duration-200">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent className="bg-white/95 border-0 rounded-lg shadow-lg overflow-hidden">
        <SelectGroup>
          <SelectLabel className="text-indigo-800 font-medium px-2 py-1.5 text-sm">
            {label}
          </SelectLabel>
          {data &&
            data.map((item) => {
              return (
                <SelectItem
                  key={item.id}
                  value={item.slug}
                  className="text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 focus:bg-gradient-to-r focus:from-indigo-100 focus:to-purple-100 rounded-md mx-1 my-0.5 transition-colors duration-150"
                >
                  {item.name}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CardFilter;
