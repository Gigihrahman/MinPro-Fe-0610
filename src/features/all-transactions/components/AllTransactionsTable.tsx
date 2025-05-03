import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Filter } from "lucide-react"
import TransactionsTable from "./TransactionsTable"

export default function AllTransactionsTable() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        <div className="flex justify-between mb-6">
          <div className="w-full max-w-md">
            <Input placeholder="Search" className="w-full" />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Event</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Payment Method</DropdownMenuItem>
                <DropdownMenuItem>Qty</DropdownMenuItem>
                <DropdownMenuItem>Total Ticket Price</DropdownMenuItem>
                <DropdownMenuItem>Voucher Used</DropdownMenuItem>
                <DropdownMenuItem>Point Used</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TransactionsTable />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">0 of 12 row(s) selected.</div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="px-3 bg-primary text-primary-foreground hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              2
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
