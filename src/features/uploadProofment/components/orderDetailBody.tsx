"use client";
import { ResponseDetailTransaction } from "@/types/transactions";
import { useRouter } from "next/navigation";
import { FC } from "react";
import TicketDetails from "@/features/usingCode/components/TicketDetail";
import FileUpload from "@/features/uploadProofment/components/FileUpload";
import TransactionBadge from "@/components/TransactionBadge";

interface UploadProofmentProps {
  order: ResponseDetailTransaction;
  orderId: string;
}

const UploadProofmentForm: FC<UploadProofmentProps> = ({ order, orderId }) => {
  const router = useRouter();

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

  const voucherAmount = order.voucher_amount ?? 0;
  const couponAmount = order.coupoun_amount ?? 0;
  const usedPoints = order.usedPoint ?? 0;

  const totalPrice = order.detailTransaction.reduce(
    (total, tx) => total + tx.priceAtPurchase * tx.quantity,
    0
  );

  // Ensure the final price is never less than 0
  const finalPrice = Math.max(
    totalPrice - (voucherAmount + couponAmount + usedPoints),
    0
  );

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-6 px-4">
      <div className="max-w-6xl mx-auto mb-6 text-center lg:text-left">
        <h1 className="text-2xl font-bold text-gray-800">
          Detail Pemesanan Tiket
        </h1>
        <p className="text-gray-600">Order ID: #{orderId}</p>
        <TransactionBadge status={order.status as any} />
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3 lg:px-6">
        {/* Ticket Details */}
        <div className="lg:col-span-2">
          <TicketDetails order={order} formatDate={formatDate} />
        </div>

        {/* Right Column: Payment Summary & Upload */}
        <div className="space-y-6">
          {/* Payment Summary Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rincian Pembayaran
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Harga Tiket</span>
                <span className="text-sm">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Voucher Amount</span>
                <span className="text-sm">
                  Rp {voucherAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Coupon Amount</span>
                <span className="text-sm">
                  Rp {couponAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Used Points</span>
                <span className="text-sm">{usedPoints} Poin</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Pembayaran</span>
                <span className="text-indigo-700">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Upload Proofment Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Bukti Pembayaran
            </h3>
            <FileUpload orderId={orderId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProofmentForm;
