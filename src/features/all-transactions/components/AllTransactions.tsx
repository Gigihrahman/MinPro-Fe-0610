"use client";

import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import {
  Calendar,
  Download,
  EyeOff,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  ClockIcon,
} from "lucide-react";

// Components
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import PaginationSection from "@/components/PaginationSection";

// UI Components
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Hooks
import useGetTransactions from "@/hooks/transaction/useGetTransactions";
import useAcceptPayment from "@/hooks/transaction/useAcceptPayment";
import useDeclinePayment from "@/hooks/transaction/useDeclinePayment";
import { Transaction } from "@/types/transaction";

export default function AllTransactions() {
  // State
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const [visibleColumns, setVisibleColumns] = useState({
    event: true,
    email: true,
    paymentMethod: true,
    quantity: true,
    totalPrice: true,
    finalPrice: true,
    status: true,
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [pageSize, setPageSize] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  // Fetch data
  const {
    data: transactions,
    refetch,
    isLoading,
  } = useGetTransactions({
    search: debounceSearch,
    page,
    take: pageSize,
    // status: filterStatus !== "all" ? filterStatus : undefined,
  });

  // Accept/Decline mutations
  const acceptMutation = useAcceptPayment();
  const declineMutation = useDeclinePayment();

  // Functions
  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (!transactions) return;

    if (selectedRows.length === transactions.data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(transactions.data.map((item) => item.id));
    }
  };

  const toggleColumn = (columnName: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CREATED":
        return "bg-blue-100 text-blue-800";
      case "WAITING_FOR_PAYMENT":
        return "bg-yellow-100 text-yellow-800";
      case "WAITING_FOR_ADMIN_CONFIRMATION":
        return "bg-orange-100 text-orange-800";
      case "DONE":
        return "bg-green-100 text-green-800";
      case "REJECTED":
      case "CANCELED":
        return "bg-red-100 text-red-800";
      case "EXPIRED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-purple-100 text-purple-800"; // fallback untuk status tidak dikenal
    }
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // Implement export functionality
  };

  const handleBulkDelete = () => {
    console.log("Deleting selected rows:", selectedRows);
    // Implement bulk delete
  };

  // Open transaction details modal
  const openDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };

  // Handle payment acceptance
  const handleAcceptPayment = (transactionId: number) => {
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
  const handleDeclinePayment = (transactionId: number) => {
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

  // For responsive design
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="max-w-7xl mx-auto p-3 md:p-6">
      <Card className="bg-white border border-purple-100 shadow-md rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Manual Payment Verification
          </h1>
          <p className="text-purple-100 mt-1">
            Verify and manage manual payment transactions for your events
          </p>
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
              {selectedRows.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleBulkDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete (
                        {selectedRows.length})
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Delete selected transactions
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

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

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <EyeOff className="h-4 w-4 mr-1" /> Columns
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Manage Visible Columns</DialogTitle>
                    <DialogDescription>
                      Select which columns you want to display in the
                      transactions table.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {Object.entries(visibleColumns).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`column-${key}`}
                          checked={value}
                          onCheckedChange={() =>
                            toggleColumn(key as keyof typeof visibleColumns)
                          }
                          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <label
                          htmlFor={`column-${key}`}
                          className="text-sm font-medium capitalize"
                        >
                          {key === "finalPrice"
                            ? "Final Price"
                            : key === "totalPrice"
                            ? "Total Price"
                            : key === "paymentMethod"
                            ? "Payment Method"
                            : key}
                        </label>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={handleExport}
                    >
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export transactions</TooltipContent>
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
                      Status
                    </label>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] border-purple-200">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="DONE">Paid</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                        <SelectItem value="CANCELED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                        setFilterStatus("all");
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <p className="text-xs text-purple-600">Total Transactions</p>
              <p className="text-xl font-bold text-purple-900">
                {transactions.meta.total}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <p className="text-xs text-green-600">Approved</p>
              <p className="text-xl font-bold text-green-900">
                {
                  transactions.data.filter(
                    (t) => t.status.toUpperCase() === "DONE"
                  ).length
                }
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
              <p className="text-xs text-red-600">Rejected</p>
              <p className="text-xl font-bold text-red-900">
                {
                  transactions.data.filter(
                    (t) =>
                      t.status.toUpperCase() === "REJECTED" ||
                      t.status.toUpperCase() === "CANCELED"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* No Results State */}
          {transactions.data.length === 0 ? (
            <div className="text-center py-16 bg-purple-50 rounded-lg">
              <NoData />
              <p className="mt-2 text-purple-600">
                No transactions found matching your criteria
              </p>
              <Button
                className="mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  setFilterStatus("all");
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
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={
                              transactions.data.length > 0 &&
                              selectedRows.length === transactions.data.length
                            }
                            onCheckedChange={toggleAllRows}
                            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                        </TableHead>
                        {visibleColumns.event && (
                          <TableHead className="text-purple-700">
                            Event Name
                          </TableHead>
                        )}
                        {visibleColumns.email && (
                          <TableHead className="text-purple-700">
                            User Email
                          </TableHead>
                        )}
                        {visibleColumns.paymentMethod && (
                          <TableHead className="text-purple-700">
                            Payment Method
                          </TableHead>
                        )}
                        {visibleColumns.quantity && (
                          <TableHead className="text-purple-700">
                            Quantity
                          </TableHead>
                        )}
                        {visibleColumns.totalPrice && (
                          <TableHead className="text-purple-700">
                            Total Price
                          </TableHead>
                        )}
                        {visibleColumns.finalPrice && (
                          <TableHead className="text-purple-700">
                            Final Price
                          </TableHead>
                        )}
                        {visibleColumns.status && (
                          <TableHead className="text-purple-700">
                            Status
                          </TableHead>
                        )}
                        <TableHead className="text-purple-700">
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
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(transaction.id)}
                              onCheckedChange={() => toggleRow(transaction.id)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                          </TableCell>
                          {visibleColumns.event && (
                            <TableCell className="font-medium">
                              {transaction.event.name}
                            </TableCell>
                          )}
                          {visibleColumns.email && (
                            <TableCell>
                              {transaction.userEmail ?? "-"}
                            </TableCell>
                          )}
                          {visibleColumns.paymentMethod && (
                            <TableCell>
                              {transaction.payments &&
                              transaction.payments.length > 0
                                ? transaction.payments[0].paymentMethod
                                : "-"}
                            </TableCell>
                          )}
                          {visibleColumns.quantity && (
                            <TableCell>
                              {transaction.detailTransaction &&
                              transaction.detailTransaction.length > 0
                                ? transaction.detailTransaction[0].quantity
                                : 0}
                            </TableCell>
                          )}
                          {visibleColumns.totalPrice && (
                            <TableCell>
                              Rp {transaction.totalPrice.toLocaleString()}
                            </TableCell>
                          )}
                          {visibleColumns.finalPrice && (
                            <TableCell className="font-medium">
                              Rp{" "}
                              {(
                                transaction.totalPrice -
                                (transaction.points?.pointsValue ?? 0) -
                                (transaction.voucher_amount ?? 0)
                              ).toLocaleString()}
                            </TableCell>
                          )}
                          {visibleColumns.status && (
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  transaction.status
                                )}`}
                              >
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-purple-700 border-purple-200 hover:bg-purple-50"
                                onClick={() => openDetails(transaction)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>

                              {transaction.status === "PENDING" && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-purple-700"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="border-purple-100"
                                  >
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAcceptPayment(transaction.id)
                                      }
                                      className="text-green-600 focus:text-green-600 focus:bg-green-50"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Accept Payment
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeclinePayment(transaction.id)
                                      }
                                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Decline Payment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
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
                      <div className="bg-purple-50 p-3 flex justify-between items-center border-b border-purple-100">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedRows.includes(transaction.id)}
                            onCheckedChange={() => toggleRow(transaction.id)}
                            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                          <h3 className="font-medium text-purple-900 truncate max-w-[200px]">
                            {transaction.event.name}
                          </h3>
                        </div>
                        <Badge
                          className={`${getStatusColor(transaction.status)}`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="text-gray-500">User:</div>
                          <div className="font-medium truncate">
                            {transaction.userEmail ?? "-"}
                          </div>

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

                        <div className="mt-4 flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-purple-700 border-purple-200 hover:bg-purple-50"
                            onClick={() => openDetails(transaction)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View Details
                          </Button>

                          {transaction.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() =>
                                  handleDeclinePayment(transaction.id)
                                }
                              >
                                <XCircle className="h-4 w-4 mr-1" /> Decline
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() =>
                                  handleAcceptPayment(transaction.id)
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Accept
                              </Button>
                            </>
                          )}
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center">
                Transaction Details
                <Badge
                  className={`ml-2 ${getStatusColor(
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
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-purple-800">
                        Event Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium text-purple-700">
                          Event Name
                        </p>
                        <p className="text-gray-700">
                          {selectedTransaction.event.name}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">
                          Date & Time
                        </p>
                        <p className="text-gray-700">
                          {new Date(
                            selectedTransaction.event.startEvent
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">Location</p>
                        <p className="text-gray-700">
                          {selectedTransaction.event.locationDetail || "Online"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-purple-800">
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium text-purple-700">Email</p>
                        <p className="text-gray-700">
                          {selectedTransaction.userEmail}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">
                          Transaction Date
                        </p>
                        <p className="text-gray-700">
                          {new Date(
                            selectedTransaction.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">
                          Transaction ID
                        </p>
                        <p className="text-gray-700">
                          {selectedTransaction.id}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-purple-700">
                            Payment Method
                          </p>
                          <p className="text-gray-700">
                            {selectedTransaction.payments &&
                            selectedTransaction.payments.length > 0
                              ? selectedTransaction.payments[0].paymentMethod
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700">
                            Payment Status
                          </p>
                          <Badge
                            className={getStatusColor(
                              selectedTransaction.status
                            )}
                          >
                            {selectedTransaction.status}
                          </Badge>
                        </div>
                      </div>

                      <Separator className="bg-purple-100" />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-gray-600">Total Price</p>
                          <p className="font-medium">
                            Rp {selectedTransaction.totalPrice.toLocaleString()}
                          </p>
                        </div>

                        {selectedTransaction.voucher && (
                          <div className="flex justify-between">
                            <p className="text-gray-600">
                              Voucher ({selectedTransaction.voucher.code})
                            </p>
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
                              <p className="text-gray-600">Points Used</p>
                              <p className="font-medium text-green-600">
                                - Rp{" "}
                                {selectedTransaction.points.pointsValue.toLocaleString()}
                              </p>
                            </div>
                          )}

                        <Separator className="bg-purple-100" />

                        <div className="flex justify-between text-lg font-bold">
                          <p className="text-purple-800">Final Price</p>
                          <p className="text-purple-800">
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">
                      Payment Proof
                    </CardTitle>
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
                      <Alert className="bg-yellow-50 border border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">
                          No payment proof has been uploaded yet.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">
                      Ticket Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedTransaction.detailTransaction &&
                    selectedTransaction.detailTransaction.length > 0 ? (
                      <div className="space-y-4">
                        {selectedTransaction.detailTransaction.map(
                          (detail, index) => (
                            <Card
                              key={index}
                              className="bg-purple-50 border border-purple-100"
                            >
                              <CardHeader className="pb-2">
                                <CardTitle className="text-md text-purple-700">
                                  {detail.seats.name || "Regular Ticket"}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="font-medium text-purple-600">
                                      Quantity
                                    </p>
                                    <p className="text-purple-900">
                                      {detail.quantity} tickets
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-purple-600">
                                      Price per Ticket
                                    </p>
                                    <p className="text-purple-900">
                                      Rp{" "}
                                      {(
                                        detail.seats.price || 0
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>
                    ) : (
                      <Alert className="bg-yellow-50 border border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">
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
                    className="flex-1 bg-red-500 hover:bg-red-600"
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
                        ? "bg-green-50 border border-green-200"
                        : selectedTransaction.status === "EXPIRED"
                        ? "bg-gray-100 border border-gray-200"
                        : "bg-red-50 border border-red-200"
                    }
                  >
                    {selectedTransaction.status === "DONE" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : selectedTransaction.status === "EXPIRED" ? (
                      <ClockIcon className="h-4 w-4 text-gray-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription
                      className={
                        selectedTransaction.status === "DONE"
                          ? "text-green-700"
                          : selectedTransaction.status === "EXPIRED"
                          ? "text-gray-800"
                          : "text-red-700"
                      }
                    >
                      {selectedTransaction.status === "DONE"
                        ? "This payment has been verified and approved."
                        : selectedTransaction.status === "EXPIRED"
                        ? "This payment has expired."
                        : selectedTransaction.status === "REJECTED"
                        ? "This payment has been rejected."
                        : "This payment has been cancelled."}
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
