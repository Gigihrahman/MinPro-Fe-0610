"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Phone,
  Mail,
  Edit,
  Lock,
  Camera,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useOrganizerProfile from "@/hooks/profile/useOrganizerProfile";

export default function OrganizerProfile() {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Using the hook to fetch organizer profile data
  const { data, isPending } = useOrganizerProfile();

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePicture(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Here you would typically upload the image to your server
    }
  };

  const navigateToEditProfile = () => {
    router.push("/organizer/edit-profile");
  };

  const navigateToChangePassword = () => {
    router.push("/organizer/change-password");
  };

  if (isPending) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <h2>No profile data available</h2>
      </div>
    );
  }

  const { user, organizerProfile } = data;

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="overflow-hidden border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={profilePicture || organizerProfile.profilePicture || ""}
                  alt={organizerProfile.name}
                />
                <AvatarFallback className="text-3xl bg-purple-400/50 text-white">
                  {organizerProfile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 p-2 bg-white text-purple-700 rounded-full cursor-pointer hover:bg-purple-50 transition-colors shadow-md opacity-90 group-hover:opacity-100"
                title="Change profile picture"
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
            <div className="space-y-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-3xl font-bold">{organizerProfile.name}</h2>
                {organizerProfile.isVerified && (
                  <div className="flex items-center gap-1 text-sm bg-white/20 py-1 px-3 rounded-full self-center md:self-auto">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span className="text-green-300">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-lg text-white/80">Event Organizer</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <Label className="text-gray-500 text-sm">Full Name</Label>
                  </div>
                  <p className="text-lg font-medium">{user.fullName}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <Label className="text-gray-500 text-sm">Email</Label>
                  </div>
                  <p className="text-lg">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <Label className="text-gray-500 text-sm">User Phone</Label>
                  </div>
                  <p className="text-lg">{user.phoneNumber}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <Label className="text-gray-500 text-sm">
                      Organizer Phone
                    </Label>
                  </div>
                  <p className="text-lg">{organizerProfile.phoneNumber}</p>
                </div>

                {organizerProfile.npwp && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <Label className="text-gray-500 text-sm">NPWP</Label>
                    </div>
                    <p className="text-lg">{organizerProfile.npwp}</p>
                  </div>
                )}

                {organizerProfile.bankName && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <Label className="text-gray-500 text-sm">Bank Name</Label>
                    </div>
                    <p className="text-lg">{organizerProfile.bankName}</p>
                  </div>
                )}

                {organizerProfile.norek && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <Label className="text-gray-500 text-sm">
                        Account Number
                      </Label>
                    </div>
                    <p className="text-lg">{organizerProfile.norek}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-100">
                <Button
                  variant="default"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={navigateToEditProfile}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={navigateToChangePassword}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
