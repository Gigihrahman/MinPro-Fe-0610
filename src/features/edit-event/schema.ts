// features/create-event/schemas.ts
import * as Yup from "yup";

export const updateEventSchema = Yup.object().shape({
  name: Yup.string()
    .optional()
    .min(5, "Judul minimal 5 karakter")
    .max(100, "Judul maksimal 100 karakter"),

  categoryId: Yup.number()
    .optional()
    .positive("Kategori harus berupa angka positif")
    .integer("Kategori harus berupa angka bulat"),

  description: Yup.string()
    .optional()
    .min(10, "Deskripsi minimal 20 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),

  content: Yup.string().optional().min(10, "Konten minimal 50 karakter"),

  cityId: Yup.number()
    .optional()
    .positive("Kota harus berupa angka positif")
    .integer("Kota harus berupa angka bulat"),

  locationDetail: Yup.string()
    .optional()
    .min(10, "Detail lokasi minimal 10 karakter")
    .max(300, "Detail lokasi maksimal 300 karakter"),

  startEvent: Yup.date()
    .optional()
    .min(new Date(), "Waktu mulai tidak boleh di masa lalu"),

  endEvent: Yup.date()
    .optional()
    .min(new Date(), "Waktu mulai tidak boleh di masa lalu"),
});
