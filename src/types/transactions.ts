import { Event } from "@/types/event";
import { Seat } from "@/types/seats";

export interface Transaction {
  uuid: string;
  status: string;
  totalPrice: number;
  coupoun_amount: number;
  voucher_amount: number;
  usedPoint: number;
  event: Pick<
    Event,
    "name" | "thumbnail" | "city" | "category" | "startEvent" | "endEvent"
  >;
}
export interface DetailTransaction {
  id: number;
  uuid: string;
  transactionId: number;
  seatsId: number;
  quantity: number;
  priceAtPurchase: number;
  createdAt: string;
  updatedAt: string;
  seats: Seat;
}
export interface ResponseDetailTransaction {
  uuid: string;
  status: string;
  totalPrice: number;
  coupoun_amount: number;
  voucher_amount: number;
  usedPoint: number;
  event: Pick<
    Event,
    "name" | "thumbnail" | "city" | "category" | "startEvent" | "endEvent"
  >;
  detailTransaction: DetailTransaction[];
}
