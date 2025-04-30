"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Grid, List, Filter, Calendar, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/EventCard";
import EventListItem from "@/components/EventListItem";
import { Pagination } from "@/components/Pagination";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

// Mock data - would come from API in real app
const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "April 20, 2025",
    location: "Jakarta Convention Center",
    price: 300000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    description:
      "Join us for the biggest tech conference in Indonesia. Learn from industry experts and network with professionals.",
    organizer: "TechEvents Indonesia",
    availableSeats: 250,
  },
  {
    id: "2",
    title: "Music Festival",
    date: "May 5, 2025",
    location: "Senayan, Jakarta",
    price: 500000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Music",
    description:
      "A two-day music festival featuring top local and international artists across multiple stages.",
    organizer: "Sound Productions",
    availableSeats: 1000,
  },
  // More event data...
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "technology", label: "Technology" },
  // More categories...
];

const locations = [
  { value: "all", label: "All Locations" },
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  // More locations...
];

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Initialize states from URL params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "all";
    const loc = searchParams.get("location") || "all";
    const view = (searchParams.get("view") as "grid" | "list") || "grid";
    const free = searchParams.get("free") === "true";

    setSearchQuery(query);
    setCategory(cat);
    setLocation(loc);
    setViewMode(view);
    setShowFreeOnly(free);

    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Update URL with current filters
  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (category !== "all") params.set("category", category);
    if (location !== "all") params.set("location", location);
    if (viewMode !== "grid") params.set("view", viewMode);
    if (showFreeOnly) params.set("free", "true");

    router.push(`/search?${params.toString()}`);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams();
  };

  // Apply all filters
  const applyFilters = () => {
    updateSearchParams();
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setLocation("all");
    setPriceRange([0, 500000]);
    setDateRange({ from: undefined, to: undefined });
    setShowFreeOnly(false);

    router.push("/search");
  };

  // Filter events based on search query and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      category === "all" ||
      event.category.toLowerCase() === category.toLowerCase();
    const matchesLocation =
      location === "all" ||
      event.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = showFreeOnly
      ? event.price === 0
      : event.price >= priceRange[0] && event.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="container py-10">
      <div className="mb-6 space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Search Events</h1>
        <p className="text-muted-foreground">Find the perfect event for you</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search events, organizers, or keywords..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-shrink-0">
              Search
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Events</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Category</h3>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Location</h3>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset and Apply Filters */}
                  <SheetFooter>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button onClick={applyFilters}>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            image={event.image}
            category={event.category}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
