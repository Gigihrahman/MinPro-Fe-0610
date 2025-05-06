"use client";

import { useState, useId } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, TicketIcon } from "lucide-react";

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
import { LoginSchema } from "../schema";
import useLogin from "@/hooks/auth/useLogin";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: login, isPending } = useLogin();
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
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

        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                />
                {formik.touched.email && !!formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isVisible ? "text" : "password"}
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
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
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

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign up
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="text-center text-sm">
                <Link
                  href="/register-organizer"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Register as event organizer
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
