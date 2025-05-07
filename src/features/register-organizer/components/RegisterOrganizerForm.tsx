"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarCheck, EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useRegisterOrganizer from "@/hooks/auth/useRegisterOrganizer";
import { BankName } from "@/types/organizer";
import { RegisterOrganizerSchema } from "../schema";

export default function RegisterOrganizerForm() {
  const router = useRouter();
  const { mutateAsync: register, isPending } = useRegisterOrganizer();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      npwp: "",
      norek: "",
      referralCodeUsed: "",
      bankName: "" as BankName,
    },
    validationSchema: RegisterOrganizerSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...payload } = values;
      console.log("ini values: ", values);

      await register(payload);
    },
  });

  const handleBankChange = (value: BankName) => {
    formik.setFieldValue("bankName", value);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center">
              <CalendarCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            EventHub Organizer
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our platform as an event organizer
          </p>
        </div>

        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Organizer Registration</CardTitle>
            <CardDescription>
              Create an organizer account to start hosting events
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Organizer Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="Your organization name"
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-xs text-red-500">{formik.errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="organization@example.com"
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="+62 812 3456 7890"
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-xs text-red-500">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="npwp" className="text-sm font-medium">
                    NPWP
                  </Label>
                  <Input
                    id="npwp"
                    name="npwp"
                    type="text"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="00.000.000.0-000.000"
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  {formik.touched.npwp && formik.errors.npwp && (
                    <p className="text-xs text-red-500">{formik.errors.npwp}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-sm font-medium">
                    Bank
                  </Label>
                  <Select
                    value={formik.values.bankName}
                    onValueChange={(value) =>
                      handleBankChange(value as BankName)
                    }
                    required
                  >
                    <SelectTrigger
                      id="bankName"
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                    >
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRI">BRI</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="BNI">BNI</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.bankName && formik.errors.bankName && (
                    <p className="text-xs text-red-500">
                      {formik.errors.bankName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="norek" className="text-sm font-medium">
                    Account Number
                  </Label>

                  <Input
                    id="norek"
                    name="norek"
                    type="text"
                    value={formik.values.norek}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="1234567890"
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                  />
                  {formik.touched.norek && formik.errors.norek && (
                    <p className="text-xs text-red-500">
                      {formik.errors.norek}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="referralCodeUsed"
                  className="text-sm font-medium"
                >
                  Referral Code{" "}
                  <span className="text-gray-400">(Optional)</span>
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
                {formik.touched.referralCodeUsed &&
                  formik.errors.referralCodeUsed && (
                    <p className="text-xs text-red-500">
                      {formik.errors.referralCodeUsed}
                    </p>
                  )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      placeholder="••••••••"
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                    />
                    <button
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      placeholder="••••••••"
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                    />
                    <button
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-7">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register as Organizer"}
              </Button>
              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Log in
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
