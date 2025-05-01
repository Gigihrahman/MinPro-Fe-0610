"use client";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

const Jumbotron = () => {
  // Array of image paths - replace with your actual image paths
  const images = ["/carousel1.svg", "/carousel2.svg", "/carousel3.svg"];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Carousel Background Images with smooth transitions */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Dark gradient overlay for text readability - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-30">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
              Discover Amazing Events Near You
            </h1>
            <p className="text-gray-100 mx-auto max-w-[700px] md:text-xl font-light drop-shadow">
              Find and book tickets for concerts, workshops, conferences, and
              more.
            </p>
          </div>

          <div className="w-full max-w-xl space-y-6">
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-white/20 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <div className="relative backdrop-blur-md bg-white/90 rounded-full shadow-xl">
                  <Search className="text-gray-600 absolute top-3.5 left-4 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="w-full pl-12 pr-16 py-3.5 rounded-full border-0 bg-transparent focus:ring-2 focus:ring-white/70 text-gray-800"
                  />
                  <Button className="absolute top-1.5 right-1.5 h-9 w-9 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-md transition-all duration-200">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer backdrop-blur-sm">
                Concerts
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer backdrop-blur-sm">
                Festivals
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer backdrop-blur-sm">
                Workshops
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer backdrop-blur-sm">
                Conferences
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 text-gray-800 hover:bg-white transition cursor-pointer backdrop-blur-sm">
                More
              </span>
            </div>
          </div>

          {/* Carousel indicators */}
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
