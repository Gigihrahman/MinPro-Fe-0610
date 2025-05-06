import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/lib/auth";
import EditProfilePage from "@/features/edit-profile";

const EditProfile = async () => {
  const session = await auth();

  if (!session) return redirect("/login");
  return <EditProfilePage />;
};

export default EditProfile;
