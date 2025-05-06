"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/profile/useEditProfile";
import useGetProfile from "@/hooks/profile/useProfile";
import { ArrowLeft } from "lucide-react";
import { EditProfileSchema } from "../schema";

export default function EditProfileForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const { data: profile, isLoading } = useGetProfile();

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const formik = useFormik({
    enableReinitialize: true, // Important!
    initialValues: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: async (values) => {
      console.log("ini valuess: ", values);

      await updateProfile(values);
    },
  });

  return (
    <div className="container max-w-2xl py-10 mx-auto">
      {isLoading && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading</h2>
        </div>
      )}
      {!isLoading && !profile && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Please wait...</h2>
        </div>
      )}
      {!!profile && (
        <div>
          <Button
            variant="ghost"
            className="mb-4 flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Profile</CardTitle>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-10">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
