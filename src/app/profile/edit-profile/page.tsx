import EditProfilePage from "@/features/edit-profile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EditProfile = async () => {
  const session = await auth();
  console.log("darii pagee: ",session);

  if (!session) return redirect("/login");
  console.log();

  return <EditProfilePage />;
};

export default EditProfile;
