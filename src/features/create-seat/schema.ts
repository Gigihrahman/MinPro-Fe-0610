import * as Yup from "yup";

export const createSeatSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nama ticket wajib diisi")
    .min(3, "Nama ticket minimal 3 karakter")
    .max(50, "Nama ticket maksimal 50 karakter"),
  description: Yup.string()
    .required("Deskripsi ticket wajib diisi")
    .min(10, "Deskripsi minimal 10 karakter"),
  totalSeat: Yup.number()
    .required("Jumlah kursi wajib diisi")
    .integer("Jumlah kursi harus bilangan bulat")
    .min(1, "Jumlah kursi minimal 1"),
  price: Yup.number()
    .required("Harga ticket wajib diisi")
    .min(0, "Harga tidak boleh negatif"),
});
