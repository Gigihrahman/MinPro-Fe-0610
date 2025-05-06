"use client";
import { Minus, Plus } from "lucide-react";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Seat } from "@/types/seats";
import useCreateTransaction from "@/hooks/transaction/useCreateTransaction";

interface TicketSelectionProps {
  eventId: number;
  tickets: Seat[];
}

const TicketSelection: FC<TicketSelectionProps> = ({ tickets, eventId }) => {
  const [selectedTickets, setSelectedTickets] = useState<
    Record<number, number>
  >({});
  const { mutate: createTransaction } = useCreateTransaction();

  const totalAmount = Object.entries(selectedTickets).reduce(
    (total, [id, quantity]) => {
      const ticket = tickets.find((t) => t.id === Number(id));
      return total + (ticket?.price || 0) * quantity;
    },
    0
  );

  const totalTickets = Object.values(selectedTickets).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const handleIncrement = (id: number) => {
    const ticket = tickets.find((t) => t.id === id);
    const currentQuantity = selectedTickets[id] || 0;

    if (ticket && currentQuantity + ticket.reserved < ticket.totalSeat) {
      setSelectedTickets({
        ...selectedTickets,
        [id]: currentQuantity + 1,
      });
    }
  };

  const handleDecrement = (id: number) => {
    const currentQuantity = selectedTickets[id] || 0;

    if (currentQuantity > 0) {
      const newSelectedTickets = { ...selectedTickets };
      const newQuantity = currentQuantity - 1;

      if (newQuantity === 0) {
        delete newSelectedTickets[id]; // Remove ticket from state when quantity reaches 0
      } else {
        newSelectedTickets[id] = newQuantity;
      }

      setSelectedTickets(newSelectedTickets); // Update the state
    }
  };

  const handleBuyTicketsClick = () => {
    console.log("Tickets Selected:", selectedTickets);
    console.log("Event ID:", eventId);
    console.log("Total Amount:", totalAmount);

    // Convert Record<number, number> to SeatPayload[] for API call
    const detailsEventArray = Object.entries(selectedTickets).map(
      ([seatId, quantity]) => ({
        seatsId: Number(seatId),
        quantity,
      })
    );

    // Call createTransaction with the correct data format (detailsEventArray instead of selectedTickets)
    createTransaction({
      eventId: eventId,
      detailsEvent: detailsEventArray, // Pass the array of selected seats
    });
  };

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      <h3 className="font-medium text-lg sm:text-xl">Select Tickets</h3>

      <div className="space-y-2">
        {tickets.map((ticket) => {
          const availableSeats = ticket.totalSeat - ticket.reserved;
          return (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50"
            >
              <div className="space-y-1">
                <p className="font-medium text-sm sm:text-base">
                  {ticket.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {ticket.description}
                </p>
                <p className="text-sm font-medium">
                  {formatCurrency(ticket.price)}
                </p>
                {/* Display seat availability in the format of reserved/total */}
                <p className="text-xs text-muted-foreground">
                  {ticket.reserved}/{ticket.totalSeat} seats reserved
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDecrement(ticket.id)}
                  disabled={(selectedTickets[ticket.id] || 0) === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center text-sm sm:text-base">
                  {selectedTickets[ticket.id] || 0}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleIncrement(ticket.id)}
                  disabled={
                    selectedTickets[ticket.id] === 0 ||
                    selectedTickets[ticket.id] >= availableSeats
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {totalTickets > 0 && (
        <>
          <Separator />
          <div className="flex items-center justify-between font-medium text-sm sm:text-base">
            <span>Total ({totalTickets} tickets)</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <Button
            onClick={handleBuyTicketsClick}
            className="w-full mt-4"
            disabled={totalTickets === 0}
          >
            Buy Tickets
          </Button>
        </>
      )}
    </div>
  );
};

export default TicketSelection;
