"use client";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

// UI Components
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import PaginationSection from "@/components/PaginationSection";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, AlertCircle, CheckCircle, XCircle } from "lucide-react";

// Data Hooks
import useGetTransactions from "@/hooks/transaction/useGetTransactions";
import useAcceptPayment from "@/hooks/transaction/useAcceptPayment";
import useDeclinePayment from "@/hooks/transaction/useDeclinePayment";
import { Transaction } from "@/types/transaction";

// Import the actual Transaction type if needed
// import { Transaction as ImportedTransaction } from "@/types/transaction";

// Type definitions

export default function ManualPaymentTablePage(): JSX.Element {
  // Changed from string[] to number[] to match Transaction.id type
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  // Fetch transactions data
  const {
    data: transactions,
    refetch,
    isLoading,
  } = useGetTransactions({
    search: debounceSearch,
    page,
    take: 5,
  });

  // Accept/Decline mutations
  const acceptMutation = useAcceptPayment();
  const declineMutation = useDeclinePayment();

  // Handle payment acceptance
  // Changed parameter type from string to number
  const handleAcceptPayment = (transactionId: number): void => {
    acceptMutation.mutate(
      { transactionId },
      {
        onSuccess: () => {
          refetch();
          setDetailsOpen(false);
        },
      }
    );
  };

  // Handle payment rejection
  // Changed parameter type from string to number
  const handleDeclinePayment = (transactionId: number): void => {
    declineMutation.mutate(
      { transactionId },
      {
        onSuccess: () => {
          refetch();
          setDetailsOpen(false);
        },
      }
    );
  };

  // Toggle row selection
  // Changed parameter type from string to number
  const toggleRow = (id: number): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Open transaction details modal
  const openDetails = (transaction: Transaction): void => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status: string): string => {
    const statusColors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      DONE: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      CANCELED: "bg-gray-100 text-gray-800",
    };

    return statusColors[status] || "bg-blue-100 text-blue-800";
  };

  // Loading state
  if (isLoading) return <Loading />;

  // No data state
  if (!transactions) return <NoData />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold mb-2">Manual Payment Verification</h1>
        <p className="text-gray-500 mb-6">
          Verify and manage manual payment transactions.
        </p>

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

        {/* Payment Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {transactions?.meta?.total || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {transactions?.data.filter((t) => t.status === "PENDING")
                  .length || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {transactions?.data.filter((t) => t.status === "DONE").length ||
                  0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {transactions?.data.filter((t) => t.status === "REJECTED")
                  .length || 0}
              </p>
            </CardContent>
          </Card>
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
                <TableHead>Final Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!transactions &&
                transactions.data.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/5">
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
                    <TableCell>
                      Rp{" "}
                      {(
                        transaction.totalPrice -
                        (transaction.points?.pointsValue ?? 0) -
                        (transaction.voucher_amount ?? 0)
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetails(transaction)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </Button>
                    </TableCell>
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center">
                Transaction Details
                <Badge
                  className={`ml-2 ${getStatusBadge(
                    selectedTransaction.status
                  )}`}
                >
                  {selectedTransaction.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="payment">Payment Proof</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Event Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Event Name</p>
                        <p className="text-gray-600">
                          {selectedTransaction.event.name}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(
                            selectedTransaction.event.startEvent
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">
                          {selectedTransaction.event.locationDetail || "Online"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">
                          {selectedTransaction.userEmail}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Transaction Date</p>
                        <p className="text-gray-600">
                          {new Date(
                            selectedTransaction.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Transaction ID</p>
                        <p className="text-gray-600">
                          {selectedTransaction.id}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Payment Method</p>
                          <p className="text-gray-600">
                            {selectedTransaction.payments &&
                            selectedTransaction.payments.length > 0
                              ? selectedTransaction.payments[0].paymentMethod
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Payment Status</p>
                          <Badge
                            className={getStatusBadge(
                              selectedTransaction.status
                            )}
                          >
                            {selectedTransaction.status}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p>Total Price</p>
                          <p className="font-medium">
                            Rp {selectedTransaction.totalPrice.toLocaleString()}
                          </p>
                        </div>

                        {selectedTransaction.voucher && (
                          <div className="flex justify-between">
                            <p>Voucher ({selectedTransaction.voucher.code})</p>
                            <p className="font-medium text-green-600">
                              - Rp{" "}
                              {(
                                selectedTransaction.voucher_amount || 0
                              ).toLocaleString()}
                            </p>
                          </div>
                        )}

                        {selectedTransaction.points &&
                          selectedTransaction.points.pointsValue > 0 && (
                            <div className="flex justify-between">
                              <p>Points Used</p>
                              <p className="font-medium text-green-600">
                                - Rp{" "}
                                {selectedTransaction.points.pointsValue.toLocaleString()}
                              </p>
                            </div>
                          )}

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                          <p>Final Price</p>
                          <p>
                            Rp{" "}
                            {(
                              selectedTransaction.totalPrice -
                              (selectedTransaction.points?.pointsValue ?? 0) -
                              (selectedTransaction.voucher_amount ?? 0)
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Proof</CardTitle>
                    <CardDescription>
                      Verify the payment proof submitted by the customer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    {selectedTransaction.payments &&
                    selectedTransaction.payments.length > 0 &&
                    selectedTransaction.payments[0].paymentProofUrl ? (
                      <div className="w-full max-w-lg">
                        <img
                          src={selectedTransaction.payments[0].paymentProofUrl}
                          alt="Payment Proof"
                          className="w-full rounded-md border shadow-sm"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Uploaded on{" "}
                          {new Date(
                            selectedTransaction.payments[0].createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <Alert className="bg-yellow-50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No payment proof has been uploaded yet.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ticket Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedTransaction.detailTransaction &&
                    selectedTransaction.detailTransaction.length > 0 ? (
                      <div className="space-y-4">
                        {selectedTransaction.detailTransaction.map(
                          (detail, index) => (
                            <Card key={index} className="bg-gray-50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-md">
                                  {detail.seats.name || "Regular Ticket"}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="font-medium">Quantity</p>
                                    <p>{detail.quantity} tickets</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      Price per Ticket
                                    </p>
                                    <p>
                                      Rp{" "}
                                      {detail.seats.price.toLocaleString() ||
                                        "0"}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>
                    ) : (
                      <Alert className="bg-yellow-50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No ticket details available.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex items-center justify-between space-x-2 mt-6">
              {selectedTransaction.status === "PENDING" ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeclinePayment(selectedTransaction.id)}
                    disabled={declineMutation.isPending}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline Payment
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleAcceptPayment(selectedTransaction.id)}
                    disabled={acceptMutation.isPending}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Payment
                  </Button>
                </>
              ) : (
                <div className="w-full">
                  <Alert
                    className={
                      selectedTransaction.status === "DONE"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }
                  >
                    {selectedTransaction.status === "DONE" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      {selectedTransaction.status === "DONE"
                        ? "This payment has been accepted."
                        : "This payment has been declined."}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
