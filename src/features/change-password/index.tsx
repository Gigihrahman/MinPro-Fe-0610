"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangePassword from "@/hooks/auth/useChangePassword";
import { useFormik } from "formik";
import { AlertCircle, ArrowLeft, Check, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangePasswordSchema } from "./schema";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const [error, setError] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
        const payload = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };
        await changePassword(payload);
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/organizer/profile");
        }, 2000);
      } catch (err) {
        setError("Failed to change password. Please try again.");
      }
    },
  });

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50 transition-all duration-300"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Button>

      {isSuccess && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertDescription>
            Password changed successfully! Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border-purple-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-700"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Lock className="h-5 w-5 text-purple-600" />
            Change Password
          </CardTitle>
          <CardDescription className="text-gray-500">
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>

        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 text-red-800 border-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label
                htmlFor="oldPassword"
                className="text-sm font-medium text-gray-700"
              >
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  required
                  placeholder="Enter your current password"
                  className={`pr-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all ${
                    formik.touched.oldPassword && formik.errors.oldPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-700"
                  onClick={() => togglePasswordVisibility("old")}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.oldPassword}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  required
                  placeholder="Enter your new password"
                  className={`pr-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all ${
                    formik.touched.newPassword && formik.errors.newPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-700"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  required
                  placeholder="Confirm your new password"
                  className={`pr-10 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-700"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 pb-6 px-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || isSuccess}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 relative overflow-hidden"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Change Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
