"use client";

import OrderDetailPageCode from "@/features/order-detail/componets/orderDetailBody";
import useGetDetailTransactionUser from "@/hooks/transaction/useGetDetailTransactionUser";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface OrderDetailPageProps {
  uuid: string;
}

const OrderDetailPage: FC<OrderDetailPageProps> = ({ uuid }) => {
  const { data } = useGetDetailTransactionUser(uuid);
  const router = useRouter();
 

  useEffect(() => {
    if (!data) return;

    if (data.status === "CREATED") {
      router.push(`/transaction/${uuid}/applyCode`);
    } else if (data.status === "WAITING_FOR_PAYMENT") {
      router.push(`/transaction/${uuid}/uploadProofment`);
    }
  }, [data, uuid, router]); // Dependency array ensures this effect runs when `data` or `uuid` changes

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center p-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return <OrderDetailPageCode order={data} orderId={uuid} />;
};

export default OrderDetailPage;
