"use client";

import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Import komponen dari shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { voucherSchema } from "@/features/create-voucher/schema";
import useCreateVoucher from "@/hooks/voucher/useCreateVoucher";
interface VoucherFormValues {
  value: number; // value is now a number
  description: string;
  quota: number; // quota is now a number
  validAt: Date | null; // Changed validFrom to validAt
  expiredAt: Date | null;
}

interface CreateVoucherFormProps {
  eventId: number;
  eventName: string;
}
const CreateVoucherForm: FC<CreateVoucherFormProps> = ({
  eventId,
  eventName,
}) => {
  const { mutateAsync: createVoucher } = useCreateVoucher(eventId);
  const formik = useFormik<VoucherFormValues>({
    initialValues: {
      value: 0,
      description: "",
      quota: 0,
      validAt: null,
      expiredAt: null,
    },
    validationSchema: voucherSchema,
    onSubmit: async (values) => {
      console.log(values);
      createVoucher({
        description: values.description,
        quota: values.quota,
        value: values.value,
        validAt: values.validAt?.toISOString() || "",
        expiredAt: values.expiredAt?.toISOString() || "",
      });
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      {/* Move the button outside the header and align it to the left */}

      {/* Main Header Section as a div now */}
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="mt-6 text-4xl font-bold text-center tracking-tight text-white">
          Buat Voucher Baru untuk event dan campaign marketing Anda
        </h1>
        <p className="text-center mt-3 text-indigo-200 max-w-2xl mx-auto">
          Anda ,membuat voucher promo untuk event{" "}
          <span className="font-bold text-indigo-500 text-2xl">
            {eventName}
          </span>
        </p>
      </div>

      {/* Main Form */}
      <main className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Informasi Voucher
                </CardTitle>
                <CardDescription className="text-indigo-200">
                  Masukkan detail informasi voucher yang akan dibuat
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Jumlah Diskon */}
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-white">
                    Jumlah Diskon yang Diinginkan (Rupiah)
                  </Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={formik.values.value} // Ensure controlled state
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Masukkan jumlah diskon dalam Rupiah"
                    className="bg-white/10 border-indigo-500/30 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-indigo-500/50"
                  />
                  {formik.touched.value && formik.errors.value && (
                    <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                      {formik.errors.value}
                    </div>
                  )}
                </div>

                {/* Deskripsi Voucher */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Deskripsi Voucher
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Jelaskan detail dan ketentuan penggunaan voucher"
                    rows={4}
                    className="bg-white/10 border-indigo-500/30 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-indigo-500/50 resize-none"
                  />
                  <div className="flex justify-between">
                    <p className="text-xs text-indigo-200 mt-1">
                      Deskripsi ini akan ditampilkan kepada pengguna
                    </p>
                    <p className="text-xs text-indigo-200 mt-1">
                      {formik.values.description.length}/500 karakter
                    </p>
                  </div>
                  {formik.touched.description && formik.errors.description && (
                    <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                {/* Kuota Voucher */}
                <div className="space-y-2">
                  <Label htmlFor="quota" className="text-white">
                    Kuota Voucher
                  </Label>
                  <input
                    id="quota"
                    name="quota"
                    type="number"
                    value={formik.values.quota} // Ensure controlled state
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Jumlah voucher yang tersedia"
                    className="flex h-10 w-full rounded-md border border-indigo-500/30 bg-white/10 px-3 py-2 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none"
                    style={{
                      appearance: "textfield",
                      MozAppearance: "textfield",
                      WebkitAppearance: "none",
                      margin: 0,
                    }}
                  />
                  {formik.touched.quota && formik.errors.quota && (
                    <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                      {formik.errors.quota}
                    </div>
                  )}
                </div>

                {/* Date Range Section */}
                <div className="p-6 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 mr-2 text-white text-sm">
                      <CalendarIcon className="h-3.5 w-3.5" />
                    </span>
                    Masa Berlaku Voucher
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tanggal Mulai Berlaku */}
                    <div className="space-y-2">
                      <Label htmlFor="validAt" className="text-white">
                        Tanggal Mulai Berlaku
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-white/10 border-indigo-500/30 text-white hover:bg-indigo-800/30 hover:text-white",
                              !formik.values.validAt && "text-indigo-200/70"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formik.values.validAt ? (
                              format(formik.values.validAt, "dd MMMM yyyy", {
                                locale: id,
                              })
                            ) : (
                              <span>Pilih tanggal mulai</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={formik.values.validAt || undefined}
                            onSelect={(date) => {
                              formik.setFieldValue("validAt", date);
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                            className="bg-gray-900 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      {formik.touched.validAt && formik.errors.validAt && (
                        <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                          {formik.errors.validAt}
                        </div>
                      )}
                    </div>

                    {/* Tanggal Kedaluwarsa */}
                    <div className="space-y-2">
                      <Label htmlFor="expiredAt" className="text-white">
                        Tanggal Kedaluwarsa
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-white/10 border-indigo-500/30 text-white hover:bg-indigo-800/30 hover:text-white",
                              !formik.values.expiredAt && "text-indigo-200/70"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formik.values.expiredAt ? (
                              format(formik.values.expiredAt, "dd MMMM yyyy", {
                                locale: id,
                              })
                            ) : (
                              <span>Pilih tanggal kedaluwarsa</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={formik.values.expiredAt || undefined}
                            onSelect={(date) => {
                              formik.setFieldValue("expiredAt", date);
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              if (formik.values.validAt) {
                                return (
                                  date < today || date < formik.values.validAt
                                );
                              }

                              return date < today;
                            }}
                            initialFocus
                            className="bg-gray-900 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      {formik.touched.expiredAt && formik.errors.expiredAt && (
                        <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                          {formik.errors.expiredAt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-4 border-t border-indigo-700/30 bg-indigo-950/50 py-4">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="text-indigo-200 border-indigo-700 hover:bg-indigo-800 hover:text-white"
                >
                  <Link href="/admin/vouchers">Batal</Link>
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
                >
                  Simpan Voucher
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateVoucherForm;
