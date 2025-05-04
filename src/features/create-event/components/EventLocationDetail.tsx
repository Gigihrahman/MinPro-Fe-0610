// features/create-event/components/EventLocationDetail.tsx
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EventLocationDetailProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
}

const EventLocationDetail: React.FC<EventLocationDetailProps> = ({
  value,
  onChange,
  name,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-indigo-100">
        Detail Lokasi
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Masukkan detail lokasi atau alamat lengkap event"
        className="resize-y bg-indigo-950/30 border border-indigo-700/30 text-white placeholder:text-indigo-300/50 focus:ring-indigo-400"
        rows={3}
      />
      <p className="text-xs text-indigo-300 mt-1">
        Berikan informasi lengkap tentang lokasi seperti nama gedung, lantai,
        atau petunjuk tambahan
      </p>
    </div>
  );
};

export default EventLocationDetail;
