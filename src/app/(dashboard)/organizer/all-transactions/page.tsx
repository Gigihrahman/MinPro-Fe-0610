import AllTransactionsPage from "@/features/all-transactions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AllTransactions = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <AllTransactionsPage />;
};

export default AllTransactions;
