"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRegisterOrganizer from "@/hooks/auth/useRegisterOrganizer";
import { BankName } from "@/types/organizer";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { RegisterOrganizerSchema } from "../schema";

export default function RegisterOrganizerForm() {
  const router = useRouter();
  const { mutateAsync: register, isPending } = useRegisterOrganizer();

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
      console.log("cekkk values : ", values);

      const { confirmPassword, ...payload } = values;
      const rest = {
        ...payload,
        norek: Number(payload.norek),
      };
      await register(rest);
    },
  });
  const handleBankChange = (value: BankName) => {
    formik.setFieldValue("bankName", value);
  };
  return (
    <div className="container max-w-2xl py-10 mx-auto">
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
          <CardTitle className="text-2xl">Register as Organizer</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                placeholder="enter organizer name"
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
                placeholder="enter organizer email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                required
                placeholder="enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="npwp">NPWP</Label>
              <Input
                id="npwp"
                name="npwp"
                type="text"
                value={formik.values.npwp}
                onChange={formik.handleChange}
                required
                placeholder="enter NPWP number"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="referralCodeUsed">
                  Referral Code (Optional)
                </Label>
              </div>
              <Input
                id="referralCodeUsedF"
                name="referralCodeUsed"
                type="text"
                placeholder="referral code"
                value={formik.values.referralCodeUsed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Bank</Label>
              <Select
                value={formik.values.bankName}
                onValueChange={(value) => handleBankChange(value as BankName)}
                required
              >
                <SelectTrigger id="bankName">
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BNI">BNI</SelectItem>
                </SelectContent>
              </Select>
              {formik.errors.bankName && (
                <p className="text-red-500 text-sm">{formik.errors.bankName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="norek">No Rekening</Label>
              <Input
                id="norek"
                name="norek"
                type="number"
                value={formik.values.norek}
                onChange={formik.handleChange}
                required
                placeholder="enter no rekening"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                placeholder="enter password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                placeholder="enter confirm password"
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
            <Button type="submit">Submit Registration</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
