"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Edit, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import useGetProfile from "@/hooks/profile/useProfile";

export default function ProfileForm() {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { data: profile, isPending } = useGetProfile();

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigateToEditProfile = () => {
    router.push("/profile/edit-profile");
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading</h2>
        </div>
      )}

      {!isPending && !profile && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No data</h2>
        </div>
      )}
      {!!profile && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-2 border-border">
                    <AvatarImage
                      src={profile?.profilePicture || ""}
                      alt={profile?.fullName}
                    />
                    <AvatarFallback className="text-3xl bg-muted">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                    <span className="sr-only">Change profile picture</span>
                  </label>
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={navigateToEditProfile}
                >
                  <Edit className="h-4 w-4" />
                  Change Profile
                </Button>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => router.push("/profile/register-organizer")}
                >
                  Register as Organizer
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => router.push("/profile/change-password")}
                >
                  <Lock className="h-4 w-4" />
                  Change Password
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Label className="text-muted-foreground text-sm">
                    Full Name
                  </Label>
                  <p className="text-lg font-medium">{profile?.fullName}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">Email</Label>
                  <p className="text-lg">{profile?.email}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">
                    Phone Number
                  </Label>
                  <p className="text-lg">{profile?.phoneNumber}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">Role</Label>
                  <p className="text-lg">{profile?.role}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">
                    Referral Code
                  </Label>
                  <p className="text-lg font-medium">{profile?.referalCode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
