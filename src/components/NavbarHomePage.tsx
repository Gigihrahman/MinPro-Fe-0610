import { FC } from "react";
import { Menu, X } from "lucide-react";

// Import komponen dari shadcn/ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavbarHomePage: FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="/window.svg"
                  alt="Logo"
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="/window.svg"
                  alt="Logo"
                />
              </a>
            </div>

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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHomePage;
