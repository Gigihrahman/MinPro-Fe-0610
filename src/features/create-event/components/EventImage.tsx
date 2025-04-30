interface EventImageProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  onRemoveImage: () => void; // Add a callback for removing the image
}

const EventImage = ({
  onImageUpload,
  imagePreview,
  onRemoveImage,
}: EventImageProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="image" className="block text-sm font-medium">
        Event Image
      </label>
      <div className="flex items-center gap-4">
        {/* Display the "Upload Image" button if no image is uploaded */}
        {!imagePreview && (
          <div className="flex h-40 w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />
            <button
              type="button"
              className="rounded-md border bg-gray-100 p-2 text-sm text-gray-700"
              onClick={() => document.getElementById("image")?.click()}
            >
              Upload Image
            </button>
          </div>
        )}

        {/* Display the image preview and remove button if an image is uploaded */}
        {imagePreview && (
          <div className="relative flex h-150 w-150 items-center justify-center overflow-hidden rounded-md md:ml-24">
            <img
              src={imagePreview}
              alt="Event preview"
              className="max-h-full max-w-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white"
              onClick={onRemoveImage}
            >
              X
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Recommended size: 1200x600px. Max file size: 5MB
      </p>
    </div>
  );
};

export default EventImage;
