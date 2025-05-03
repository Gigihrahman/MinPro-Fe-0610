"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface VerifyPaymentModalProps {
  paymentId: number
  isOpen: boolean
  onClose: () => void
}

export default function VerifyPaymentModal({ paymentId, isOpen, onClose }: VerifyPaymentModalProps) {
  const [status, setStatus] = useState<string>("approved")
  const [notes, setNotes] = useState<string>("")

  // In a real app, you would fetch payment details based on the ID
  const paymentDetails = {
    id: "PAY-12345",
    event: "WHISKY LIVE JAKARTA 2025",
    customer: "Joko Widodo",
    email: "joko@mail.com",
    amount: "Rp700.000",
    date: "27 Apr 2025, 14:30",
  }

  const handleSubmit = () => {
    // In a real app, you would submit the verification status to your API
    console.log({
      paymentId,
      status,
      notes,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Payment</DialogTitle>
          <DialogDescription>
            Payment ID: {paymentDetails.id} for {paymentDetails.event}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Customer:</div>
            <div>{paymentDetails.customer}</div>

            <div className="text-muted-foreground">Email:</div>
            <div>{paymentDetails.email}</div>

            <div className="text-muted-foreground">Amount:</div>
            <div className="font-medium">{paymentDetails.amount}</div>

            <div className="text-muted-foreground">Date:</div>
            <div>{paymentDetails.date}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Verification Status</Label>
            <RadioGroup id="status" value={status} onValueChange={setStatus} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="approved" />
                <Label htmlFor="approved">Approved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this payment verification"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{status === "approved" ? "Approve Payment" : "Reject Payment"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
