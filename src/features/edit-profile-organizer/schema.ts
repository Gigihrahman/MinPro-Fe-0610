"use client";
import { BankName } from "@/types/organizer";
import * as Yup from "yup";

export const EditOrganizerProfileSchema = Yup.object().shape({
  // User data
  fullName: Yup.string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  email: Yup.string().email("Email tidak valid"),
  phoneNumber: Yup.string().matches(
    /^\+?[0-9]{10,15}$/,
    "Nomor telepon tidak valid"
  ),

  // Organizer data
  name: Yup.string()
    .min(3, "Nama organizer minimal 3 karakter")
    .max(100, "Nama organizer maksimal 100 karakter"),
  organizerPhoneNumber: Yup.string().matches(
    /^\+?[0-9]{10,15}$/,
    "Nomor telepon organizer tidak valid"
  ),
  npwp: Yup.string().matches(/^[0-9]{15,16}$/, "NPWP tidak valid"),
  bankName: Yup.mixed<BankName>().oneOf(
    Object.values(BankName),
    "Bank tidak valid"
  ),
  norek: Yup.string().matches(/^[0-9]{10,20}$/, "Nomor rekening tidak valid"),
  profilePicture: Yup.string(),
});
