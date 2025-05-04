import * as Yup from "yup";

export const voucherSchema = Yup.object().shape({
  value: Yup.number()
    .required("Jumlah diskon wajib diisi")
    .positive("Jumlah diskon harus lebih besar dari 0")
    .integer("Jumlah diskon harus bilangan bulat")
    .min(1, "Jumlah diskon minimal 1 Rupiah"),
  description: Yup.string()
    .required("Deskripsi voucher wajib diisi")
    .min(10, "Deskripsi minimal 10 karakter")
    .max(500, "Deskripsi maksimal 500 karakter"),
  quota: Yup.number()
    .required("Kuota voucher wajib diisi")
    .positive("Kuota harus lebih besar dari 0")
    .integer("Kuota harus bilangan bulat")
    .min(1, "Kuota minimal 1"),
  validAt: Yup.date().required("Tanggal berlaku voucher wajib diisi"),
  expiredAt: Yup.date()
    .required("Tanggal kedaluwarsa voucher wajib diisi")
    .min(
      Yup.ref("validAt"),
      "Tanggal kedaluwarsa harus setelah tanggal berlaku"
    ),
});
