// features/create-event/schemas.ts
import * as Yup from "yup";

export const createEventSchema = Yup.object().shape({
  name: Yup.string()
    .required("Judul event wajib diisi")
    .min(5, "Judul minimal 5 karakter")
    .max(100, "Judul maksimal 100 karakter"),

  categoryId: Yup.number()
    .required("Kategori event wajib dipilih")
    .positive("Kategori harus berupa angka positif")
    .integer("Kategori harus berupa angka bulat"),

  description: Yup.string()
    .required("Deskripsi event wajib diisi")
    .min(10, "Deskripsi minimal 20 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),

  content: Yup.string()
    .required("Konten event wajib diisi")
    .min(10, "Konten minimal 50 karakter"),

  cityId: Yup.number()
    .required("Kota wajib dipilih")
    .positive("Kota harus berupa angka positif")
    .integer("Kota harus berupa angka bulat"),

  locationDetail: Yup.string()
    .required("Detail lokasi wajib diisi")
    .min(10, "Detail lokasi minimal 10 karakter")
    .max(300, "Detail lokasi maksimal 300 karakter"),

  startEvent: Yup.date()
    .required("Waktu mulai wajib diisi")
    .min(new Date(), "Waktu mulai tidak boleh di masa lalu"),

  endEvent: Yup.date()
    .required("Waktu selesai wajib diisi")
    .min(Yup.ref("startEvent"), "Waktu selesai harus setelah waktu mulai"),
});
