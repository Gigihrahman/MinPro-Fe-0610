"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CalendarIcon,
  CreditCard,
  Tag,
  Ticket,
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

interface OrderDetailProps {
  orderId: string;
}

interface TicketType {
  ticketName: string;
  quantity: number;
  price: number;
}

interface OrderData {
  concertDate: string;
  ticketTypes: TicketType[];
  specialRequests: string;
}

const OrderDetailPage: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const router = useRouter();
  const [payload, setPayload] = useState<any>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  // Simulating fetching order data based on orderId
  useEffect(() => {
    const mockOrderData: OrderData = {
      concertDate: "2025-06-10",
      ticketTypes: [
        { ticketName: "VIP", quantity: 1, price: 500000 },
        { ticketName: "Regular", quantity: 2, price: 200000 },
      ],
      specialRequests: "Front row seats",
    };
    setOrder(mockOrderData);
  }, [orderId]);

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      couponCode: "",
    },
    validationSchema: Yup.object({
      voucherCode: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, "Kode voucher harus berupa alfanumerik")
        .optional(),
      couponCode: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, "Kode kupon harus berupa alfanumerik")
        .optional(),
    }),
    onSubmit: (values) => {
      setIsApplying(true);
      // Simulate a small delay to show loading state
      setTimeout(() => {
        // Simulate applying a discount based on voucher and coupon codes
        let newDiscount = 0;
        if (values.voucherCode === "VIP10") {
          newDiscount += 0.1; // 10% off for VIP voucher
        } else if (values.couponCode === "SUMMER20") {
          newDiscount += 0.2; // 20% off for Summer coupon
        }

        setDiscount(newDiscount);
        setDiscountApplied(newDiscount > 0);
        setPayload(values);
        setIsApplying(false);
      }, 600);
    },
  });

  const handlePayment = () => {
    // Payment logic goes here
    router.push("/payment"); // Redirect to payment page
  };

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

  // Calculate the total price after applying the discount
  const totalPrice = order.ticketTypes.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0
  );
  const discountAmount = totalPrice * discount;
  const discountedPrice = totalPrice - discountAmount;

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

  // Left Column Components
  const TicketDetails = () => (
    <div className="space-y-6">
      {/* Tanggal Konser */}
      <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
        <CalendarIcon className="h-5 w-5 text-indigo-600 mr-3" />
        <div>
          <p className="text-sm text-indigo-600 font-medium">Tanggal Konser</p>
          <p className="font-semibold">{formatDate(order!.concertDate)}</p>
        </div>
      </div>

      {/* Detail Tiket */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Detail Tiket
        </h3>
        <div className="space-y-3">
          {order!.ticketTypes.map((ticket, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="font-medium">{ticket.ticketName}</span>
                </div>
                <Badge
                  variant={ticket.ticketName === "VIP" ? "default" : "outline"}
                >
                  {ticket.quantity > 1
                    ? `${ticket.quantity} tiket`
                    : `${ticket.quantity} tiket`}
                </Badge>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga per tiket</span>
                  <span>Rp {ticket.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rp{" "}
                    {(ticket.price * ticket.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permintaan Khusus */}
      {order!.specialRequests && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-amber-800 font-medium flex items-center mb-1">
            <AlertCircle className="h-4 w-4 mr-1" /> Permintaan Khusus
          </h3>
          <p className="text-amber-700">{order!.specialRequests}</p>
        </div>
      )}
    </div>
  );

  // Right Column Components
  const PaymentSummary = () => (
    <div className="space-y-6">
      {/* Kode Promo */}
      <div className="bg-gray-50 rounded-lg p-5 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kode Promo</h3>

        <div className="space-y-4">
          {/* Voucher Code Input */}
          <div>
            <label
              htmlFor="voucherCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kode Voucher
            </label>
            <div className="flex gap-2">
              <Input
                id="voucherCode"
                type="text"
                placeholder="Masukkan kode voucher"
                value={formik.values.voucherCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-gray-300"
              />
            </div>
            {formik.touched.voucherCode && formik.errors.voucherCode && (
              <p className="text-xs text-red-600 mt-1">
                {formik.errors.voucherCode}
              </p>
            )}
          </div>

          {/* Coupon Code Input */}
          <div>
            <label
              htmlFor="couponCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kode Kupon
            </label>
            <div className="flex gap-2">
              <Input
                id="couponCode"
                type="text"
                placeholder="Masukkan kode kupon"
                value={formik.values.couponCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-gray-300"
              />
            </div>
            {formik.touched.couponCode && formik.errors.couponCode && (
              <p className="text-xs text-red-600 mt-1">
                {formik.errors.couponCode}
              </p>
            )}
          </div>

          {/* Apply Button */}
          <div>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              variant="outline"
              className="w-full"
              disabled={isApplying}
            >
              {isApplying ? (
                <>
                  <span className="mr-2">Menerapkan...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                </>
              ) : discountApplied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                  Kode Promo Diterapkan
                </>
              ) : (
                "Terapkan Kode"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Ringkasan Pembayaran Card */}
      <Card className="border-indigo-200 shadow-md">
        <CardHeader className="pb-3 bg-indigo-50">
          <CardTitle className="text-lg font-medium flex items-center text-indigo-800">
            <ShoppingBag className="h-5 w-5 mr-2" /> Ringkasan Pembayaran
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Total Harga Tiket</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Diskon</span>
              <span className={discount > 0 ? "text-green-600" : ""}>
                {discount > 0
                  ? `- Rp ${discountAmount.toLocaleString("id-ID")}`
                  : "Rp 0"}
              </span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Pembayaran</span>
              <span className="text-indigo-700">
                Rp {discountedPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 pt-4">
          <Button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <CreditCard className="mr-2 h-4 w-4" /> Lanjutkan ke Pembayaran
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-6 px-4 lg:py-10">
      {/* Header - Full Width in both Mobile and Desktop */}
      <div className="max-w-6xl mx-auto mb-6 text-center lg:text-left lg:px-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center lg:justify-start">
          <Ticket className="mr-2 h-6 w-6 text-indigo-600" /> Detail Pemesanan
          Tiket
        </h1>
        <p className="text-gray-600">Order ID: #{orderId}</p>
      </div>

      {/* Main Content - Grid Layout for Desktop */}
      <div className="max-w-6xl mx-auto">
        {/* Mobile Layout (Single Column) */}
        <div className="block lg:hidden space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardContent className="p-5">
              <TicketDetails />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none overflow-hidden">
            <CardContent className="p-5">
              <PaymentSummary />
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout (Two Columns) */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left Column (2/3 width) - Ticket Details */}
          <div className="col-span-2">
            <Card className="shadow-lg border-none h-full overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle>Informasi Pemesanan</CardTitle>
                <CardDescription className="text-indigo-100">
                  Detail tiket dan informasi event
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TicketDetails />
              </CardContent>
            </Card>
          </div>

          {/* Right Column (1/3 width) - Payment Summary */}
          <div className="col-span-1">
            <div className="sticky top-6">
              <PaymentSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
