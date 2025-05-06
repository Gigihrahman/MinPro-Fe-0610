"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUpdateProfile from "@/hooks/profile/useEditProfile";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "./schema";
import useChangePassword from "@/hooks/auth/useChangePassword";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      console.log(values);
      
      try {
        // Buat payload tanpa confirmPassword
        const payload = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };

        await changePassword(payload);
      } catch (err) {
        setError("Failed to change password");
      }
    },
  });

  return (
    <div className="container mx-auto max-w-2xl py-10">
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
          <CardTitle className="text-2xl">Change Password</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                required
                placeholder="Enter your current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                required
                placeholder="Enter your new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                placeholder="Confirm your new password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Change Password</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
