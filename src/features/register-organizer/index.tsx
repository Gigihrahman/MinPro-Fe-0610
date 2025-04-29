"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Bank = "BRI" | "BCA" | "BNI"

interface OrganizerFormData {
  name: string
  phoneNumber: string
  npwp: string
  bank: Bank | ""
}

export default function RegisterOrganizerPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<OrganizerFormData>({
    name: "",
    phoneNumber: "",
    npwp: "",
    bank: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBankChange = (value: Bank) => {
    setFormData((prev) => ({
      ...prev,
      bank: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Organizer registration data:", formData)
    // Navigate back to profile page after successful registration
    router.push("/profile")
  }

  return (
    <div className="container max-w-2xl py-10">
      <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register as Organizer</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter organizer name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="npwp">NPWP</Label>
              <Input
                id="npwp"
                name="npwp"
                value={formData.npwp}
                onChange={handleInputChange}
                required
                placeholder="Enter NPWP number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Bank</Label>
              <Select value={formData.bank} onValueChange={(value) => handleBankChange(value as Bank)} required>
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BNI">BNI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Submit Registration</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
