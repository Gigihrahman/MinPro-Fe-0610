"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, MoreHorizontal } from "lucide-react"

// Mock data based on the screenshot
const vouchers = [
  {
    id: 1,
    code: "AJ6757VX",
    event: "Hwang In Youp In Love Fan Meeting Tour",
    status: "ACTIVE",
    value: "Rp10.000",
    limit: 100,
    used: 3,
  },
  // You can add more mock vouchers here if needed
]

export default function VouchersTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.length === vouchers.length ? [] : vouchers.map((voucher) => voucher.id)))
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === vouchers.length && vouchers.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Limit</TableHead>
            <TableHead>Used</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(voucher.id)}
                  onCheckedChange={() => toggleRow(voucher.id)}
                  aria-label={`Select voucher ${voucher.code}`}
                />
              </TableCell>
              <TableCell className="font-medium">{voucher.code}</TableCell>
              <TableCell>{voucher.event}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 px-2 text-left font-normal">
                      {voucher.status} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>ACTIVE</DropdownMenuItem>
                    <DropdownMenuItem>INACTIVE</DropdownMenuItem>
                    <DropdownMenuItem>EXPIRED</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{voucher.value}</TableCell>
              <TableCell>{voucher.limit}</TableCell>
              <TableCell>{voucher.used}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
