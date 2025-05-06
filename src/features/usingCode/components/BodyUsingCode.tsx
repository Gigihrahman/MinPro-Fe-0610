import { ResponseDetailTransaction } from "@/types/transactions";

import { FC, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import TicketDetails from "./TicketDetail";
import useApplyVoucher from "@/hooks/transaction/useApplyCode";
import TransactionBadge from "@/components/TransactionBadge";
interface OrderDetailPageProps {
  order: ResponseDetailTransaction | null;
  orderId: string;
}

const OrderDetailPageCode: FC<OrderDetailPageProps> = ({ order, orderId }) => {
  const [usePoints, setUsePoints] = useState<boolean>(false); // State for checkbox
  const { mutate: applyCode } = useApplyVoucher(orderId);
  // Fetching data using custom hook

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center p-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Calculate total price (before any discounts)
  const totalPrice = order.detailTransaction.reduce(
    (total, transaction) =>
      total + transaction.priceAtPurchase * transaction.quantity,
    0
  );

  const discountedPrice = totalPrice; // Without discount logic

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-6 px-4 lg:py-10">
      <div className="max-w-6xl mx-auto mb-6 text-center lg:text-left lg:px-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center lg:justify-start">
          Detail Pemesanan Tiket
        </h1>
        <p className="text-gray-600">Order ID: #{orderId}</p>
        <TransactionBadge status={order.status as any} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-6">
          <TicketDetails order={order} formatDate={formatDate} />
          <PaymentSummary
            usePoints={usePoints}
            setUsePoints={setUsePoints}
            totalPrice={totalPrice}
            discountedPrice={discountedPrice}
            fetchTransaction={() => {}}
            orderId={orderId}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="col-span-2">
            <TicketDetails order={order} formatDate={formatDate} />
          </div>
          <div className="col-span-1">
            <PaymentSummary
              usePoints={usePoints}
              setUsePoints={setUsePoints}
              totalPrice={totalPrice}
              discountedPrice={discountedPrice}
              fetchTransaction={(values) => {
                applyCode({ ...values, usePoints });
              }}
              orderId={orderId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPageCode;
