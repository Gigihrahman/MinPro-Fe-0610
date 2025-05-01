import EditProfilePage from "@/features/edit-profile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EditProfile = async () => {
  const session = await auth();

  if (!session) return redirect("/login");
  return <EditProfilePage />;
};

export default EditProfile;
