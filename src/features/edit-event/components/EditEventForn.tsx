"use client";

import { DateTimePicker24h } from "@/components/DateTimePicker";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import useGetCategories from "@/hooks/category/useGetCategory";
import useGetCities from "@/hooks/city/useGetCity";
import useUpdateEvent, {
  UpdateEventPayload,
} from "@/hooks/event/useUpdateEvent";
import useUpdateEventBySlug from "@/hooks/event/useUpdateEventBySlug";
import { getChangedValues } from "@/utils/getChangedValues";
import { useFormik } from "formik";
import {
  ArrowLeft,
  CalendarClock,
  Layout,
  MapPin,
  PenTool,
  Save,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";
import SelectCity from "./SelectCity";
import EventName from "./EventName";
import EventCategory from "./EventCategory";
import EventDescription from "./EventDescription";
import EventLocationDetail from "./EventLocationDetail";
import EventThumbnail from "./EventThumbnail";
import AnimatedStepIndicator from "@/components/AnimatedStepIndicator";

const TiptapRichtextEditor = dynamic(
  () => import("@/components/TiptapRichtextEditor"),
  {
    ssr: false,
  }
);

// Validation schema
const eventValidationSchema = Yup.object({
  name: Yup.string().required("Judul event harus diisi"),
  categoryId: Yup.number().min(1, "Kategori harus dipilih"),
  description: Yup.string().required("Deskripsi singkat harus diisi"),
  content: Yup.string().required("Konten event harus diisi"),
  cityId: Yup.number().min(1, "Kota harus dipilih"),
  locationDetail: Yup.string().required("Detail lokasi harus diisi"),
  startEvent: Yup.date().required("Waktu mulai harus diisi"),
  endEvent: Yup.date()
    .min(Yup.ref("startEvent"), "Waktu selesai harus setelah waktu mulai")
    .required("Waktu selesai harus diisi"),
});

interface EditEventFormProps {
  slug: string;
}

const EditEventForm: FC<EditEventFormProps> = ({ slug }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formChanged, setFormChanged] = useState<boolean>(false);

  const { data: event, isPending: isPendingGetEvent } =
    useUpdateEventBySlug(slug);
  const { mutateAsync: updateEvent, isPending: isPendingUpdateEvent } =
    useUpdateEvent(event?.id);

  const { data: city } = useGetCities();
  const { data: categories } = useGetCategories();

  // Set up initial values
  const initialValues = {
    name: event?.name || "",
    categoryId: event?.categoryId || 0,
    description: event?.description || "",
    content: event?.content || "",
    cityId: event?.cityId || 0,
    locationDetail: event?.locationDetail || "",
    startEvent: event?.startEvent ? new Date(event?.startEvent) : new Date(),
    endEvent: event?.endEvent
      ? new Date(event?.endEvent)
      : new Date(Date.now() + 3600000), // Default to 1 hour later
    thumbnail: null,
  };

  // Set thumbnail preview if event has existing thumbnail
  useEffect(() => {
    if (event?.thumbnail) {
      setThumbnailPreview(event.thumbnail);
    }
  }, [event]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran gambar tidak boleh lebih dari 5MB");
        return;
      }

      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Set the thumbnail in formik
      formik.setFieldValue("thumbnail", file);
    }
  };

  const handleRemoveImage = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    formik.setFieldValue("thumbnail", null);
  };

  // Setup formik
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: eventValidationSchema,
    onSubmit: async (values) => {
      try {
        // Create a new object for payload instead of using getChangedValues
        const payload: Partial<UpdateEventPayload> = {};

        // Only add values that have changed
        if (values.name !== initialValues.name) {
          payload.name = values.name;
        }

        if (values.categoryId !== initialValues.categoryId) {
          payload.categoryId = Number(values.categoryId);
        }

        if (values.description !== initialValues.description) {
          payload.description = values.description;
        }

        if (values.content !== initialValues.content) {
          payload.content = values.content;
        }

        if (values.cityId !== initialValues.cityId) {
          payload.cityId = Number(values.cityId);
        }

        if (values.locationDetail !== initialValues.locationDetail) {
          payload.locationDetail = values.locationDetail;
        }

        if (values.startEvent !== initialValues.startEvent) {
          payload.startEvent = values.startEvent;
        }

        if (values.endEvent !== initialValues.endEvent) {
          payload.endEvent = values.endEvent;
        }

        // Add thumbnail separately
        if (thumbnail) {
          // We'll handle the thumbnail separately to avoid TypeScript errors
          const payloadWithFile = payload as any;
          payloadWithFile.thumbnail = thumbnail;

          await updateEvent(payloadWithFile);
        } else {
          // No thumbnail to update
          await updateEvent(payload);
        }

        toast.success("Event berhasil diperbarui!");
        setFormChanged(false);
      } catch (error) {
        toast.error("Gagal memperbarui event. Silakan coba lagi.");
        console.error("Error updating event:", error);
      }
    },
  });

  // Track form changes
  useEffect(() => {
    if (formik.dirty || thumbnail) {
      setFormChanged(true);
    }
  }, [formik.values, thumbnail]);

  // Handle prompt when navigating away with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formChanged) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formChanged]);

  // Display loading state
  if (isPendingGetEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
        <Loading />
      </div>
    );
  }

  // Display no data state
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
        <NoData message="Event tidak ditemukan" />
      </div>
    );
  }

  // Steps configuration
  const steps = [
    { id: 1, label: "Informasi Dasar", icon: <PenTool className="h-5 w-5" /> },
    {
      id: 2,
      label: "Waktu & Lokasi",
      icon: <CalendarClock className="h-5 w-5" />,
    },
    { id: 3, label: "Content Event", icon: <Layout className="h-5 w-5" /> },
    { id: 4, label: "Thumbnail Event", icon: <MapPin className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white">
      <Toaster richColors position="top-right" />

      {/* Header Section */}
      <header className="py-8 px-4 container mx-auto">
        {/* Header content remains unchanged... */}
        <div className="flex justify-between items-center">
          <Link
            href="/organizer/dashboard-organizer"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors duration-200 font-medium group"
          >
            <span className="bg-indigo-800/50 p-2 rounded-full group-hover:bg-indigo-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <span>Kembali ke Dashboard</span>
          </Link>

          {formChanged && (
            <button
              type="button"
              onClick={() => formik.submitForm()}
              disabled={isPendingUpdateEvent}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50"
            >
              <Save className="h-4 w-4" />
              {isPendingUpdateEvent ? "Menyimpan..." : "Simpan"}
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Edit Event
          </h1>
          <p className="mt-3 text-indigo-200 max-w-2xl mx-auto">
            Perbarui detail event Anda dan bagikan informasi terbaru dengan
            pengunjung
          </p>
        </div>
      </header>

      {/* Main Form Section */}
      <main className="pb-16 px-4 container mx-auto">
        {/* Steps Indicator */}
        <div className="max-w-6xl mx-auto mb-8">
          <AnimatedStepIndicator
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
        </div>

        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
          <form onSubmit={formik.handleSubmit}>
            {/* Step 1: Basic Information */}
            <div className={`${activeStep === 1 ? "block" : "hidden"}`}>
              <div className="p-8 space-y-6">
                <div className="p-6 bg-purple-900/50 rounded-lg border border-purple-700/50 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4 text-white shadow-inner">
                      <PenTool className="h-5 w-5" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                      Informasi Dasar
                    </span>
                  </h2>

                  <div className="space-y-6">
                    {/* Event Name */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <EventName
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        name="name"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                          <span className="mr-2">⚠️</span> {formik.errors.name}
                        </div>
                      )}
                    </div>

                    {/* Category Selection */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <EventCategory
                        categories={categories || []}
                        value={Number(formik.values.categoryId)}
                        onChange={(value: any) =>
                          formik.setFieldValue("categoryId", Number(value))
                        }
                        name="categoryId"
                      />
                      {formik.errors.categoryId &&
                        formik.touched.categoryId && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                            <span className="mr-2">⚠️</span>{" "}
                            {formik.errors.categoryId}
                          </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <EventDescription
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                      />
                      {formik.errors.description &&
                        formik.touched.description && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                            <span className="mr-2">⚠️</span>{" "}
                            {formik.errors.description}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-6 bg-indigo-950/50 border-t border-indigo-700/30">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                            hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50"
                >
                  Lanjutkan
                </button>
              </div>
            </div>

            {/* Step 2: Time & Location */}
            <div className={`${activeStep === 2 ? "block" : "hidden"}`}>
              <div className="p-8 space-y-6">
                <div className="p-6 bg-purple-900/50 rounded-lg border border-purple-700/50 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4 text-white shadow-inner">
                      <CalendarClock className="h-5 w-5" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                      Waktu & Lokasi
                    </span>
                  </h2>

                  <div className="space-y-6">
                    {/* Start Time */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <DateTimePicker24h
                        label="Waktu Mulai"
                        value={
                          formik.values.startEvent instanceof Date
                            ? formik.values.startEvent
                            : null
                        }
                        handleInputChange={(newDate: Date) =>
                          formik.setFieldValue("startEvent", newDate)
                        }
                      />
                    </div>

                    {/* End Time */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <DateTimePicker24h
                        label="Waktu Selesai"
                        value={
                          formik.values.endEvent instanceof Date
                            ? formik.values.endEvent
                            : null
                        }
                        handleInputChange={(newDate: Date) =>
                          formik.setFieldValue("endEvent", newDate)
                        }
                      />
                    </div>

                    {/* City Selection */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <SelectCity
                        value={Number(formik.values.cityId)}
                        onChange={(value) =>
                          formik.setFieldValue("cityId", Number(value))
                        }
                        city={city || []}
                        name="cityId"
                      />
                      {formik.errors.cityId && formik.touched.cityId && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                          <span className="mr-2">⚠️</span>{" "}
                          {formik.errors.cityId}
                        </div>
                      )}
                    </div>

                    {/* Location Detail */}
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <EventLocationDetail
                        value={formik.values.locationDetail}
                        onChange={formik.handleChange}
                        name="locationDetail"
                      />
                      {formik.errors.locationDetail &&
                        formik.touched.locationDetail && (
                          <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                            <span className="mr-2">⚠️</span>{" "}
                            {formik.errors.locationDetail}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between p-6 bg-indigo-950/50 border-t border-indigo-700/30">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-3 rounded-lg text-indigo-200 border border-indigo-700 hover:bg-indigo-800 hover:text-white transition-all duration-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                            hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50"
                >
                  Lanjutkan
                </button>
              </div>
            </div>

            {/* Step 3: Event Content */}
            <div className={`${activeStep === 3 ? "block" : "hidden"}`}>
              <div className="p-8 space-y-6">
                <div className="p-6 bg-purple-900/50 rounded-lg border border-purple-700/50 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4 text-white shadow-inner">
                      <Layout className="h-5 w-5" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                      Content Event
                    </span>
                  </h2>

                  <div className="w-full transition-all duration-300 hover:translate-y-[-2px]">
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
                      <div className="mt-2 text-sm text-red-300 bg-red-900/30 py-1 px-3 rounded-md flex items-center">
                        <span className="mr-2">⚠️</span> {formik.errors.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between p-6 bg-indigo-950/50 border-t border-indigo-700/30">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 rounded-lg text-indigo-200 border border-indigo-700 hover:bg-indigo-800 hover:text-white transition-all duration-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                            hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50"
                >
                  Lanjutkan
                </button>
              </div>
            </div>

            {/* Step 4: Event Thumbnail */}
            <div className={`${activeStep === 4 ? "block" : "hidden"}`}>
              <div className="p-8 space-y-6">
                <div className="p-6 bg-purple-900/50 rounded-lg border border-purple-700/50 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4 text-white shadow-inner">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                      Thumbnail Event
                    </span>
                  </h2>

                  <div className="transition-all duration-300 hover:translate-y-[-2px]">
                    <EventThumbnail
                      onImageUpload={handleImageUpload}
                      imagePreview={thumbnailPreview}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between p-6 bg-indigo-950/50 border-t border-indigo-700/30">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 rounded-lg text-indigo-200 border border-indigo-700 hover:bg-indigo-800 hover:text-white transition-all duration-200"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isPendingUpdateEvent}
                  className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium 
                            hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-indigo-700/50
                            flex items-center gap-2
                            ${
                              isPendingUpdateEvent
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            }`}
                >
                  <Save className="h-5 w-5" />
                  {isPendingUpdateEvent ? "Menyimpan..." : "Simpan Event"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditEventForm;
