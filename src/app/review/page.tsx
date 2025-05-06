"use client";
import { useState } from "react";

const ReviewForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    console.log("Review submitted:", { comment, rating });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-semibold text-white mb-6">Berikan Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-indigo-800 text-lg mb-2"
          >
            Komentar:
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Tulis komentar di sini..."
            required
            className="w-full bg-white/90 text-gray-800 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 backdrop-blur-sm"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block text-indigo-800 text-lg mb-2"
          >
            Rating (Bintang):
          </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            required
            className="w-full bg-white/90 text-gray-800 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 backdrop-blur-sm hover:from-indigo-50 hover:to-purple-50 focus:from-indigo-100 focus:to-purple-100"
          >
            <option value={0} disabled>
              Pilih Rating
            </option>
            <option value={1}>1 Bintang</option>
            <option value={2}>2 Bintang</option>
            <option value={3}>3 Bintang</option>
            <option value={4}>4 Bintang</option>
            <option value={5}>5 Bintang</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        >
          Kirim Review
        </button>
      </form>

      {isSubmitted && (
        <div className="mt-6 text-green-500">
          <h3 className="text-xl font-semibold">
            Terima kasih atas review Anda!
          </h3>
          <p>
            <strong>Rating:</strong> {rating} Bintang
          </p>
          <p>
            <strong>Komentar:</strong> {comment}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
