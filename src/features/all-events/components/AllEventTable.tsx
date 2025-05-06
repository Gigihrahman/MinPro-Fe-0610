"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import {
  ArrowUpDown,
  MoreVertical,
  Calendar,
  Search,
  Eye,
  EyeOff,
  Settings,
  Plus,
  Filter,
  ChevronDown,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  Users,
  Grid,
  List,
} from "lucide-react";

// Components
import EventLoadingAnimation from "@/components/Loading";
import NoData from "@/components/NoData";
import PaginationSection from "@/components/PaginationSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks and services
import useGetEventByOrganizer from "@/hooks/event/useGetEventByOrganizer";
import { axiosInstance } from "@/lib/axios";

// Define column type
type Column = {
  id: string;
  label: string;
  visible: boolean;
};

export default function ImprovedAllEventsTable() {
  // State management
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [page, setPage] = useQueryState("int", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [columns, setColumns] = useState<Column[]>([
    { id: "thumbnail", label: "Thumbnail", visible: true },
    { id: "title", label: "Title", visible: true },
    { id: "location", label: "Location", visible: true },
    { id: "startDate", label: "Start Date", visible: true },
    { id: "endDate", label: "End Date", visible: true },
    { id: "startTime", label: "Start Time", visible: true },
    { id: "endTime", label: "End Time", visible: true },
  ]);

  const [isColumnSettingsOpen, setIsColumnSettingsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const router = useRouter();

  // Fetch events data
  const {
    data: events,
    refetch,
    isLoading,
  } = useGetEventByOrganizer({
    search: debounceSearch,
    page,
    take: itemsPerPage,
    order: sortOrder,
  });

  console.log("ini data events :", events);

  // Handle select all rows
  useEffect(() => {
    if (isSelectAll && events?.data) {
      setSelectedRows(events.data.map((event) => event.id));
    } else if (!isSelectAll) {
      setSelectedRows([]);
    }
  }, [isSelectAll, events?.data]);

  // Row selection handlers
  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
  };

  // Column visibility handlers
  const toggleColumnVisibility = (columnId: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Sorting handlers
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Delete handlers
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.patch(`/events/${id}`, {
        deletedAt: new Date().toISOString(),
      });
      refetch();
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const confirmDelete = (id: number) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) =>
          axiosInstance.patch(`/events/${id}`, {
            deletedAt: new Date().toISOString(),
          })
        )
      );
      refetch();
      setBulkDeleteDialogOpen(false);
      setSelectedRows([]);
      setIsSelectAll(false);
    } catch (error) {
      console.error("Failed to delete events:", error);
    }
  };

  // Page change handler
  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Render status badge based on dates
  const renderEventStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return (
        <Badge className="bg-purple-600 hover:bg-purple-700">Upcoming</Badge>
      );
    } else if (now > end) {
      return <Badge className="bg-gray-600 hover:bg-gray-700">Completed</Badge>;
    } else {
      return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>;
    }
  };

  // Render empty state
  if (isLoading) return <EventLoadingAnimation />;
  if (!events || events.data.length === 0) return <NoData />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-800">My Events</h1>

          <Button
            className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => router.push("/events/create")}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>

        {/* Filters and controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Search events..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* View mode toggle */}
            <TooltipProvider>
              <div className="flex border rounded-md overflow-hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      className={
                        viewMode === "list" ? "bg-purple-600 text-white" : ""
                      }
                      onClick={() => setViewMode("list")}
                    >
                      <List size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List View</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      className={
                        viewMode === "grid" ? "bg-purple-600 text-white" : ""
                      }
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Grid View</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {/* Column settings dropdown */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setIsColumnSettingsOpen(!isColumnSettingsOpen)
                    }
                    className="border-purple-200"
                  >
                    <Settings size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Column Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Items per page selector */}
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[130px] border-purple-200">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>

            {/* Bulk actions (visible when rows are selected) */}
            {selectedRows.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setBulkDeleteDialogOpen(true)}
                className="ml-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedRows.length})
              </Button>
            )}
          </div>
        </div>

        {/* Column visibility settings panel (slides down when opened) */}
        <AnimatePresence>
          {isColumnSettingsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-medium text-purple-800 mb-3">
                  Column Visibility
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className="flex items-center space-x-2"
                    >
                      <Switch
                        id={`col-${column.id}`}
                        checked={column.visible}
                        onCheckedChange={() =>
                          toggleColumnVisibility(column.id)
                        }
                      />
                      <Label
                        htmlFor={`col-${column.id}`}
                        className="cursor-pointer"
                      >
                        {column.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List View */}
        {viewMode === "list" && (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isSelectAll}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>

                  {columns.find((col) => col.id === "thumbnail")?.visible && (
                    <TableHead className="w-[120px]">Thumbnail</TableHead>
                  )}

                  {columns.find((col) => col.id === "title")?.visible && (
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 font-semibold"
                        onClick={() => handleSort("name")}
                      >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  )}

                  {columns.find((col) => col.id === "location")?.visible && (
                    <TableHead>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                        Location
                      </div>
                    </TableHead>
                  )}

                  {columns.find((col) => col.id === "startDate")?.visible && (
                    <TableHead>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                        Start Date
                      </div>
                    </TableHead>
                  )}

                  {columns.find((col) => col.id === "endDate")?.visible && (
                    <TableHead>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                        End Date
                      </div>
                    </TableHead>
                  )}

                  {columns.find((col) => col.id === "startTime")?.visible && (
                    <TableHead>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-gray-500" />
                        Start Time
                      </div>
                    </TableHead>
                  )}

                  {columns.find((col) => col.id === "endTime")?.visible && (
                    <TableHead>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-gray-500" />
                        End Time
                      </div>
                    </TableHead>
                  )}

                  <TableHead className="w-[100px] text-center">
                    Status
                  </TableHead>

                  <TableHead className="w-[80px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!!events &&
                  events.data.map((event) => (
                    <TableRow
                      key={event.id}
                      className="hover:bg-purple-50/50 transition-colors"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(event.id)}
                          onCheckedChange={() => toggleRow(event.id)}
                          aria-label={`Select ${event.name}`}
                        />
                      </TableCell>

                      {columns.find((col) => col.id === "thumbnail")
                        ?.visible && (
                        <TableCell>
                          <div className="relative h-[60px] w-[100px] overflow-hidden rounded-md">
                            <Image
                              src={event.thumbnail || "/placeholder.svg"}
                              alt={event.name}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "title")?.visible && (
                        <TableCell className="font-semibold text-purple-900">
                          {event.name}
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "location")
                        ?.visible && (
                        <TableCell className="max-w-[200px] truncate">
                          {event.locationDetail}
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "startDate")
                        ?.visible && (
                        <TableCell>
                          {new Date(event.startEvent).toLocaleDateString()}
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "endDate")?.visible && (
                        <TableCell>
                          {new Date(event.endEvent).toLocaleDateString()}
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "startTime")
                        ?.visible && (
                        <TableCell>
                          {new Date(event.startEvent).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      )}

                      {columns.find((col) => col.id === "endTime")?.visible && (
                        <TableCell>
                          {new Date(event.endEvent).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      )}

                      <TableCell className="text-center">
                        {renderEventStatus(event.startEvent, event.endEvent)}
                      </TableCell>

                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-purple-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="font-bold text-purple-800">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/events/${event.slug}/edit/`)
                                }
                                className="cursor-pointer flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4 text-purple-600" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/organizer/${event.slug}/create-seat/`
                                  )
                                }
                                className="cursor-pointer flex items-center"
                              >
                                <Settings className="mr-2 h-4 w-4 text-purple-600" />
                                Edit Seating
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/organizer/${event.slug}/participants/`
                                  )
                                }
                                className="cursor-pointer flex items-center"
                              >
                                <Users className="mr-2 h-4 w-4 text-purple-600" />
                                Participants
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => confirmDelete(event.id)}
                              className="cursor-pointer flex items-center text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!!events &&
              events.data.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={selectedRows.includes(event.id)}
                        onCheckedChange={() => toggleRow(event.id)}
                        aria-label={`Select ${event.name}`}
                        className="h-5 w-5 bg-white/80"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-bold truncate">
                        {event.name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(event.startEvent).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        {renderEventStatus(event.startEvent, event.endEvent)}
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-gray-600 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {event.locationDetail}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                      onClick={() => router.push(`/events/${event.slug}/edit/`)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          More <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/organizer/${event.slug}/create-seat/`)
                          }
                          className="cursor-pointer"
                        >
                          Edit Seating
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/organizer/${event.slug}/participants/`
                            )
                          }
                          className="cursor-pointer"
                        >
                          Participants
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(event.id)}
                          className="cursor-pointer text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
          </div>
        )}

        {/* Pagination */}
        {events?.meta && (
          <div className="mt-6">
            <PaginationSection
              page={page ?? 0}
              take={events.meta.take}
              total={events.meta.total}
              onChangePage={onChangePage}
            />
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => eventToDelete && handleDelete(eventToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk delete confirmation dialog */}
      <Dialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Confirm Bulk Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedRows.length} events? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setBulkDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {selectedRows.length} Events
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
