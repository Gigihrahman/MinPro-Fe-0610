interface EventTitleProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventTitle = ({ value, onChange, name }: EventTitleProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="title" className="block text-sm font-medium">
        Event Title
      </label>
      <input
        type="text"
        id="title"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border p-2"
        placeholder="Enter event title"
      />
    </div>
  );
};

export default EventTitle;
