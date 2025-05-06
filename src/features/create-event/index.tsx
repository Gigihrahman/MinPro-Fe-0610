"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { createEventSchema } from "@/features/create-event/schemas";
import useCreateEvent from "@/hooks/event/useCreateEvent";
import useGetCities from "@/hooks/city/useGetCity";
import useGetCategories from "@/hooks/category/useGetCategory";
import Link from "next/link";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { DateTimePicker24h } from "@/components/DateTimePicker";
import { ArrowLeft, Calendar, MapPin, FileText, Image } from "lucide-react";

// Components
import EventCategory from "./components/EventCategory";
import EventDescription from "./components/EventDescription";
import EventThumbnail from "./components/EventThumbnail";
import EventLocationDetail from "./components/EventLocationDetail";
import EventName from "./components/EventName";
import SelectCity from "@/features/create-event/components/SelectCity";

const CreateEventPage = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);

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
      name: "",
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
      createEvent({
        ...values,
        thumbnail,
      });
    },
  });

  const tabs = [
    { id: 1, title: "Informasi Dasar", icon: <FileText className="h-5 w-5" /> },
    { id: 2, title: "Waktu & Lokasi", icon: <Calendar className="h-5 w-5" /> },
    { id: 3, title: "Content Event", icon: <MapPin className="h-5 w-5" /> },
    { id: 4, title: "Thumbnail Event", icon: <Image className="h-5 w-5" /> },
  ];

  const goToNextTab = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  const goToPrevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Toaster richColors position="top-right" />

      {/* Header section */}
      <header className="bg-purple-950/40 backdrop-blur-sm border-b border-purple-700/30 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/organizer/dashboard-organizer"
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Dashboard</span>
          </Link>
          
          <div className="text-right">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              EventHub Organizer
            </h2>
            <p className="text-sm text-purple-200">Event Management Pro</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center tracking-tight text-white mb-2">
            Buat Event Baru
          </h1>
          <p className="text-center mb-8 text-purple-200 max-w-2xl mx-auto">
            Isi form berikut untuk membuat event baru dan bagikan dengan pengunjung Anda
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center md:flex-row md:justify-center md:gap-2 text-center px-2 py-1 md:px-4 md:py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : activeTab > tab.id
                      ? "bg-purple-700/30 text-purple-200"
                      : "bg-purple-900/30 text-purple-300/70"
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs mb-1 md:mb-0">
                    {tab.id}
                  </span>
                  <span className="hidden md:block">{tab.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 h-1.5 bg-purple-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${(activeTab / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-purple-900/30 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-700/30">
              {/* Tab 1: Basic Information */}
              {activeTab === 1 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        1
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">Informasi Dasar</h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <EventName
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        name="name"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <EventCategory
                        categories={categories ? categories : []}
                        value={formik.values.categoryId}
                        onChange={(value) =>
                          formik.setFieldValue("categoryId", value)
                        }
                        name="categoryId"
                      />
                      {formik.errors.categoryId && formik.touched.categoryId && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.categoryId}
                        </div>
                      )}
                    </div>

                    <div>
                      <EventDescription
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                      />
                      {formik.errors.description && formik.touched.description && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Time & Location */}
              {activeTab === 2 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        2
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">Waktu & Lokasi</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <DateTimePicker24h
                          label="Waktu Mulai"
                          value={formik.values.startEvent}
                          handleInputChange={(newDate: Date) =>
                            formik.setFieldValue("startEvent", newDate)
                          }
                        />
                        {formik.errors.startEvent && formik.touched.startEvent && (
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
                    </div>

                    <div>
                      <SelectCity
                        value={formik.values.cityId}
                        onChange={(value) => formik.setFieldValue("cityId", value)}
                        city={city ? city : []}
                        name="cityId"
                      />
                      {formik.errors.cityId && formik.touched.cityId && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.cityId}
                        </div>
                      )}
                    </div>

                    <div>
                      <EventLocationDetail
                        value={formik.values.locationDetail}
                        onChange={formik.handleChange}
                        name="locationDetail"
                      />
                      {formik.errors.locationDetail && formik.touched.locationDetail && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-2 rounded">
                          {formik.errors.locationDetail}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Content */}
              {activeTab === 3 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        3
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">Content Event</h2>
                  </div>

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
              )}

              {/* Tab 4: Thumbnail */}
              {activeTab === 4 && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        4
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">Thumbnail Event</h2>
                  </div>

                  <EventThumbnail
                    onImageUpload={handleImageUpload}
                    imagePreview={thumbnailPreview}
                    onRemoveImage={handleRemoveImage}
                  />

                  {/* Form validation errors summary */}
                  {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
                    <div className="mt-8 p-4 bg-red-900/30 text-red-300 rounded-lg">
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
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between p-6 gap-4 bg-purple-950/50 border-t border-purple-700/30">
                <div>
                  {activeTab > 1 && (
                    <button
                      type="button"
                      onClick={goToPrevTab}
                      className="px-5 py-2.5 rounded-lg border border-purple-500 text-purple-200 hover:bg-purple-800/30 hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Sebelumnya
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/organizer/dashboard"
                    className="px-5 py-2.5 rounded-lg text-purple-200 border border-purple-700 hover:bg-purple-800 hover:text-white transition-all duration-200"
                  >
                    Batal
                  </Link>

                  {activeTab < 4 ? (
                    <button
                      type="button"
                      onClick={goToNextTab}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-purple-700/50"
                    >
                      Selanjutnya
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isPending}
                      className={`px-8 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-purple-700/50 ${
                        isPending ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isPending ? "Menyimpan..." : "Simpan Event"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEventPage;