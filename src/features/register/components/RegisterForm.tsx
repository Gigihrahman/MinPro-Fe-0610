"use client";

import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { TicketIcon, EyeIcon, EyeOffIcon } from "lucide-react";

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
import { RegisterSchema } from "../schema";
import useRegister from "@/hooks/auth/useRegister";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      referralCodeUsed: "",
      role: "USER"
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div 
      className={cn("min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white", className)} 
      {...props}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
              <TicketIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">EventHub</h2>
          <p className="mt-2 text-sm text-gray-600">Event Management Pro</p>
        </div>
        
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                />
                {formik.touched.fullName && !!formik.errors.fullName && (
                  <p className="text-xs text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              
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
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="+62 812 3456 7890"
                  required
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                />
                {formik.touched.phoneNumber && !!formik.errors.phoneNumber && (
                  <p className="text-xs text-red-500">
                    {formik.errors.phoneNumber}
                  </p>
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
                    type={showPassword ? "text" : "password"}
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
                {formik.touched.password && !!formik.errors.password && (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
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
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword && !!formik.errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="referralCodeUsed" className="text-sm font-medium">
                  Referral Code <span className="text-gray-400">(Optional)</span>
                </Label>
                <Input
                  id="referralCodeUsed"
                  name="referralCodeUsed"
                  type="text"
                  placeholder="Enter referral code"
                  value={formik.values.referralCodeUsed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                />
                {formik.touched.referralCodeUsed && !!formik.errors.referralCodeUsed && (
                  <p className="text-xs text-red-500">
                    {formik.errors.referralCodeUsed}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6" 
                disabled={isPending}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign in
                </Link>
              </div>
              
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              
              <div className="text-center text-sm">
                <Link
                  href="/organizer/register-organizer"
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