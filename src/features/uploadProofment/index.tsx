"use client";

import UploadProofmentForm from "@/features/uploadProofment/components/orderDetailBody";
import useGetDetailTransactionUser from "@/hooks/transaction/useGetDetailTransactionUser";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface UploadProofmentPageProps {
  uuid: string;
}
const UploadProofmentPage: FC<UploadProofmentPageProps> = ({ uuid }) => {
  const { data } = useGetDetailTransactionUser(uuid);
  const router = useRouter();

  if (!data) {
    router.push("/transaction");
    return;
  }

  if (data.status !== "WAITING_FOR_PAYMENT") {
    router.push(`/transaction/${uuid}`);
  }

  return <UploadProofmentForm order={data} orderId={uuid} />;
};

export default UploadProofmentPage;
