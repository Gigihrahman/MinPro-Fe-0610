// features/create-event/components/EventDescription.tsx
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EventDescriptionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  value,
  onChange,
  name,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-indigo-100">
        Deskripsi Event
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Masukkan deskripsi singkat tentang event yang akan diadakan"
        className="resize-none"
        rows={4}
      />
      <p className="text-xs text-indigo-300 mt-1">
        Berikan deskripsi singkat yang menarik tentang event Anda
      </p>
    </div>
  );
};

export default EventDescription;
