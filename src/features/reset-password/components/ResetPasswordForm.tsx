"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { ResetPasswordSchema } from "../schema";
import { FC } from "react";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { EyeIcon, EyeOffIcon, TicketIcon } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  
  const togglePasswordVisibility = () => setIsPasswordVisible((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prevState) => !prevState);
  
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white"
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
              <TicketIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            EventHub
          </h2>
          <p className="mt-2 text-sm text-gray-600">Event Management Pro</p>
        </div>

        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your new password to reset your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    aria-pressed={isPasswordVisible}
                    aria-controls="password"
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon size={18} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={18} aria-hidden="true" />
                    )}
                  </button>
                  {formik.touched.password && !!formik.errors.password && (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={isConfirmPasswordVisible ? "Hide password" : "Show password"}
                    aria-pressed={isConfirmPasswordVisible}
                    aria-controls="confirmPassword"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOffIcon size={18} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={18} aria-hidden="true" />
                    )}
                  </button>
                  {formik.touched.confirmPassword && !!formik.errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign in
                </Link>
              </div>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};