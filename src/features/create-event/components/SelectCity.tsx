interface SelectCityProps {
  value: string;
  onChange: (value: string) => void;
  data: string[];
}

const SelectCity = ({ value, onChange, data }: SelectCityProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="category" className="block text-sm font-medium">
        Select City
      </label>
      <select
        id="category"
        name="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border p-2"
      >
        <option value="">Select category</option>
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCity;
