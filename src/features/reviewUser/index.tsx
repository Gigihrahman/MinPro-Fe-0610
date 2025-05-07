"use client";
import { Button } from "@/components/ui/button";
import ReviewFormUser from "@/features/reviewUser/components/FormReview";
import useGetDetailTransactionUser from "@/hooks/transaction/useGetDetailTransactionUser";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ReviewUserPageProps {
  uuid: string;
}
const ReviewUserPage: FC<ReviewUserPageProps> = ({ uuid }) => {
  const router = useRouter();
  const { data: transaksi } = useGetDetailTransactionUser(uuid);
  if (
    !transaksi ||
    transaksi.status !== "DONE" ||
    new Date(transaksi.event.endEvent) > new Date()
  ) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Peringatan: Transaksi Tidak Ditemukan
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Anda belum bisa membuat review pada transaksi ini. Silakan Silahkan
          tunggu setelah anda melakukan transaksi dan event sudah selesai.
        </p>
        <Button
          onClick={() => router.push("/transaction")}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none"
        >
          Coba Lagi
        </Button>
      </div>
    );
  }

  return <ReviewFormUser uuid={uuid} />;
};

export default ReviewUserPage;
