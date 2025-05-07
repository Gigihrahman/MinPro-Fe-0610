"use client";
import TransactionBadge from "@/components/TransactionBadge";
import TicketDetails from "@/features/usingCode/components/TicketDetail";
import { ResponseDetailTransaction } from "@/types/transactions";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { formatDate } from "@/lib/formatDate";

interface OrderDetailPageProps {
  order: ResponseDetailTransaction;
  orderId: string;
}

const OrderDetailPageCode: FC<OrderDetailPageProps> = ({ order, orderId }) => {
  const router = useRouter();

  const totalPrice = order.detailTransaction.reduce(
    (total, transaction) =>
      total + transaction.priceAtPurchase * transaction.quantity,
    0
  );

  const finalPrice =
    totalPrice -
    (order.voucher_amount + order.coupoun_amount + order.usedPoint);

  const finalAmount = Math.max(finalPrice, 1);

  const formatCurrencyOrZero = (value: number | null | undefined) => {
    if (value == null) return "Rp 0";
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  const handleReviewButtonClick = () => {
    router.push(`/review/${orderId}`);
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rincian Pembayaran
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Harga Tiket</span>
                <span className="text-sm">
                  {formatCurrencyOrZero(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Voucher Amount</span>
                <span className="text-sm">
                  {formatCurrencyOrZero(order.voucher_amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Coupon Amount</span>
                <span className="text-sm">
                  {formatCurrencyOrZero(order.coupoun_amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Used Points</span>
                <span className="text-sm">{order.usedPoint || 0} Poin</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Pembayaran</span>
                <span className="text-indigo-700">
                  {formatCurrencyOrZero(finalAmount)}
                </span>
              </div>
            </div>

            {order.status === "DONE" &&
              order.event?.endEvent &&
              new Date(order.event.endEvent) < new Date() && (
                <button
                  onClick={handleReviewButtonClick}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                  Tulis Review
                </button>
              )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="col-span-2">
            <TicketDetails order={order} formatDate={formatDate} />
          </div>
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rincian Pembayaran
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Total Harga Tiket
                  </span>
                  <span className="text-sm">
                    {formatCurrencyOrZero(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Voucher Amount</span>
                  <span className="text-sm">
                    {formatCurrencyOrZero(order.voucher_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Coupon Amount</span>
                  <span className="text-sm">
                    {formatCurrencyOrZero(order.coupoun_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Used Points</span>
                  <span className="text-sm">{order.usedPoint || 0} Poin</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Pembayaran</span>
                  <span className="text-indigo-700">
                    {formatCurrencyOrZero(finalAmount)}
                  </span>
                </div>
              </div>
            </div>
            {/* Review Button */}
            {order.status === "DONE" &&
              order.event?.endEvent &&
              new Date(order.event.endEvent) < new Date() && (
                <button
                  onClick={handleReviewButtonClick}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                  Tulis Review
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPageCode;
