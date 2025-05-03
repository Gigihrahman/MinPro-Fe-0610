"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"

// Mock data based on the screenshot
const manualPayments = [
  {
    id: 1,
    event: "WHISKY LIVE JAKARTA 2025",
    email: "joko@mail.com",
    paymentMethod: "Direct Transfer",
    qty: 1,
    totalPrice: "Rp700.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
]

export default function ManualPaymentTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) =>
      prev.length === manualPayments.length ? [] : manualPayments.map((payment) => payment.id),
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === manualPayments.length && manualPayments.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Event <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Total Ticket Price</TableHead>
            <TableHead>Voucher Used</TableHead>
            <TableHead>Point Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manualPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(payment.id)}
                  onCheckedChange={() => toggleRow(payment.id)}
                  aria-label={`Select payment for ${payment.event}`}
                />
              </TableCell>
              <TableCell className="font-medium">{payment.event}</TableCell>
              <TableCell>{payment.email}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{payment.qty}</TableCell>
              <TableCell>{payment.totalPrice}</TableCell>
              <TableCell>{payment.voucherUsed}</TableCell>
              <TableCell>{payment.pointUsed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
