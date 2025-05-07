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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import type React from "react";

import { ArrowLeft } from "lucide-react";

import useGetOrganizerProfileUpdate from "@/hooks/profile/useGetOrganizerProfileUpdate";
import useUpdateOrganizerProfile from "@/hooks/profile/useUpdateOrganizerProfile";
import { BankName } from "@/types/organizer";
import { EditOrganizerProfileSchema } from "../schema";

export default function EditOrganizerProfileForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { data: profileData, isLoading } = useGetOrganizerProfileUpdate();
  const { mutateAsync: updateProfile, isPending } = useUpdateOrganizerProfile();

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
    
      fullName: profileData?.user?.fullName || "",
      email: profileData?.user?.email || "",
      phoneNumber: profileData?.user?.phoneNumber || "",
      profilePicture: profileData?.user?.profilePicture || "",

      // Organizer data
      name: profileData?.organizerProfile?.name || "",
      organizerPhoneNumber: profileData?.organizerProfile?.phoneNumber || "",
      organizerProfilePicture:
        profileData?.organizerProfile?.profilePicture || "",
      npwp: profileData?.organizerProfile?.npwp || "",
      bankName: profileData?.organizerProfile?.bankName || "",
      norek: profileData?.organizerProfile?.norek || "",
    },
    validationSchema: EditOrganizerProfileSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
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

      {!isLoading && !profileData && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Please wait...</h2>
        </div>
      )}

      {!!profileData && (
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
              <CardTitle className="text-2xl">Edit Organizer Profile</CardTitle>
            </CardHeader>

            <form onSubmit={formik.handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-sm text-red-500">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="text-sm text-red-500">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Organizer Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Organizer Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizerPhoneNumber">
                      Organizer Phone Number
                    </Label>
                    <Input
                      id="organizerPhoneNumber"
                      name="organizerPhoneNumber"
                      value={formik.values.organizerPhoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.organizerPhoneNumber &&
                      formik.errors.organizerPhoneNumber && (
                        <p className="text-sm text-red-500">
                          {formik.errors.organizerPhoneNumber}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="npwp">NPWP</Label>
                    <Input
                      id="npwp"
                      name="npwp"
                      value={formik.values.npwp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.npwp && formik.errors.npwp && (
                      <p className="text-sm text-red-500">
                        {formik.errors.npwp}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Select
                      name="bankName"
                      value={formik.values.bankName}
                      onValueChange={(value) =>
                        formik.setFieldValue("bankName", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(BankName).map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.bankName && formik.errors.bankName && (
                      <p className="text-sm text-red-500">
                        {formik.errors.bankName as string}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="norek">Bank Account Number</Label>
                    <Input
                      id="norek"
                      name="norek"
                      value={formik.values.norek}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.norek && formik.errors.norek && (
                      <p className="text-sm text-red-500">
                        {formik.errors.norek}
                      </p>
                    )}
                  </div>
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
