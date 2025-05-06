"use client";
import OrderDetailPageCode from "@/features/usingCode/components/BodyUsingCode";
import useGetDetailTransactionUser from "@/hooks/transaction/useGetDetailTransactionUser";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface UsingCodeProps {
  uuid: string;
}
const UsingCodePage: FC<UsingCodeProps> = ({ uuid }) => {
  const { data } = useGetDetailTransactionUser(uuid);
  const router = useRouter();

  if (!data) {
    router.push(`/transaction/${uuid}`);
    return;
  }

  if (data.status !== "CREATED") {
    router.push(`/transaction/${uuid}`);
  }
  return <OrderDetailPageCode order={data} orderId={uuid} />;
};

export default UsingCodePage;
