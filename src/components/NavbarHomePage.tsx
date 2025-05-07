"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
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
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                <span className="font-bold">E</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
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
              {!!session.data?.user && (
                <Link
                  href="/transaction"
                  className="text-gray-700 hover:text-purple-700 font-medium"
                >
                  Transactions
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
              {!!session.data?.user && (
                <Link
                  href="/transaction"
                  className="text-gray-700 hover:text-purple-700 font-medium px-2 py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Transactions
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
