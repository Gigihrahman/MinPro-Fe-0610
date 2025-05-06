"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Calendar, Bell, Search } from "lucide-react";
import { useState } from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const router = useRouter();
  const session = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-purple-100 lg:hidden"
            >
              <Menu className="h-5 w-5 text-purple-700" />
            </button>

<<<<<<< HEAD
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link
                  href="/"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  href="/explore"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                >
                  Explore
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            {/* User Account Dropdown - Menggunakan DropdownMenu dari shadcn */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Account
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="cursor-pointer">
                    My Order
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <a href="#" className="cursor-pointer">
                    Sign Out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu - Menggunakan Sheet dari shadcn */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gray-50 dark:bg-gray-700 p-0"
                >
                  {/* Menambahkan SheetHeader dan SheetTitle untuk aksesibilitas */}
                  <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-600">
                    <SheetTitle className="text-gray-900 dark:text-white flex items-center space-x-2">
                      <img
                        className="w-auto h-8 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                        alt="Logo"
                      />
                      <img
                        className="hidden w-auto h-8 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                        alt="Logo"
                      />
                      <span className="ml-2">Menu</span>
                    </SheetTitle>
                    <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                      <X className="h-5 w-5 text-gray-900 dark:text-white" />
                      <span className="sr-only">Close</span>
                    </SheetClose>
                  </SheetHeader>

                  <div className="h-full flex flex-col">
                    <nav className="flex-1 p-4">
                      <ul className="space-y-3 text-gray-900 dark:text-white text-sm font-medium">
                        <li>
                          <Link
                            href="/"
                            className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/explore"
                            className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            Explore
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    <div className="border-t border-gray-200 dark:border-gray-600 p-4">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <a href="#" className="text-gray-900 dark:text-white">
                          Sign In
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
=======
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                <span className="font-bold">E</span>
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500"></span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </Link>
          </div>

          {/* Center section - Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full w-full pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search events..."
              />
>>>>>>> main
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-purple-100 relative hidden md:flex">
              <Calendar className="h-5 w-5 text-purple-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-purple-100 relative hidden md:flex">
              <Bell className="h-5 w-5 text-purple-700" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4 ml-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-700 font-medium"
              >
                Home
              </Link>
              {!!session.data?.user && (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-purple-700 font-medium"
                >
                  Profile
                </Link>
              )}
              {!session.data?.user ? (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-all"
                >
                  Sign in
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="border border-purple-500 text-purple-700 px-4 py-2 rounded-full font-medium hover:bg-purple-50 transition-all"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-purple-100"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5 text-purple-700" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fade-in-down">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-700 font-medium px-2 py-1"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              {!!session.data?.user && (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-purple-700 font-medium px-2 py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
              )}
              {!session.data?.user ? (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-all w-full text-center mt-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign in
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                  className="border border-purple-500 text-purple-700 px-4 py-2 rounded-full font-medium hover:bg-purple-50 transition-all w-full text-center mt-2"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile search */}
            <div className="mt-4 px-2">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full w-full pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search events..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
