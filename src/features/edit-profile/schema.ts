import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const EditProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Please enter only numbers"),
});

