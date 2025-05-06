import React from "react";
import ProfileForm from "./components/profileForm";

const ProfilePage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
