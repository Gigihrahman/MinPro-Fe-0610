// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   User,
//   Phone,
//   Mail,
//   Building,
//   CreditCard,
//   FileText,
//   Save,
//   ArrowLeft,
//   Camera,
// } from "lucide-react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import useOrganizerProfile from "@/hooks/organizer/useOrganizerProfile";
// import { useToast } from "@/components/toast/use-toast";

// // Bank options - adjust based on your application needs
// const bankOptions = [
//   "BCA",
//   "Mandiri",
//   "BNI",
//   "BRI",
//   "CIMB Niaga",
//   "Permata",
//   "Danamon",
//   "Maybank",
//   "Other",
// ];

// export default function EditOrganizerProfile() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { data, isPending, refetch } = useOrganizerProfile();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     userPhoneNumber: "",
//     organizerName: "",
//     organizerPhoneNumber: "",
//     npwp: "",
//     bankName: "",
//     accountNumber: "",
//   });

//   const [profilePicture, setProfilePicture] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Populate form when data is available
//   useEffect(() => {
//     if (data) {
//       const { user, organizerProfile } = data;
//       setFormData({
//         fullName: user.fullName || "",
//         email: user.email || "",
//         userPhoneNumber: user.phoneNumber || "",
//         organizerName: organizerProfile.name || "",
//         organizerPhoneNumber: organizerProfile.phoneNumber || "",
//         npwp: organizerProfile.npwp || "",
//         bankName: organizerProfile.bankName || "",
//         accountNumber: organizerProfile.norek?.toString() || "",
//       });

//       if (organizerProfile.profilePicture) {
//         setProfilePicture(organizerProfile.profilePicture);
//       }
//     }
//   }, [data]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleBankChange = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       bankName: value,
//     }));
//   };

//   const handleProfilePictureChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         setProfilePicture(ev.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//       // Here you would typically handle the file for upload
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Here you would implement the API call to update the profile
//       // const response = await axiosInstance.put('/organizer/profile', {
//       //   user: {
//       //     fullName: formData.fullName,
//       //     email: formData.email,
//       //     phoneNumber: formData.userPhoneNumber,
//       //   },
//       //   organizer: {
//       //     name: formData.organizerName,
//       //     phoneNumber: formData.organizerPhoneNumber,
//       //     npwp: formData.npwp,
//       //     bankName: formData.bankName,
//       //     norek: formData.accountNumber,
//       //   },
//       //   // Add file upload logic for profile picture
//       // });

//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       toast({
//         title: "Profile Updated",
//         description: "Your organizer profile has been successfully updated.",
//         duration: 3000,
//       });

//       // Refetch the profile data to reflect changes
//       refetch();

//       // Navigate back to profile page
//       router.push("/organizer/profile");
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description:
//           "There was an error updating your profile. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//       console.error("Error updating profile:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const navigateBack = () => {
//     router.push("/organizer/profile");
//   };

//   if (isPending) {
//     return (
//       <div className="flex h-[30vh] items-center justify-center">
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto max-w-4xl py-8 px-4">
//       <Button
//         variant="ghost"
//         className="mb-4 text-purple-700"
//         onClick={navigateBack}
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         Back to Profile
//       </Button>

//       <Card className="overflow-hidden border-purple-100 shadow-lg">
//         <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
//           <h2 className="text-2xl font-bold">Edit Organizer Profile</h2>
//           <p className="text-white/80">
//             Update your personal and organizer information
//           </p>
//         </CardHeader>

//         <CardContent className="p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Profile Picture Section */}
//             <div className="flex flex-col items-center pb-6 border-b border-purple-100">
//               <div className="relative group">
//                 <Avatar className="w-32 h-32 border-4 border-purple-100 shadow-md">
//                   <AvatarImage
//                     src={profilePicture || ""}
//                     alt={formData.organizerName}
//                   />
//                   <AvatarFallback className="text-3xl bg-purple-400/50 text-white">
//                     {formData.organizerName.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <label
//                   htmlFor="profile-picture"
//                   className="absolute bottom-0 right-0 p-2 bg-white text-purple-700 rounded-full cursor-pointer hover:bg-purple-50 transition-colors shadow-md opacity-90 group-hover:opacity-100"
//                   title="Change profile picture"
//                 >
//                   <Camera className="h-5 w-5" />
//                   <span className="sr-only">Change profile picture</span>
//                 </label>
//                 <input
//                   id="profile-picture"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleProfilePictureChange}
//                 />
//               </div>
//               <p className="mt-3 text-sm text-gray-500">
//                 Click the camera icon to change your profile picture
//               </p>
//             </div>

//             {/* User Information Section */}
//             <div>
//               <h3 className="text-lg font-medium text-purple-800 mb-4">
//                 User Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="fullName" className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-purple-600" />
//                     Full Name
//                   </Label>
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Your full name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-purple-600" />
//                     Email Address
//                   </Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Your email address"
//                     disabled // Email is typically not editable
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="userPhoneNumber"
//                     className="flex items-center gap-2"
//                   >
//                     <Phone className="h-4 w-4 text-purple-600" />
//                     Phone Number
//                   </Label>
//                   <Input
//                     id="userPhoneNumber"
//                     name="userPhoneNumber"
//                     value={formData.userPhoneNumber}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Your phone number"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Organizer Information Section */}
//             <div>
//               <h3 className="text-lg font-medium text-purple-800 mb-4">
//                 Organizer Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="organizerName"
//                     className="flex items-center gap-2"
//                   >
//                     <Building className="h-4 w-4 text-purple-600" />
//                     Organizer Name
//                   </Label>
//                   <Input
//                     id="organizerName"
//                     name="organizerName"
//                     value={formData.organizerName}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Organizer name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="organizerPhoneNumber"
//                     className="flex items-center gap-2"
//                   >
//                     <Phone className="h-4 w-4 text-purple-600" />
//                     Organizer Phone
//                   </Label>
//                   <Input
//                     id="organizerPhoneNumber"
//                     name="organizerPhoneNumber"
//                     value={formData.organizerPhoneNumber}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Organizer phone number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="npwp" className="flex items-center gap-2">
//                     <FileText className="h-4 w-4 text-purple-600" />
//                     NPWP
//                   </Label>
//                   <Input
//                     id="npwp"
//                     name="npwp"
//                     value={formData.npwp}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="NPWP number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bankName" className="flex items-center gap-2">
//                     <Building className="h-4 w-4 text-purple-600" />
//                     Bank Name
//                   </Label>
//                   <Select
//                     value={formData.bankName}
//                     onValueChange={handleBankChange}
//                   >
//                     <SelectTrigger className="border-purple-100 focus:ring-purple-500">
//                       <SelectValue placeholder="Select bank" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {bankOptions.map((bank) => (
//                         <SelectItem key={bank} value={bank}>
//                           {bank}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="accountNumber"
//                     className="flex items-center gap-2"
//                   >
//                     <CreditCard className="h-4 w-4 text-purple-600" />
//                     Account Number
//                   </Label>
//                   <Input
//                     id="accountNumber"
//                     name="accountNumber"
//                     value={formData.accountNumber}
//                     onChange={handleInputChange}
//                     className="border-purple-100 focus-visible:ring-purple-500"
//                     placeholder="Bank account number"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-100">
//               <Button
//                 type="submit"
//                 variant="default"
//                 className="bg-purple-600 text-white hover:bg-purple-700"
//                 disabled={isSubmitting}
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 {isSubmitting ? "Saving..." : "Save Changes"}
//               </Button>

//               <Button
//                 type="button"
//                 variant="outline"
//                 className="border-purple-200 text-purple-700 hover:bg-purple-50"
//                 onClick={navigateBack}
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
