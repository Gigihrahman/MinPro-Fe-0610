"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import EventCategory from "./components/EventCategory";
import EventDescription from "./components/EventDescription";
import EventThumbnail from "./components/EventThumbnail";
import EventLocationDetail from "./components/EventLocationDetail";
import EventName from "./components/EventName"; // Renamed to EventName
import { createEventSchema } from "@/features/create-event/schemas";
import SelectCity from "@/features/create-event/components/SelectCity";
import useCreateEvent from "@/hooks/event/useCreateEvent";
import { DateTimePicker24h } from "@/components/DateTimePicker";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import useGetCities from "@/hooks/city/useGetCity";
import useGetCategories from "@/hooks/category/useGetCategory";

const CreateEventPage = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const { mutate: createEvent, isPending } = useCreateEvent();
  const { data: city } = useGetCities();
  const { data: categories } = useGetCategories();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const formik = useFormik({
    initialValues: {
      name: "", // Changed from title to name
      categoryId: 0,
      description: "",
      content: "",
      cityId: 0,
      locationDetail: "",
      startEvent: null,
      endEvent: null,
    },
    validationSchema: createEventSchema,
    onSubmit: async (values) => {
      console.log("Submitting Form Values:", values);

      createEvent({
        ...values,
        thumbnail,
      });
    },
  });

  return (
    <div className="container min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white mx-auto px-4 xl:max-w-7xl 2xl:max-w-screen-2xl">
      <Toaster richColors position="top-right" />

      <header className="py-8">
        <Link
          href="/organizer/dashboard"
          className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <h1 className="mt-6 text-4xl font-bold text-center tracking-tight text-white">
          Buat Event Baru
        </h1>
        <p className="text-center mt-3 text-indigo-200 max-w-2xl mx-auto">
          Isi form berikut untuk membuat event baru dan bagikan dengan
          pengunjung Anda
        </p>
      </header>

      <main className="pb-16">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
          <form onSubmit={formik.handleSubmit} className="p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="space-y-6">
                <div className="p-6 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 mr-3 text-white">
                      1
                    </span>
                    Informasi Dasar
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <EventName
                        value={formik.values.name} // Changed to name
                        onChange={formik.handleChange}
                        name="name" // Changed to name
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.name} // Changed to name
                        </div>
                      )}
                    </div>

                    {/* Category Selection */}
                    <div>
                      <EventCategory
                        categories={categories ? categories : []}
                        value={formik.values.categoryId}
                        onChange={(value) =>
                          formik.setFieldValue("categoryId", value)
                        }
                        name="categoryId"
                      />
                      {formik.errors.categoryId &&
                        formik.touched.categoryId && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                            {formik.errors.categoryId}
                          </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                      <EventDescription
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                      />
                      {formik.errors.description &&
                        formik.touched.description && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 mr-3 text-white">
                      2
                    </span>
                    Waktu & Lokasi
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <DateTimePicker24h
                        label="Waktu Mulai"
                        value={formik.values.startEvent}
                        handleInputChange={(newDate: Date) =>
                          formik.setFieldValue("startEvent", newDate)
                        }
                      />
                      {formik.errors.startEvent &&
                        formik.touched.startEvent && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                            {formik.errors.startEvent}
                          </div>
                        )}
                    </div>

                    <div>
                      <DateTimePicker24h
                        label="Waktu Selesai"
                        value={formik.values.endEvent}
                        handleInputChange={(newDate: Date) =>
                          formik.setFieldValue("endEvent", newDate)
                        }
                      />
                      {formik.errors.endEvent && formik.touched.endEvent && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.endEvent}
                        </div>
                      )}
                    </div>

                    {/* City Selection */}
                    <div>
                      <SelectCity
                        value={formik.values.cityId}
                        onChange={(value) =>
                          formik.setFieldValue("cityId", value)
                        }
                        city={city ? city : []}
                        name="cityId"
                      />
                      {formik.errors.cityId && formik.touched.cityId && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.cityId}
                        </div>
                      )}
                    </div>

                    {/* Location Detail */}
                    <div>
                      <EventLocationDetail
                        value={formik.values.locationDetail}
                        onChange={formik.handleChange}
                        name="locationDetail"
                      />
                      {formik.errors.locationDetail &&
                        formik.touched.locationDetail && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                            {formik.errors.locationDetail}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content and Thumbnail */}
              <div className="space-y-6">
                <div className="p-6 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 mr-3 text-white">
                      3
                    </span>
                    Content Event
                  </h2>

                  <div className="w-full">
                    <TiptapRichtextEditor
                      label="Content"
                      field="content"
                      isTouch={formik.touched.content}
                      content={formik.values.content}
                      setError={formik.setFieldError}
                      setTouch={formik.setFieldTouched}
                      onChange={(value: string) =>
                        formik.setFieldValue("content", value)
                      }
                    />
                    {formik.errors.content && formik.touched.content && (
                      <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                        {formik.errors.content}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 mr-3 text-white">
                      4
                    </span>
                    Thumbnail Event
                  </h2>

                  <EventThumbnail
                    onImageUpload={handleImageUpload}
                    imagePreview={thumbnailPreview}
                    onRemoveImage={handleRemoveImage}
                  />
                </div>
              </div>
            </div>

            {/* Form validation errors display */}
            {Object.keys(formik.errors).length > 0 &&
              formik.submitCount > 0 && (
                <div className="mx-6 mb-6 p-4 bg-red-900/30 text-red-300 rounded-lg">
                  <p className="font-medium mb-2">
                    Form belum dapat dikirim karena ada error:
                  </p>
                  <ul className="list-disc ml-5">
                    {Object.entries(formik.errors).map(([field, message]) => (
                      <li key={field}>
                        {field}: {message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Submit Buttons */}
            <div className="flex justify-end p-6 gap-4 bg-indigo-950/50 border-t border-indigo-700/30">
              <Link
                href="/organizer/dashboard"
                className="px-6 py-3 rounded-lg text-indigo-200 border border-indigo-700 hover:bg-indigo-800 hover:text-white transition-all duration-200"
              >
                Batal
              </Link>

              <button
                type="submit"
                disabled={isPending}
                className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                          hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50
                          ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isPending ? "Menyimpan..." : "Simpan Event"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEventPage;
