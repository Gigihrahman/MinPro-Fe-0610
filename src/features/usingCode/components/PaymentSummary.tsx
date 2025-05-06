import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ShoppingBag } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApplyVoucher from "@/hooks/transaction/useApplyCode";

interface PaymentSummaryProps {
  usePoints: boolean;
  setUsePoints: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  discountedPrice: number;
  fetchTransaction: (values: any) => void;
  orderId: string;
}

const PaymentSummary = ({
  usePoints,
  setUsePoints,
  totalPrice,
  discountedPrice,
  fetchTransaction,
  orderId,
}: PaymentSummaryProps) => {
  const { mutate: applyCode } = useApplyVoucher(orderId);

  // Formik hook for form management
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
      applyCode({ ...values, isUsedPoints: usePoints });
    },
  });

  return (
    <div className="space-y-6">
      {/* Promo Code */}
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

          {/* Points Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="usePoints"
              checked={usePoints}
              onChange={(e) => setUsePoints(e.target.checked)}
              className="h-5 w-5"
            />
            <label htmlFor="usePoints" className="text-sm text-gray-700">
              Gunakan Poin anda
            </label>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
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
            onClick={() => formik.handleSubmit()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <CreditCard className="mr-2 h-4 w-4" /> Lanjutkan ke Pembayaran
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSummary;
