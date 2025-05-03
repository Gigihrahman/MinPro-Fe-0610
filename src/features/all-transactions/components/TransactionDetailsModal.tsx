"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TransactionDetailsProps {
  transactionId: number
  isOpen: boolean
  onClose: () => void
}

export default function TransactionDetailsModal({ transactionId, isOpen, onClose }: TransactionDetailsProps) {
  // In a real app, you would fetch transaction details based on the ID
  const transactionDetails = {
    id: "TRX-12345",
    event: "WHISKY LIVE JAKARTA 2025",
    customer: "Budi Santoso",
    email: "budi@mail.com",
    phone: "+62 812 3456 7890",
    date: "27 Apr 2025, 14:30",
    status: "COMPLETED",
    paymentMethod: "Direct Transfer",
    items: [
      {
        name: "VIP Ticket",
        price: "Rp700.000",
        qty: 1,
        subtotal: "Rp700.000",
      },
    ],
    subtotal: "Rp700.000",
    discount: "Rp0",
    tax: "Rp0",
    total: "Rp700.000",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Transaction ID: {transactionDetails.id}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <p className="text-sm">{transactionDetails.customer}</p>
            <p className="text-sm">{transactionDetails.email}</p>
            <p className="text-sm">{transactionDetails.phone}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Transaction Information</h3>
            <p className="text-sm">Date: {transactionDetails.date}</p>
            <p className="text-sm">
              Status: <Badge>{transactionDetails.status}</Badge>
            </p>
            <p className="text-sm">Payment: {transactionDetails.paymentMethod}</p>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionDetails.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell className="text-right">{item.subtotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{transactionDetails.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>{transactionDetails.discount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{transactionDetails.tax}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{transactionDetails.total}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Download Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
