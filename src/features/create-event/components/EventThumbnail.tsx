import React from "react";
import { Upload, Trash } from "lucide-react";

interface EventThumbnailProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  onRemoveImage: () => void;
}

const EventThumbnail = ({
  onImageUpload,
  imagePreview,
  onRemoveImage,
}: EventThumbnailProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor="image" className="block text-sm font-medium text-white">
        Gambar Event
      </label>

      {/* Upload area or preview */}
      <div className="flex items-center justify-center">
        {/* Display the "Upload Image" section if no image is uploaded */}
        {!imagePreview && (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-300/50 bg-purple-900/30 p-6 transition-all duration-300 hover:border-purple-400/70 hover:bg-purple-800/40 group">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />

            <div className="mb-3 rounded-full bg-purple-800/60 p-3 group-hover:bg-purple-700 transition-all duration-200">
              <Upload className="h-8 w-8 text-purple-200" />
            </div>

            <p className="mb-2 text-center text-purple-200">
              Klik untuk upload atau seret gambar ke sini
            </p>

            <button
              type="button"
              className="mt-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-indigo-600 hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              onClick={() => document.getElementById("image")?.click()}
            >
              Pilih Gambar
            </button>
          </div>
        )}

        {/* Display the image preview and remove button if an image is uploaded */}
        {imagePreview && (
          <div className="relative w-full overflow-hidden rounded-lg border border-purple-500/30 bg-purple-900/20">
            <div className="flex items-center justify-center p-4">
              <img
                src={imagePreview}
                alt="Preview Event"
                className="max-h-80 rounded-lg object-cover shadow-lg"
              />
            </div>

            <div className="p-4 flex justify-between items-center bg-purple-950/50 border-t border-purple-600/30">
              <p className="text-sm text-purple-200 truncate flex-1">
                Event Thumbnail
              </p>
              
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-red-600/80 px-3 py-2 text-white shadow-lg transition-all duration-200 hover:bg-red-700"
                onClick={onRemoveImage}
                aria-label="Hapus gambar"
              >
                <Trash className="h-4 w-4" />
                <span className="text-sm">Hapus</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-purple-200 mt-2">
        Ukuran yang direkomendasikan: 1200x600px. Maksimal: 5MB
      </p>
    </div>
  );
};

export default EventThumbnail;