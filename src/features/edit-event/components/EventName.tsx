interface EventNameProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventName = ({ value, onChange, name }: EventNameProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="title" className="block text-sm font-medium text-white">
        Judul Event
      </label>
      <input
        type="text"
        id="title"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border border-indigo-500/30 bg-white/10 p-3 text-white placeholder-indigo-200/70 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm transition-all duration-200"
        placeholder="Masukkan judul event"
      />
    </div>
  );
};

export default EventName;
