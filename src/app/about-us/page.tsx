"use client";
import AboutUs from "@/components/about-us/AboutUs";

import Hero from "@/components/about-us/Hero";
import BreadCrumb, { BreadcrumbItem } from "@/components/common/BreadCrumb";

export default function Page() {
  const lists: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "About-us" },
  ];
  return (
    <div>
      <div className="flex justify-left items-center bg-gray-100 p-4 shadow-md">
        <BreadCrumb lists={lists} />
      </div>
      {/* Changed height and padding for mobile */}
      <div className="relative  p-4 md:p-20 w-full shadow-2xl h-[300px] md:h-[700px]">
        <Hero />
      </div>
      <div>
        <AboutUs></AboutUs>
      </div>
    </div>
  );
}
