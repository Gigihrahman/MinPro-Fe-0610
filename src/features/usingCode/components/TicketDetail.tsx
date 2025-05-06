import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag, CalendarIcon } from "lucide-react";
import { DetailTransaction } from "@/types/transactions";

interface TicketDetailsProps {
  order: {
    event: {
      startEvent: string;
    };
    detailTransaction: DetailTransaction[];
  };
  formatDate: (dateString: string) => string;
}

const TicketDetails = ({ order, formatDate }: TicketDetailsProps) => (
  <div className="space-y-6">
    {/* Concert Date */}
    <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
      <CalendarIcon className="h-5 w-5 text-indigo-600 mr-3" />
      <div>
        <p className="text-sm text-indigo-600 font-medium">Tanggal Konser</p>
        <p className="font-semibold">{formatDate(order.event.startEvent)}</p>
      </div>
    </div>

    {/* Ticket Details */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Detail Tiket</h3>
      <div className="space-y-3">
        {order.detailTransaction.map((ticket, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="font-medium">{ticket.seats.name}</span>
              </div>
              <Badge
                variant={ticket.seats.name === "VIP" ? "default" : "outline"}
              >
                {ticket.quantity > 1
                  ? `${ticket.quantity} tiket`
                  : `${ticket.quantity} tiket`}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Harga per tiket</span>
                <span>Rp {ticket.priceAtPurchase.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  Rp{" "}
                  {(ticket.priceAtPurchase * ticket.quantity).toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TicketDetails;
