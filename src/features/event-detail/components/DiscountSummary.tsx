"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface DiscountSummaryProps {
  subtotal: number;
  voucherDiscount?: number;
  couponDiscount?: number;
  pointsDiscount?: number;
}

export function DiscountSummary({
  subtotal,
  voucherDiscount = 0,
  couponDiscount = 0,
  pointsDiscount = 0,
}: DiscountSummaryProps) {
  const [total, setTotal] = useState(subtotal);

  useEffect(() => {
    const calculatedTotal =
      subtotal - voucherDiscount - couponDiscount - pointsDiscount;
    setTotal(calculatedTotal > 0 ? calculatedTotal : 0);
  }, [subtotal, voucherDiscount, couponDiscount, pointsDiscount]);

  const hasDiscounts =
    voucherDiscount > 0 || couponDiscount > 0 || pointsDiscount > 0;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      {voucherDiscount > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Voucher discount</span>
          <span className="text-green-600">
            -{formatCurrency(voucherDiscount)}
          </span>
        </div>
      )}

      {couponDiscount > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Coupon discount</span>
          <span className="text-green-600">
            -{formatCurrency(couponDiscount)}
          </span>
        </div>
      )}

      {pointsDiscount > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Points applied</span>
          <span className="text-green-600">
            -{formatCurrency(pointsDiscount)}
          </span>
        </div>
      )}

      {hasDiscounts && <Separator className="my-2" />}

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
