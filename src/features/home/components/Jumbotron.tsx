"use client";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Jumbotron = () => {
  const images = ["/carousel1.svg", "/carousel2.svg", "/carousel3.svg"];
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/explore?search=${searchQuery}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-30">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
              Discover Amazing Events Near You
            </h1>
          </div>

          <div className="w-full max-w-xl space-y-6">
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-white/20 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <div className="relative backdrop-blur-md bg-white/90 rounded-full shadow-xl">
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="w-full pl-12 pr-16 py-3.5 rounded-full border-0 bg-transparent focus:ring-2 focus:ring-white/70 text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    onClick={handleSearch}
                    className="absolute top-0 right-0 h-9 w-9 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-md transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
