
import ConfirmationPaymentsPage from "@/features/confirmation-payment";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const ConfirmationPayments = async () => {
  const session = await auth();
  if (!session) return redirect("/login");
  return <ConfirmationPaymentsPage />;
};

export default ConfirmationPayments;
