"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import PaginationSection from "@/components/PaginationSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetTransactions from "@/hooks/transaction/useGetTransactions";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export default function AllTransactionsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);

  const {
    data: transactions,
    refetch,
    isLoading,
  } = useGetTransactions({
    search: debounceSearch,
    page,
    take: 5,
  });

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  if (isLoading) return <Loading />;
  if (!transactions) return <NoData />;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-6">My Transactions</h1>

        <div className="flex justify-between mb-6">
          <div className="w-full max-w-md">
            <Input
              placeholder="Search by event name or user email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Voucher</TableHead>
                <TableHead>Used Points</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!transactions &&
                transactions.data.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(transaction.id)}
                        onCheckedChange={() => toggleRow(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>{transaction.event.name}</TableCell>
                    <TableCell>{transaction.userEmail ?? "-"}</TableCell>
                    <TableCell>
                      {transaction.payments && transaction.payments.length > 0
                        ? transaction.payments[0].paymentMethod
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {transaction.detailTransaction &&
                      transaction.detailTransaction.length > 0
                        ? transaction.detailTransaction[0].quantity
                        : 0}
                    </TableCell>
                    <TableCell>
                      Rp {transaction.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.voucher?.code ?? "-"}</TableCell>
                    <TableCell>
                      {transaction.points?.pointsValue
                        ? `Rp ${transaction.points.pointsValue.toLocaleString()}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      Rp{" "}
                      {(
                        transaction.totalPrice -
                        (transaction.points?.pointsValue ?? 0) -
                        (transaction.voucher_amount ?? 0)
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {transactions?.meta && (
          <PaginationSection
            page={page}
            take={transactions.meta.take}
            total={transactions.meta.total}
            onChangePage={(newPage) => setPage(newPage)}
          />
        )}
      </div>
    </div>
  );
}
