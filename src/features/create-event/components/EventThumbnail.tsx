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
      <div className="flex items-center justify-center gap-4">
        {/* Display the "Upload Image" section if no image is uploaded */}
        {!imagePreview && (
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300/50 bg-indigo-900/30 p-6 transition-all duration-300 hover:border-indigo-400/70 hover:bg-indigo-800/40">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />

            <svg
              className="h-12 w-12 text-indigo-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <p className="mb-2 text-sm text-indigo-200">
              Klik untuk upload atau seret gambar ke sini
            </p>

            <button
              type="button"
              className="mt-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              onClick={() => document.getElementById("image")?.click()}
            >
              Pilih Gambar
            </button>
          </div>
        )}

        {/* Display the image preview and remove button if an image is uploaded */}
        {imagePreview && (
          <div className="relative w-full overflow-hidden rounded-lg border border-indigo-500/30 bg-indigo-900/20">
            <div className="flex items-center justify-center p-2">
              <img
                src={imagePreview}
                alt="Preview Event"
                className="max-h-64 rounded object-cover shadow-lg"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:bg-indigo-900/60 hover:opacity-100">
              <button
                type="button"
                className="rounded-full bg-red-600 p-3 text-white shadow-lg transition-all duration-200 hover:bg-red-700"
                onClick={onRemoveImage}
                aria-label="Hapus gambar"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-indigo-200">
        Ukuran yang direkomendasikan: 1200x600px. Maksimal: 5MB
      </p>
    </div>
  );
};

export default EventThumbnail;
