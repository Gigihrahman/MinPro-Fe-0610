"use client";
import useUploadProofment from "@/hooks/transaction/useUploadProofment";
import React, { useState } from "react";

interface FileUploadProps {
  orderId: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ orderId }) => {
  const [file, setFile] = useState<File | null>(null); // Store the actual file here
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: uploadProofment } = useUploadProofment(orderId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const handleUploadClick = async () => {
    if (file) {
      setIsLoading(true);
      try {
        await uploadProofment({ thumbnail: file });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload File</h3>
      <div className="space-y-4">
        {!imagePreview && (
          <div>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition duration-200 ease-in-out w-full text-center block"
            >
              Choose a file
            </label>
          </div>
        )}

        {imagePreview && (
          <div className="mt-3">
            <p className="text-gray-700">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-full h-auto rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="mt-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Remove Image
            </button>
          </div>
        )}

        {file && !imagePreview && (
          <div className="mt-3">
            <p className="text-gray-700">Selected File: {file.name}</p>
          </div>
        )}

        <div>
          <button
            onClick={handleUploadClick}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-full disabled:bg-gray-400 hover:bg-green-700 transition duration-200 ease-in-out"
            disabled={isLoading || !file}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
