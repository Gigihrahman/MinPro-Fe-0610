import ReviewUserPage from "@/features/reviewUser";
import React from "react";

const Review = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const uuid = (await params).uuid;
  console.log("params", uuid);
  return <ReviewUserPage uuid={uuid} />;
};

export default Review;
