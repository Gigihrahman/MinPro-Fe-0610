import { Category } from "@/types/category";

interface EventCategoryProps {
  value: number;
  name: string;
  onChange: (value: number) => void;
  categories: Category[];
}

const EventCategory = ({
  value,
  onChange,
  name,
  categories,
}: EventCategoryProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-white"
      >
        Kategori Event
      </label>
      <div className="relative">
        <select
          id="category"
          name={name}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))} // Convert string value to number
          className="mt-1 block w-full appearance-none rounded-md border border-indigo-500/30 bg-white/10 p-3 text-white placeholder-indigo-200/70 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm transition-all duration-200 pr-10"
        >
          <option value={0} className="bg-indigo-900 text-white">
            Pilih kategori
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="bg-indigo-900 text-white"
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
