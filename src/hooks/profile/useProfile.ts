"use client";

import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

interface useGetProfileExtends extends User {
  referalCode: string;
}
const useGetProfile = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      // Mendapatkan data profil umum
      const { data: profileData } =
        await axiosInstance.get<useGetProfileExtends>("/profile");

      // Mendapatkan foto profil dengan endpoint khusus jika tersedia
      try {
        const { data: photoData } = await axiosInstance.get("/profile/photo");
        if (photoData && photoData.profilePicture) {
          // Menggabungkan data foto dengan data profil
          return {
            ...profileData,
            profilePicture: photoData.profilePicture,
          };
        }
      } catch (error) {
        // Jika terjadi error saat mengambil foto, tetap kembalikan data profil
        console.warn("Failed to fetch profile picture:", error);
      }

      return profileData;
    },
    staleTime: 5 * 60 * 1000, // Data dianggap segar selama 5 menit
  });
};

export default useGetProfile;
