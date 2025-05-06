import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterOrganizerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .required("Phone number is required"),
  npwp: Yup.string().required("NPWP is required"),
  norek: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .required("No. Rekening is required"),
  bankName: Yup.string()
    .oneOf(["BCA", "BRI", "BNI"], "Invalid bank")
    .required("Bank is required"),
  referralCodeUsed: Yup.string().optional(),
});
