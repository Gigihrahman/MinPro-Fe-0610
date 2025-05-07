"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import useCreateReview from "@/hooks/review/useCreateReview";

const StarRating = ({
  filled,
  hovered,
}: {
  filled: boolean;
  hovered: boolean;
}) => (
  <Star
    className={`w-6 h-6 cursor-pointer ${
      filled || hovered ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
    }`}
  />
);

interface ReviewFormUserProps {
  uuid: string;
}

const ReviewFormUser: FC<ReviewFormUserProps> = ({ uuid }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [rating, setRating] = useState(0);
  const { mutate: createReview } = useCreateReview(uuid);

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .min(5, "Komentar harus terdiri dari minimal 5 karakter")
        .required("Komentar tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      createReview({ ...values, rating });
    },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Comment Form */}
      <div className="bg-gray-50 rounded-lg p-5 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Berikan Komentar
        </h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Comment Input */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Komentar
            </label>
            <div className="flex gap-2">
              <textarea
                id="comment"
                name="comment"
                rows={5}
                placeholder="Tulis komentar di sini..."
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full max-w-full rounded-md border border-gray-300 p-2 resize-none"
              />
            </div>
            {formik.touched.comment && formik.errors.comment && (
              <p className="text-xs text-red-600 mt-1">
                {formik.errors.comment}
              </p>
            )}
          </div>

          {/* Star Rating */}
          <div className="mb-6">
            <label className="block text-indigo-800 text-lg mb-2">
              Rating (Bintang):
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <StarRating
                    filled={star <= rating}
                    hovered={star <= hoveredRating}
                  />
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mt-4"
          >
            Kirim Komentar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormUser;
