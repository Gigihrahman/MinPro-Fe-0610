"use client";

import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftIcon, TicketIcon, MailIcon } from "lucide-react";

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
import { ForgotPasswordSchema } from "../schemas";
import useForgotPassword from "@/hooks/auth/useForgotPassword";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
      setIsSubmitted(true);
    },
  });

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white",
        className
      )}
      {...props}
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

        <Card className="border-purple-100 shadow-lg overflow-hidden">
          <CardHeader className="space-y-1 bg-gradient-to-r from-purple-50 to-white pb-6">
            <div className="flex items-center">
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-800 mr-2"
              >
                <ArrowLeftIcon size={16} />
              </Link>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
            </div>
            <CardDescription>
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email address to receive password reset instructions"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="mx-auto rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center">
                  <MailIcon className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">
                  We've sent password reset instructions to your email address.
                  Please check your inbox.
                </p>
                <Button
                  type="button"
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Again
                </Button>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                      autoComplete="email"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon size={16} className="text-gray-400" />
                    </div>
                  </div>
                  {formik.touched.email && !!formik.errors.email && (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 transform hover:scale-[1.01]"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Reset Password"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Back to login
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
