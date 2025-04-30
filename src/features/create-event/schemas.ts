import * as Yup from "yup";

export const createEventSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  startDateTime: Yup.date().required("Start date & time is required"),
  endDateTime: Yup.date().required("End date & time is required"),
  city: Yup.string().required("City is required"),
  content: Yup.string().required("Description is required"),
});
