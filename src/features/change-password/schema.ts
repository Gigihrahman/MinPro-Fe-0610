import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old password is required")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),

  newPassword: Yup.string()
    .required("New password is required")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});
