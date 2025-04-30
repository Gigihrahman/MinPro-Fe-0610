"use client"

import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

interface UseGetProfileResponse extends User {
  role: string;
  referalCode: string;
  profilePicture?: string;
}


const useGetProfile = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UseGetProfileResponse>(
        "/profile"
      );
      return data;
    },
  });
};

export default useGetProfile;
