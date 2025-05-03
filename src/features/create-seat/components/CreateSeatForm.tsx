"use client";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Import komponen dari shadcn/ui
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
import { Textarea } from "@/components/ui/textarea";
import { createSeatSchema } from "@/features/create-seat/schema";
import { FC } from "react";

interface CreateSeatFormProps {
  id: number;
  name: string;
}

const CreateSeatForm: FC<CreateSeatFormProps> = ({ id, name }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      totalSeat: 0,
      price: 0,
    },
    validationSchema: createSeatSchema,
    onSubmit: async (values) => {
      console.log(values);
      console.log(id);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 xl:max-w-7xl 2xl:max-w-screen-2xl">
        {/* Back Button - Positioned at top left */}
        <div className="pt-6">
          <Button
            variant="ghost"
            asChild
            className="text-indigo-200 hover:text-white hover:bg-indigo-800/30"
          >
            <Link
              href="/organizer/event"
              className="inline-flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke Event</span>
            </Link>
          </Button>
        </div>

        {/* Header Section */}
        <header className="py-8 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-center tracking-tight text-white">
            Buat Ticket Baru
          </h1>
          <p className="text-center mt-3 text-indigo-200 max-w-2xl mx-auto text-lg">
            {`Isi form berikut untuk membuat ticket untuk `}
            <span className="font-bold text-indigo-500 text-2xl">{name}</span>
          </p>
        </header>

        {/* Main Form */}
        <main className="pb-16">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl text-white">
                <CardHeader className="lg:px-8 lg:pt-8">
                  <CardTitle className="text-xl lg:text-2xl text-white">
                    Informasi Ticket
                  </CardTitle>
                  <CardDescription className="text-indigo-200 lg:text-lg">
                    Masukkan detail informasi ticket yang akan dibuat
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 lg:px-8 lg:pt-2">
                  {/* Nama Ticket */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-white text-base lg:text-lg"
                    >
                      Nama Ticket
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Contoh: VIP, Regular, Early Bird"
                      className="bg-white/10 border-indigo-500/30 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-indigo-500/50 lg:text-base lg:h-12"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {/* Deskripsi Ticket */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-white text-base lg:text-lg"
                    >
                      Deskripsi Ticket
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Jelaskan fasilitas dan benefit yang didapat dengan membeli ticket ini"
                      rows={4}
                      className="bg-white/10 border-indigo-500/30 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-indigo-500/50 lg:text-base"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>

                  {/* Section untuk Detail Ticket */}
                  <Card className="bg-indigo-900/50 border border-indigo-700/50">
                    <CardHeader className="pb-2 lg:px-6">
                      <CardTitle className="text-lg lg:text-xl text-white">
                        Detail Ticket
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3 lg:px-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Jumlah Kursi */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="totalSeat"
                            className="text-white text-base lg:text-lg"
                          >
                            Jumlah Kursi
                          </Label>
                          {/* Input tanpa tombol increment/decrement */}
                          <input
                            id="totalSeat"
                            name="totalSeat"
                            type="number"
                            value={formik.values.totalSeat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Contoh: 100"
                            className="flex h-10 lg:h-12 w-full rounded-md border border-indigo-500/30 bg-white/10 px-3 py-2 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none lg:text-base"
                            // Menyembunyikan tombol increment/decrement
                            style={{
                              appearance: "textfield",
                              MozAppearance: "textfield",
                              WebkitAppearance: "none",
                              margin: 0,
                            }}
                          />
                          {formik.touched.totalSeat &&
                            formik.errors.totalSeat && (
                              <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                                {formik.errors.totalSeat}
                              </div>
                            )}
                        </div>

                        {/* Harga */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="price"
                            className="text-white text-base lg:text-lg"
                          >
                            Harga (Rp)
                          </Label>
                          {/* Input tanpa tombol increment/decrement */}
                          <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="1000"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Contoh: 150000"
                            className="flex h-10 lg:h-12 w-full rounded-md border border-indigo-500/30 bg-white/10 px-3 py-2 text-white placeholder:text-indigo-200/70 focus:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none lg:text-base"
                            style={{
                              appearance: "textfield",
                              MozAppearance: "textfield",
                              WebkitAppearance: "none",
                              margin: 0,
                            }}
                          />
                          {formik.touched.price && formik.errors.price && (
                            <div className="mt-2 px-3 py-2 rounded-md bg-red-900/40 border-l-4 border-red-500 text-red-200 text-sm font-medium">
                              {formik.errors.price}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="flex justify-end space-x-4 border-t border-indigo-700/30 bg-indigo-950/50 py-4 lg:py-6 lg:px-8">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="text-indigo-200 border-indigo-700 hover:bg-indigo-800 hover:text-white lg:text-base lg:h-12 lg:px-6"
                  >
                    <Link href="/organizer/event">Batal</Link>
                  </Button>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white lg:text-base lg:h-12 lg:px-8"
                  >
                    Simpan Ticket
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateSeatForm;
