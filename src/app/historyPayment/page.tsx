"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertCircle,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  RefreshCcw,
  Timer,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Tipe data status transaksi
type TransactionStatus =
  | "CREATED"
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

// Interface untuk data transaksi
interface Transaction {
  id: string;
  date: string;
  eventName: string;
  totalAmount: number;
  status: TransactionStatus;
  paymentMethod?: string;
  ticketCount: number;
}

// Komponen Status Badge
const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  switch (status) {
    case "CREATED":
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
        >
          <FileText className="h-3 w-3" /> Dibuat
        </Badge>
      );
    case "WAITING_FOR_PAYMENT":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
        >
          <Clock className="h-3 w-3" /> Menunggu Pembayaran
        </Badge>
      );
    case "WAITING_FOR_ADMIN_CONFIRMATION":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
        >
          <CalendarClock className="h-3 w-3" /> Menunggu Konfirmasi Admin
        </Badge>
      );
    case "DONE":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
        >
          <CheckCircle2 className="h-3 w-3" /> Selesai
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
        >
          <X className="h-3 w-3" /> Ditolak
        </Badge>
      );
    case "EXPIRED":
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
        >
          <Timer className="h-3 w-3" /> Kedaluwarsa
        </Badge>
      );
    case "CANCELED":
      return (
        <Badge
          variant="outline"
          className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1"
        >
          <AlertCircle className="h-3 w-3" /> Dibatalkan
        </Badge>
      );
    default:
      return null;
  }
};

// Komponen Action Button berdasarkan status
const ActionButton: React.FC<{
  status: TransactionStatus;
  transactionId: string;
}> = ({ status, transactionId }) => {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/transactions/${transactionId}`);
  };

  const handlePayment = () => {
    router.push(`/transactions/${transactionId}/payment`);
  };

  const handleUploadProof = () => {
    router.push(`/transactions/${transactionId}/upload-proof`);
  };

  const handleCancel = () => {
    // Logic for canceling transaction
    alert(`Cancel transaction ${transactionId}`);
  };

  switch (status) {
    case "CREATED":
    case "WAITING_FOR_PAYMENT":
      return (
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={handlePayment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Bayar Sekarang
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Batalkan
          </Button>
        </div>
      );
    case "WAITING_FOR_ADMIN_CONFIRMATION":
      return (
        <Button
          size="sm"
          onClick={handleViewDetail}
          className="text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100"
        >
          Lihat Detail
        </Button>
      );
    case "DONE":
      return (
        <Button
          size="sm"
          onClick={handleViewDetail}
          className="text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
        >
          Lihat E-Ticket
        </Button>
      );
    case "REJECTED":
      return (
        <Button
          size="sm"
          onClick={handleViewDetail}
          variant="outline"
          className="text-red-700 border-red-200 bg-red-50 hover:bg-red-100"
        >
          Lihat Detail
        </Button>
      );
    case "EXPIRED":
    case "CANCELED":
      return (
        <Button
          size="sm"
          variant="outline"
          className="bg-gray-50 hover:bg-gray-100"
        >
          <RefreshCcw className="h-4 w-4 mr-1" /> Buat Ulang
        </Button>
      );
    default:
      return (
        <Button size="sm" onClick={handleViewDetail} variant="outline">
          Lihat Detail
        </Button>
      );
  }
};

// Data contoh untuk riwayat transaksi
const mockTransactions: Transaction[] = [
  {
    id: "TRX-001",
    date: "2025-05-01T14:30:00",
    eventName: "Konser Musik Tahunan",
    totalAmount: 750000,
    status: "CREATED",
    ticketCount: 2,
  },
  {
    id: "TRX-002",
    date: "2025-04-28T10:15:00",
    eventName: "Festival Kuliner Jakarta",
    totalAmount: 250000,
    status: "WAITING_FOR_PAYMENT",
    ticketCount: 1,
  },
  {
    id: "TRX-003",
    date: "2025-04-25T16:45:00",
    eventName: "Seminar Teknologi",
    totalAmount: 500000,
    status: "WAITING_FOR_ADMIN_CONFIRMATION",
    paymentMethod: "Transfer Bank",
    ticketCount: 2,
  },
  {
    id: "TRX-004",
    date: "2025-04-20T09:00:00",
    eventName: "Workshop Digital Marketing",
    totalAmount: 350000,
    status: "DONE",
    paymentMethod: "QRIS",
    ticketCount: 1,
  },
  {
    id: "TRX-005",
    date: "2025-04-15T13:20:00",
    eventName: "Pameran Seni Rupa",
    totalAmount: 120000,
    status: "REJECTED",
    paymentMethod: "Transfer Bank",
    ticketCount: 1,
  },
  {
    id: "TRX-006",
    date: "2025-04-10T11:30:00",
    eventName: "Webinar Keuangan",
    totalAmount: 75000,
    status: "EXPIRED",
    ticketCount: 1,
  },
  {
    id: "TRX-007",
    date: "2025-04-05T15:10:00",
    eventName: "Konser Musik Rock",
    totalAmount: 450000,
    status: "CANCELED",
    ticketCount: 2,
  },
];

// Komponen utama daftar riwayat transaksi
const TransactionHistoryList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  // Filter transaksi berdasarkan status
  const filteredTransactions =
    statusFilter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.status === statusFilter
        );

  // Format tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format waktu
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </CardTitle>
          <CardDescription className="text-gray-600">
            Daftar semua transaksi pembelian tiket Anda
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="w-full sm:w-64">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status Transaksi</SelectLabel>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="CREATED">Dibuat</SelectItem>
                    <SelectItem value="WAITING_FOR_PAYMENT">
                      Menunggu Pembayaran
                    </SelectItem>
                    <SelectItem value="WAITING_FOR_ADMIN_CONFIRMATION">
                      Menunggu Konfirmasi
                    </SelectItem>
                    <SelectItem value="DONE">Selesai</SelectItem>
                    <SelectItem value="REJECTED">Ditolak</SelectItem>
                    <SelectItem value="EXPIRED">Kedaluwarsa</SelectItem>
                    <SelectItem value="CANCELED">Dibatalkan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-gray-500">
              Menampilkan {filteredTransactions.length} dari{" "}
              {transactions.length} transaksi
            </p>
          </div>

          {/* Mobile View Transaction List */}
          <div className="block md:hidden space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="overflow-hidden border-gray-200"
              >
                <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      ID Transaksi: {transaction.id}
                    </p>
                    <CardTitle className="text-base font-medium">
                      {transaction.eventName}
                    </CardTitle>
                  </div>
                  <StatusBadge status={transaction.status} />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tanggal</span>
                      <span className="text-sm">
                        {formatDate(transaction.date)}{" "}
                        {formatTime(transaction.date)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Jumlah Tiket
                      </span>
                      <span className="text-sm">
                        {transaction.ticketCount} tiket
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="text-sm font-semibold">
                        Rp {transaction.totalAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    {transaction.paymentMethod && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Metode Pembayaran
                        </span>
                        <span className="text-sm">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 flex justify-end">
                  <ActionButton
                    status={transaction.status}
                    transactionId={transaction.id}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Desktop View Transaction Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Tanggal & Waktu</TableHead>
                  <TableHead>Nama Event</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      Tidak ada transaksi yang ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(transaction.date)}</span>
                          <span className="text-xs text-gray-500">
                            {formatTime(transaction.date)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.eventName}</TableCell>
                      <TableCell>{transaction.ticketCount} tiket</TableCell>
                      <TableCell>
                        Rp {transaction.totalAmount.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionButton
                          status={transaction.status}
                          transactionId={transaction.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="w-full">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionHistoryList;
