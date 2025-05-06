"use client";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

// Define the Organizer interface
interface Organizer {
  id: number;
  userId: number;
  name: string;
  profilePicture?: string;
  phoneNumber: string;
  npwp: string;
  bankName: string;
  norek: string; // Changed from BigInt to string based on the comment in the schema
  isVerified?: Date;
}

// Define the response structure from the API
interface UseOrganizerProfileResponse {
  status: string;
  message: string;
  data: {
    user: User;
    organizerProfile: Organizer;
  };
}

const useOrganizerProfile = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["organizerProfile"],
    queryFn: async () => {
      const response = await axiosInstance.get<UseOrganizerProfileResponse>(
        "/profile/profile-organizer"
      );
      return response.data.data; // Return the data object containing user and organizerProfile
    },
  });
};

export default useOrganizerProfile;
