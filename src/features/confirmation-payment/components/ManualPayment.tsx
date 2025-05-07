"use client";

import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  Download,
  EyeOff,
  Filter,
  Image,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

// Components
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import PaginationSection from "@/components/PaginationSection";
import useGetWaitingForAdminConfirmationTransactions from "@/hooks/transaction/useGetWaitingForAdminConfirmationTransactions";
import useUpdateTransactionStatus from "@/hooks/transaction/useUpdateTransactionStatus";

// UI Components
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmationPaymentsTable() {
  // State
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const [viewMode, setViewMode] = useState("table"); // table or card
  const [pageSize, setPageSize] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "DONE" | "REJECTED" | null;
    transactionId: string | null;
  }>({
    type: null,
    transactionId: null,
  });
  const [openPaymentProof, setOpenPaymentProof] = useState(false);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Fetch data
  const {
    data: transactions,
    refetch,
    isLoading,
  } = useGetWaitingForAdminConfirmationTransactions({
    search: debounceSearch,
    page,
    take: pageSize,
  });

  // Update transaction mutation
  const { mutate: updateTransaction, isPending: isUpdating } =
    useUpdateTransactionStatus();

  // Handlers
  const handleApprove = (transactionId: string) => {
    setConfirmAction({ type: "DONE", transactionId });
  };

  const handleReject = (transactionId: string) => {
    setConfirmAction({ type: "REJECTED", transactionId });
  };

  const handleConfirmAction = () => {
    if (!confirmAction.type || !confirmAction.transactionId) return;

    updateTransaction(
      {
        transactionId: confirmAction.transactionId,
        data: { status: confirmAction.type },
      },
      {
        onSuccess: () => {
          setConfirmAction({ type: null, transactionId: null });
          refetch();
        },
      }
    );
  };
  

  const viewPaymentProof = (transaction: any) => {
    setSelectedTransaction(transaction);
    setOpenPaymentProof(true);
  };

  // For responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Switch to card view on mobile automatically
      if (window.innerWidth < 768) {
        setViewMode("card");
      }
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <Loading />;
  if (!transactions) return <NoData />;

  return (
    <>
      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <Card className="bg-white border border-purple-100 shadow-md rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Transactions Awaiting
              Confirmation
            </h1>
          </div>

          <CardContent className="p-4 md:p-6">
            {/* Actions Row */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Search by event name or user email"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <Filter className="h-4 w-4 mr-1" /> Filters
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Show/hide filters</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() =>
                          setViewMode(viewMode === "table" ? "card" : "table")
                        }
                      >
                        <SlidersHorizontal className="h-4 w-4 mr-1" />{" "}
                        {viewMode === "table" ? "Card View" : "Table View"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Switch between table and card view
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Filters Row - Conditionally Rendered */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 flex flex-wrap gap-4">
                    <div className="w-full sm:w-auto">
                      <label className="block text-sm font-medium text-purple-700 mb-1">
                        Items per page
                      </label>
                      <Select
                        value={pageSize.toString()}
                        onValueChange={(val) => {
                          setPageSize(Number(val));
                          setPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full sm:w-[140px] border-purple-200">
                          <SelectValue placeholder="Page size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 items</SelectItem>
                          <SelectItem value="10">10 items</SelectItem>
                          <SelectItem value="20">20 items</SelectItem>
                          <SelectItem value="50">50 items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full sm:w-auto self-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-700 border-purple-200 hover:bg-purple-50"
                        onClick={() => {
                          setPageSize(5);
                          setSearch("");
                          setPage(1);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary Stats */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-4">
              <p className="text-lg text-yellow-600 font-medium">
                Waiting For Confirmation
              </p>
              <p className="text-2xl font-bold text-yellow-800">
                {transactions.meta.total} transactions
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                These transactions require your review and confirmation. Please
                approve or reject them.
              </p>
            </div>

            {/* No Results State */}
            {transactions.data.length === 0 ? (
              <div className="text-center py-16 bg-purple-50 rounded-lg">
                <NoData />
                <p className="mt-2 text-purple-600">
                  No transactions awaiting confirmation
                </p>
                <Button
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Table View */}
                {viewMode === "table" && (
                  <div className="overflow-x-auto rounded-md border border-purple-100">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-purple-50 border-b border-purple-100">
                          <TableHead className="text-purple-700">
                            Event Name
                          </TableHead>
                          <TableHead className="text-purple-700">
                            User Email
                          </TableHead>
                          <TableHead className="text-purple-700">
                            Payment Method
                          </TableHead>
                          <TableHead className="text-purple-700">
                            Total Price
                          </TableHead>
                          <TableHead className="text-purple-700">
                            Final Price
                          </TableHead>
                          <TableHead className="text-purple-700 text-center">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.data.map((transaction) => (
                          <TableRow
                            key={transaction.id}
                            className="hover:bg-purple-50 border-b border-purple-100"
                          >
                            <TableCell className="font-medium">
                              {transaction.event.name}
                            </TableCell>
                            <TableCell>
                              {transaction.userEmail ?? "-"}
                            </TableCell>
                            <TableCell>
                              {transaction.payments &&
                              transaction.payments.length > 0
                                ? transaction.payments[0].paymentMethod
                                : "-"}
                            </TableCell>
                            <TableCell>
                              Rp {transaction.totalPrice.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-medium">
                              Rp{" "}
                              {(
                                transaction.totalPrice -
                                (transaction.points?.pointsValue ?? 0) -
                                (transaction.voucher_amount ?? 0)
                              ).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-purple-200 bg-white text-purple-700 hover:bg-purple-50"
                                        onClick={() =>
                                          viewPaymentProof(transaction)
                                        }
                                        disabled={
                                          !transaction.payments?.[0]
                                            ?.paymentProofUrl
                                        }
                                      >
                                        <Image className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      View Payment Proof
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                        onClick={() =>
                                          handleApprove(transaction.uuid)
                                        }
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Approve Transaction
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                                        onClick={() =>
                                          handleReject(transaction.uuid)
                                        }
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Reject Transaction
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Card View */}
                {viewMode === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions.data.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="bg-white rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="bg-purple-50 p-3 border-b border-purple-100">
                          <h3 className="font-medium text-purple-900 truncate max-w-[300px]">
                            {transaction.event.name}
                          </h3>
                          <p className="text-sm text-purple-600">
                            {transaction.userEmail ?? "No email"}
                          </p>
                        </div>

                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-gray-500">Payment Method:</div>
                            <div>
                              {transaction.payments &&
                              transaction.payments.length > 0
                                ? transaction.payments[0].paymentMethod
                                : "-"}
                            </div>

                            <div className="text-gray-500">Quantity:</div>
                            <div>
                              {transaction.detailTransaction &&
                              transaction.detailTransaction.length > 0
                                ? transaction.detailTransaction[0].quantity
                                : 0}
                            </div>

                            <div className="text-gray-500">Total Price:</div>
                            <div>
                              Rp {transaction.totalPrice.toLocaleString()}
                            </div>

                            {(transaction.voucher?.code ||
                              transaction.points?.pointsValue) && (
                              <>
                                <div className="text-gray-500">Discounts:</div>
                                <div>
                                  {transaction.voucher?.code && (
                                    <Badge
                                      variant="outline"
                                      className="bg-purple-50 text-purple-700 border-purple-200 mr-1"
                                    >
                                      {transaction.voucher.code}
                                    </Badge>
                                  )}
                                  {transaction.points?.pointsValue && (
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                      Points: Rp{" "}
                                      {transaction.points.pointsValue.toLocaleString()}
                                    </Badge>
                                  )}
                                </div>
                              </>
                            )}

                            <div className="text-gray-500">Final Price:</div>
                            <div className="font-bold text-purple-700">
                              Rp{" "}
                              {(
                                transaction.totalPrice -
                                (transaction.points?.pointsValue ?? 0) -
                                (transaction.voucher_amount ?? 0)
                              ).toLocaleString()}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-200 bg-white text-purple-700 hover:bg-purple-50"
                              onClick={() => viewPaymentProof(transaction)}
                              disabled={
                                !transaction.payments?.[0]?.paymentProofUrl
                              }
                            >
                              <Image className="h-4 w-4 mr-1" /> Payment Proof
                            </Button>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                onClick={() => handleApprove(transaction.uuid)}
                              >
                                <Check className="h-4 w-4 mr-1" /> Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                                onClick={() => handleReject(transaction.uuid)}
                              >
                                <X className="h-4 w-4 mr-1" /> Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {transactions?.meta && (
              <div className="mt-6">
                <PaginationSection
                  page={page}
                  take={transactions.meta.take}
                  total={transactions.meta.total}
                  onChangePage={(newPage) => setPage(newPage)}
                />
                <p className="text-sm text-gray-500 text-center mt-2">
                  Showing{" "}
                  {Math.min(
                    (page - 1) * transactions.meta.take + 1,
                    transactions.meta.total
                  )}{" "}
                  to{" "}
                  {Math.min(
                    page * transactions.meta.take,
                    transactions.meta.total
                  )}{" "}
                  of {transactions.meta.total} transactions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Proof Dialog */}
      <Dialog open={openPaymentProof} onOpenChange={setOpenPaymentProof}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              Payment proof submitted by {selectedTransaction?.userEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-2">
            {selectedTransaction?.payments?.[0]?.paymentProofUrl ? (
              <img
                src={selectedTransaction.payments[0].paymentProofUrl}
                alt="Payment Proof"
                className="max-w-full max-h-[500px] rounded-md object-contain"
              />
            ) : (
              <div className="text-center p-8 bg-gray-100 rounded-md w-full">
                <p className="text-gray-500">No payment proof available</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setOpenPaymentProof(false)}
            >
              Close
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                onClick={() => {
                  setOpenPaymentProof(false);
                  if (selectedTransaction) {
                    handleApprove(selectedTransaction.uuid);
                  }
                }}
              >
                <Check className="h-4 w-4 mr-1" /> Accept
              </Button>
              <Button
                variant="outline"
                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                onClick={() => {
                  setOpenPaymentProof(false);
                  if (selectedTransaction) {
                    handleReject(selectedTransaction.uuid);
                  }
                }}
              >
                <X className="h-4 w-4 mr-1" /> Decline
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Dialog */}
      <AlertDialog
        open={!!confirmAction.type}
        onOpenChange={(isOpen: any) => {
          if (!isOpen) setConfirmAction({ type: null, transactionId: null });
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction.type === "DONE"
                ? "Approve Transaction"
                : "Reject Transaction"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction.type === "DONE"
                ? "Are you sure you want to approve this transaction? This will confirm the payment and generate tickets for the user."
                : "Are you sure you want to reject this transaction? This will release the reserved seats back to inventory."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              disabled={isUpdating}
              className={
                confirmAction.type === "DONE"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {isUpdating
                ? "Processing..."
                : confirmAction.type === "DONE"
                ? "Approve"
                : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
