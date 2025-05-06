"use client";
import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface TransactionBadgeProps {
  status: string;
}

const TransactionBadge: FC<TransactionBadgeProps> = ({ status }) => {
  let colorClass: string;

  switch (status) {
    case "CREATED":
      colorClass = "bg-blue-500 text-white";
      break;
    case "WAITING_FOR_PAYMENT":
      colorClass = "bg-yellow-500 text-white";
      break;
    case "WAITING_FOR_ADMIN_CONFIRMATION":
      colorClass = "bg-orange-500 text-white";
      break;
    case "DONE":
      colorClass = "bg-green-500 text-white";
      break;
    case "REJECTED":
      colorClass = "bg-red-500 text-white";
      break;
    case "EXPIRED":
      colorClass = "bg-gray-500 text-white";
      break;
    case "CANCELED":
      colorClass = "bg-pink-500 text-white";
      break;
    default:
      colorClass = "bg-gray-500 text-white";
      break;
  }

  return <Badge className={colorClass}>{status}</Badge>;
};

export default TransactionBadge;
