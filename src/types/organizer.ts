export interface Organizer {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture?: string;
  confirmPassword: string;
  npwp: string;
  norek: number;
  referralCodeUsed?: string;
  bankName: "BCA" | "BRI" | "BNI";
}
export enum BankName {
    BCA = "BCA",
    BRI = "BRI",
    BNI = "BNI",
  }
  