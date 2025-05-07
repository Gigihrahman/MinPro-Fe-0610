"use client";

import PaginationSection from "@/components/PaginationSection";
import TransactionBadge from "@/components/TransactionBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetTransactionUser from "@/hooks/transaction/useGetTransactionUser";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TransactionHistoryUserList = () => {
  const [page, setPage] = useState(1);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const [statusFilter, setStatusFilter] = useState<string>("");
  console.log("statusFilter", statusFilter);
  const { data: transactions } = useGetTransactionUser({
    page,
    take: 2,
    status: statusFilter,
  });
  console.log(transactions)
  console.log("transactions", transactions);
  
  return (
    <div>
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
                  onValueChange={(value) => {
                    if (value === "ALL") {
                      setStatusFilter("");
                    } else {
                      setStatusFilter(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status Transaksi</SelectLabel>
                      <SelectItem value="ALL">Semua Status</SelectItem>

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
            </div>

            {transactions && transactions.data.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>Tidak ada transaksi untuk ditampilkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {!!transactions &&
                  transactions.data.map((transaction) => (
                    <Link
                      key={transaction.uuid}
                      href={`/transaction/${transaction.uuid}`}
                    >
                      <Card className="overflow-hidden border-gray-200 shadow-md cursor-pointer">
                        <CardHeader className="p-4 bg-gray-50 flex flex-row items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-500">
                              ID Transaksi: {transaction.uuid}
                            </p>
                            <CardTitle className="text-base font-medium">
                              {transaction.event.name}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          {transaction.event.thumbnail && (
                            <div className="mb-4">
                              <Image
                                src={transaction.event.thumbnail}
                                width={400}
                                height={200}
                                alt={transaction.event.name}
                                className="w-full h-48 object-cover rounded-md"
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Tanggal
                              </span>
                              <span className="text-sm">
                                {formatDate(transaction.event.startEvent)}{" "}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Voucher Amount
                              </span>
                              <span className="text-sm">
                                Rp{" "}
                                {transaction.voucher_amount
                                  ? transaction.voucher_amount.toLocaleString(
                                      "id-ID"
                                    )
                                  : "0"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Coupon Amount
                              </span>
                              <span className="text-sm">
                                Rp{" "}
                                {transaction.coupoun_amount
                                  ? transaction.coupoun_amount.toLocaleString(
                                      "id-ID"
                                    )
                                  : "0"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Used Points
                              </span>
                              <span className="text-sm">
                                {transaction.usedPoint
                                  ? transaction.usedPoint
                                  : "0"}{" "}
                                Poin
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Total
                              </span>
                              <span className="text-sm font-semibold">
                                Rp{" "}
                                {transaction.totalPrice -
                                  (transaction.coupoun_amount || 0) -
                                  (transaction.voucher_amount || 0) -
                                  (transaction.usedPoint || 0) <
                                0
                                  ? "0"
                                  : (
                                      transaction.totalPrice -
                                      (transaction.coupoun_amount || 0) -
                                      (transaction.voucher_amount || 0) -
                                      (transaction.usedPoint || 0)
                                    ).toLocaleString("id-ID")}
                              </span>
                            </div>
                          </div>
                        </CardContent>

                        {/* Move TransactionBadge below the transaction details */}
                        <CardFooter className="p-4 bg-gray-50 flex justify-end">
                          <TransactionBadge
                            status={transaction.status as any}
                          />
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
              </div>
            )}
          </CardContent>

          {/* Pagination */}
          {transactions && (
            <PaginationSection
              page={transactions?.meta.page}
              total={transactions?.meta.total}
              take={transactions?.meta.take}
              onChangePage={onChangePage}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistoryUserList;