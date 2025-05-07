import ChangePasswordPage from "@/features/change-password";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const ChangePassword = async() => {
      const session = await auth();
      
      if (!session) return redirect("/login");
  return <ChangePasswordPage />;
};

export default ChangePassword;
