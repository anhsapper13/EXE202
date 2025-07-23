"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LazyImage from "../common/LazyImage";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { clearUser } from "@/store/slices/userSlice";

const Header: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const [isDogsDropdownOpen, setIsDogsDropdownOpen] = useState(false);
  const [isCatsDropdownOpen, setIsCatsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDogsOpen, setIsMobileDogsOpen] = useState(false);
  const [isMobileCatsOpen, setIsMobileCatsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState<string>("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?page=1&search=${encodeURIComponent(search)}`);
    } else {
      router.push(
        "/products?page=1&sort=createdAt&order=desc&minPrice=0&maxPrice=10000000"
      );
    }
  };

  const dropdownContent = [
    {
      title: "Food",
      items: ["Dry Food", "Wet Food", "Medicinal Food", "Treats"],
    },
    {
      title: "Accessories - Toys",
      items: ["Toys", "Fashion - Clothes", "Collars & Leashes"],
    },
    {
      title: "Cages",
      items: ["Cages & Sleeping Mats", "Transportation", "Healthcare"],
    },
    {
      title: "Hygiene",
      items: ["Litter", "Dental Care", "Shampoo", "Deodorizing Spray"],
    },
    {
      title: "Milk & Nursing Bottle",
      items: ["Vitamins & Supplements"],
    },
  ];

  return (
    <header className="w-full bg-background">
      <div className="container py-2 flex justify-between items-center max-w-full px-8">
        <div className="logo">
          <Link href="/">
            <LazyImage
              src="/logo.png"
              alt="Placeholder Logo"
              width={100}
              height={50}
              className="object-contain"
              objectFit="contain"
              priority={true}
            />
          </Link>
        </div>

        <div className="flex items-center w-1/3">
          <div className="relative w-full">
            <form onSubmit={handleSearch}>
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-foreground transition-all ease-in-out"
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border text-foreground border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-8">
          <button
            className="group lg:hidden flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3Icon
              className={`h-6 w-6 text-foreground group-hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            />
          </button>

          {isAuthenticated && (
            <Link
              href="/user/profile"
              className={`group flex flex-col items-center text-foreground transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            >
              <UserIcon className="h-6 w-6 text-foreground group-hover:text-secondary" />
              <span className="text-sm text-foreground group-hover:text-secondary hidden lg:block">
                Profile
              </span>
            </Link>
          )}

          <Link
            href="/cart"
            className={`group flex flex-col items-center text-foreground transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            <ShoppingCartIcon className="h-6 w-6 text-foreground group-hover:text-secondary" />
            <span className="text-sm text-foreground group-hover:text-secondary hidden lg:block">
              Cart
            </span>
          </Link>

          {isAuthenticated && (
            <Button
              onClick={() => {
                dispatch(clearUser());
                localStorage.removeItem("accessToken");
                router.push("/login");
              }}
              className={`group flex flex-col items-center transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            >
              <span className="text-sm  group-hover:text-secondary hidden lg:block">
                Log Out
              </span>
            </Button>
          )}
        </div>
      </div>

      <div className="bg-tertiary py-2 hidden lg:block">
        <div className="container flex justify-center items-center space-x-8 text-white max-w-full">
          <div
            className="relative"
            onMouseEnter={() => setIsDogsDropdownOpen(true)}
            onMouseLeave={() => setIsDogsDropdownOpen(false)}
          >
            <Link
              href="/dogs"
              className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            >
              Dogs
            </Link>
            {isDogsDropdownOpen && (
              <div className="absolute top-9 left-0 bg-white text-black shadow-lg rounded-b-lg p-4 grid grid-cols-5 gap-4 w-[600px] z-50 transition-all duration-300">
                {dropdownContent.map((section, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">
                      {section.title}
                    </h3>
                    <ul>
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-md cursor-pointer hover:text-secondary transition-all duration-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsCatsDropdownOpen(true)}
            onMouseLeave={() => setIsCatsDropdownOpen(false)}
          >
            <Link
              href="/cats"
              className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            >
              Cats
            </Link>
            {isCatsDropdownOpen && (
              <div className="absolute top-9 left-0 bg-white text-black shadow-lg rounded-b-lg p-4 grid grid-cols-5 gap-4 w-[600px] z-50 transition-all duration-200">
                {dropdownContent.map((section, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">
                      {section.title}
                    </h3>
                    <ul>
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-md hover:text-secondary cursor-pointer transition-all duration-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about-us"
            className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            Contact
          </Link>
          <Link
            href="/products"
            className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            Shopping
          </Link>
          <Link
            href="/pet-service"
            className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            Services
          </Link>
          <Link
            href="/forum"
            className={`text-lg font-medium hover:text-secondary transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
          >
            Forum
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 bg-background w-2/3 h-full z-50 transform transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <XMarkIcon
              className={`h-6 w-6 text-foreground hover:text-secondary cursor-pointer transition-all duration-200 ${theme.animations ? "hover:scale-105" : ""}`}
            />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4 text-foreground">
          <div className="flex flex-col">
            <button
              className="flex items-center justify-between text-lg font-medium hover:text-secondary transition-all duration-200"
              onClick={() => setIsMobileDogsOpen(!isMobileDogsOpen)}
            >
              Dogs
              <ChevronDownIcon
                className={`h-6 w-6 cursor-pointer transform transition-all ${isMobileDogsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isMobileDogsOpen && (
              <div className="ml-4 mt-2 space-y-2">
                {dropdownContent.map((section, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="font-semibold text-md mb-1">
                      {section.title}
                    </h3>
                    <ul>
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm hover:text-secondary cursor-pointer transition-all duration-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              className="flex items-center justify-between text-lg font-medium hover:text-secondary transition-all duration-200"
              onClick={() => setIsMobileCatsOpen(!isMobileCatsOpen)}
            >
              Cats
              <ChevronDownIcon
                className={`h-6 w-6 cursor-pointer transform transition-all ${isMobileCatsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isMobileCatsOpen && (
              <div className="ml-4 mt-2 space-y-2">
                {dropdownContent.map((section, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="font-semibold text-md mb-1">
                      {section.title}
                    </h3>
                    <ul>
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm hover:text-secondary cursor-pointer transition-all duration-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about-us"
            className="text-lg font-medium hover:text-secondary transition-all duration-200"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-secondary transition-all duration-200"
          >
            Contact
          </Link>
          <Link
            href="/products"
            className="text-lg font-medium hover:text-secondary transition-all duration-200"
          >
            Shopping
          </Link>
          <Link
            href="/services"
            className="text-lg font-medium hover:text-secondary transition-all duration-200"
          >
            Services
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
