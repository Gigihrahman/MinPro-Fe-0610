import * as React from "react";
import { format } from "date-fns";

interface DateTimePicker24hProps {
  label: string;
  value: Date | null;
  handleInputChange: (newDate: Date) => void;
}

export function DateTimePicker24h({
  label,
  value,
  handleInputChange,
}: DateTimePicker24hProps) {
  // Create a working copy of the date to avoid direct mutations
  const [workingDate, setWorkingDate] = React.useState<Date>(() => {
    return value ? new Date(value) : new Date();
  });

  // Update working date when the value prop changes
  React.useEffect(() => {
    if (value) {
      setWorkingDate(new Date(value));
    }
  }, [value]);

  // Convert Date to ISO string for input type "datetime-local"
  const getISOString = (date: Date): string => {
    // Get the local date string
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    return localDate.toISOString().slice(0, 16); // Return YYYY-MM-DDTHH:MM format
  };

  // Apply changes to the working date and notify parent
  const applyChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setWorkingDate(newDate);
    handleInputChange(newDate);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="startDateTime" className="block text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-col">
        <input
          type="datetime-local"
          value={getISOString(workingDate)}
          onChange={applyChanges}
          className="rounded border p-2"
        />
      </div>
    </div>
  );
}
