"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"

// Mock data based on the screenshot
const transactions = [
  {
    id: 1,
    event: "WHISKY LIVE JAKARTA 2025",
    email: "budi@mail.com",
    paymentMethod: "Direct Transfer",
    qty: 1,
    totalPrice: "Rp700.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
  {
    id: 2,
    event: "Hwang In Youp In Love Fan Meeting Tour",
    email: "budi@mail.com",
    paymentMethod: "Payment Gateway",
    qty: 2,
    totalPrice: "Rp4.000.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
  {
    id: 3,
    event: "Mens Rea - Palembang",
    email: "joko@mail.com",
    paymentMethod: "Payment Gateway",
    qty: 1,
    totalPrice: "Rp400.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
  {
    id: 4,
    event: "Tomo Land : Art & Illustration Festival",
    email: "joko@mail.com",
    paymentMethod: "Payment Gateway",
    qty: 1,
    totalPrice: "Rp250.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
  {
    id: 5,
    event: "Mens Rea - Palembang",
    email: "budi@mail.com",
    paymentMethod: "Direct Transfer",
    qty: 1,
    totalPrice: "Rp1.000.000",
    voucherUsed: 0,
    pointUsed: 0,
  },
]

export default function TransactionsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) =>
      prev.length === transactions.length ? [] : transactions.map((transaction) => transaction.id),
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === transactions.length && transactions.length > 0}
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(transaction.id)}
                  onCheckedChange={() => toggleRow(transaction.id)}
                  aria-label={`Select transaction for ${transaction.event}`}
                />
              </TableCell>
              <TableCell className="font-medium">{transaction.event}</TableCell>
              <TableCell>{transaction.email}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>{transaction.qty}</TableCell>
              <TableCell>{transaction.totalPrice}</TableCell>
              <TableCell>{transaction.voucherUsed}</TableCell>
              <TableCell>{transaction.pointUsed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
