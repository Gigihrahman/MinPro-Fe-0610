"use client";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import CardFilter from "@/features/explore/components/CardFilter";
import { useDebounceValue } from "usehooks-ts";
import useGetCategories from "@/hooks/category/useGetCategory";
import useGetCities from "@/hooks/city/useGetCity";
import useGetevents from "@/hooks/event/UseGetEvents";
import EventCard from "@/components/EventCard";
import PaginationSection from "@/components/PaginationSection";
import { X } from "lucide-react";

// Definisikan tipe data untuk event
interface Event {
  id: number;
  title: string;
  category: string;
  city: string;
}

const SearchForm = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [selectedCategory, setSelectedCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [selectedCity, setSelectedCity] = useQueryState("city", {
    defaultValue: "",
  });

  const [debounchedSearch] = useDebounceValue(search, 500);
  const { data: categories } = useGetCategories();
  const { data: city } = useGetCities();

  const { data: events, isPending } = useGetevents({
    page,
    take: 5,
    search: debounchedSearch,
    city: selectedCity,
    category: selectedCategory,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  // Fungsi untuk menghapus pilihan filter
  const clearCategory = () => {
    setSelectedCategory(""); // Reset category ke default
    setPage(1); // Reset ke halaman pertama
  };

  const clearCity = () => {
    setSelectedCity(""); // Reset city ke default
    setPage(1); // Reset ke halaman pertama
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements using only Tailwind */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>

      <section className="w-full py-10 relative">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">
            Discover Your Next Experience
          </h1>

          {/* Hero Search Area */}
          <div className="rounded-xl overflow-hidden shadow-2xl relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 z-10"></div>

            <div className="relative z-20 py-16 md:py-24 px-6 md:px-12 flex flex-col items-center">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-8 text-center">
                Find the perfect event for your interests
              </h2>

              <div className="w-full max-w-3xl">
                {/* Search Input */}
                <div className="w-full flex justify-center mb-8">
                  <div className="relative w-full">
                    <Input
                      placeholder="Search for events..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg border-0"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                  <div className="md:w-1/2 flex justify-center">
                    <CardFilter
                      value={selectedCategory} // Binding value to selectedCategory
                      onChange={setSelectedCategory}
                      data={categories} // Map categories to names
                      label="Category"
                    />
                    {/* Tombol Clear untuk Category */}
                    {selectedCategory && selectedCategory !== "" && (
                      <button
                        onClick={clearCategory}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X />
                      </button>
                    )}
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <CardFilter
                      value={selectedCity} // Binding value to city
                      onChange={setSelectedCity}
                      data={city}
                      label="City"
                    />
                    {/* Tombol Clear untuk City */}
                    {selectedCity && selectedCity !== "" && (
                      <button
                        onClick={clearCity}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Display Filtered Data */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Filtered Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="mt-12 grid gap-8 px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events?.data.length === 0 && (
            <div className="col-span-4 py-20 text-center">
              <div className="inline-flex justify-center items-center p-6 rounded-full bg-gray-50 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No events found</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back soon for upcoming events
              </p>
            </div>
          )}

          {!!events && !!events?.data.length && (
            <div className="col-span-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events?.data.map((event) => (
                <EventCard
                  key={event.id}
                  slug={event.slug}
                  title={event.name}
                  startDate={event.startEvent}
                  endDate={event.endEvent}
                  category={event.category.name}
                  categorySlug={event.category.slug}
                  image={event.thumbnail}
                  location={event.city.name}
                />
              ))}

              <div className="col-span-4 flex justify-center mt-8">
                <PaginationSection
                  page={events.meta.page}
                  total={events.meta.total}
                  take={events.meta.take}
                  onChangePage={onChangePage}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchForm;
