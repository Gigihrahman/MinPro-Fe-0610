interface EventCategoryProps {
  value: string;
  name: string;
  onChange: (value: string) => void;
}

const EventCategory = ({ value, onChange, name }: EventCategoryProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="category" className="block text-sm font-medium">
        Category
      </label>
      <select
        id="category"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border p-2"
      >
        <option value="">Select category</option>
        <option value="music">Music</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="art">Art</option>
        <option value="food">Food</option>
        <option value="health">Health</option>
        <option value="sports">Sports</option>
        <option value="education">Education</option>
        <option value="entertainment">Entertainment</option>
        <option value="fashion">Fashion</option>
      </select>
    </div>
  );
};

export default EventCategory;
