"use client";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DateTimePicker24h } from "@/components/DateTimePicker";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import SelectCity from "@/features/create-event/components/SelectCity";
import { createEventSchema } from "@/features/create-event/schemas";
import EventCategory from "./components/EventCategory";
import EventImage from "./components/EventImage";
import EventTitle from "./components/EventTitle";

const CreateEventPage = () => {
  const [eventImage, setEventImage] = useState<string | null>(null);
  const data: string[] = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Batam",
    "Denpasar",
    "Yogyakarta",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEventImage(null); // Clear the image preview
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      content: "",
      address: "",
      city: "",
      startDateTime: null,
      endDateTime: null,
    },
    validationSchema: createEventSchema,
    onSubmit: async (values) => {
      console.log(values);
      // Your submission logic goes here, for example sending data to an API
    },
  });

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Link
        href="/organizer/dashboard"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Create New Event
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <EventTitle
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
        />
        {formik.errors.title && formik.touched.title && (
          <div className="text-sm text-red-500">{formik.errors.title}</div>
        )}

        <EventCategory
          value={formik.values.category}
          onChange={(value) => formik.setFieldValue("category", value)}
          name="category"
        />
        {formik.errors.category && formik.touched.category && (
          <div className="text-sm text-red-500">{formik.errors.category}</div>
        )}

        <DateTimePicker24h
          label="Start Event"
          value={formik.values.startDateTime}
          handleInputChange={(newDate: Date) =>
            formik.setFieldValue("startDateTime", newDate)
          }
        />
        {formik.errors.startDateTime && formik.touched.startDateTime && (
          <div className="text-sm text-red-500">
            {formik.errors.startDateTime}
          </div>
        )}

        <DateTimePicker24h
          label="End Event"
          value={formik.values.endDateTime}
          handleInputChange={(newDate: Date) =>
            formik.setFieldValue("endDateTime", newDate)
          }
        />
        {formik.errors.endDateTime && formik.touched.endDateTime && (
          <div className="text-sm text-red-500">
            {formik.errors.endDateTime}
          </div>
        )}

        <SelectCity
          value={formik.values.city}
          onChange={(value) => formik.setFieldValue("city", value)}
          data={data}
        />
        {formik.errors.city && formik.touched.city && (
          <div className="text-sm text-red-500">{formik.errors.city}</div>
        )}

        <TiptapRichtextEditor
          label="content"
          field="content"
          isTouch={formik.touched.content}
          content={formik.values.content}
          setError={formik.setFieldError}
          setTouch={formik.setFieldTouched}
          onChange={(value: string) => formik.setFieldValue("content", value)}
        />

        <EventImage
          onImageUpload={handleImageUpload}
          imagePreview={eventImage}
          onRemoveImage={handleRemoveImage}
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-md border bg-gray-100 px-4 py-2 text-gray-700"
          >
            <Link href="/organizer/dashboard">Cancel</Link>
          </button>
          <button
            type="submit"
            className="rounded-md border bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
