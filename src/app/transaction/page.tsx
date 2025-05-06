import UserHistoryPayment from "@/features/user-history-payment";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AllUserHistoryPayment = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <UserHistoryPayment />;
};

export default AllUserHistoryPayment;
