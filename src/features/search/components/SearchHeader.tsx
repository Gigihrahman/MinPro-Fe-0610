"use client";
import { Input } from "@/components/ui/input";
import CardFilter from "@/features/search/components/CardFilter";
import React, { useState } from "react";

const SearchForm = () => {
  // const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  // const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  // const [selectedCategory, setSelectedCategory] = useQueryState("category", {
  //   defaultValue: "",
  // });

  // const handleCategoryClick = (categoryId: string) => {
  //   setSelectedCategory(categoryId === "all" ? "" : categoryId);
  //   setPage(1); // Reset to first page when changing category
  // };

  // const { data: categories } = useGetCategories();
  // const [debounchedSearch] = useDebounceValue(search, 500);

  // const getCategoryName = (categorySlug: string): string => {
  //   if (categorySlug === "" || categorySlug === "all") return "All Posts";
  //   if (!categories) return "Unknown Category";
  //   const foundCategory = categories.find((cat) => cat.slug === categorySlug);
  //   return foundCategory?.name || "Unknown Category";
  // };
  const categories = ["all", "category1", "category2", "category3"];
  const cities = ["city1", "city2", "city3"];
  const [city, setCity] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  console.log(category);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements using only Tailwind */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>

      <section className="w-full py-16 relative">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">
            Discover Your Next Experience
          </h1>

          {/* Hero Search Area */}
          <div className="rounded-xl overflow-hidden shadow-2xl relative mb-16">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 z-10"></div>

            {/* Background Image */}

            {/* Search Content */}
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
                      className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg border-0"
                    />
                    <button className="absolute right-2 top-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                  <div className="md:w-1/2 flex justify-center">
                    <CardFilter
                      onChange={setCategory}
                      data={categories}
                      label="Category"
                    />
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <CardFilter onChange={setCity} data={cities} label="City" />
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                    Find Events
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Events Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Featured Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-3 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchForm;
