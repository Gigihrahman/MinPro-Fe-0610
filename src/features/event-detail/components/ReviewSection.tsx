"use client";
import useGetReviews from "@/hooks/review/useGetreview";
import Image from "next/image";
import React, { FC } from "react";

interface Review {
  id: number;
  user: {
    fullname: string;
    profilePicture: string | null;
  };
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {review.user.profilePicture ? (
                <Image
                  src={review.user.profilePicture}
                  alt={review.user.fullname}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-600">{review.user.fullname[0]}</span>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {review.user.fullname}
              </p>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              <p className="mt-1 text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

interface ReviewSectionProps {
  eventId: number;
}
const ReviewUsers: FC<ReviewSectionProps> = ({ eventId }) => {
  const { data: reviews } = useGetReviews(eventId, { page: 1, take: 5 });
  if (!reviews) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Reviews</h2>
        <p className="text-center text-gray-500">Not Found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      <ReviewSection reviews={reviews.data} />
    </div>
  );
};
export default ReviewUsers;
