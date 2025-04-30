import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Jumbotron = () => {
  return (
    <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Discover Amazing Events Near You
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              Find and book tickets for concerts, workshops, conferences, and
              more.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search events..."
                className="bg-background w-full pl-8 md:pr-12"
              />
              <Button className="absolute top-1 right-1 h-7 w-7 rounded-sm px-0 sm:top-2 sm:right-2">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
