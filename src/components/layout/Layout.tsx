"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const hideFooter =
    pathname.includes("/user/profile") ||
    pathname.includes("/service-provider") ||
    pathname.includes("/admin");
  const hideHeader =
    pathname.includes("/user/profile") ||
    pathname.includes("/service-provider") ||
    pathname.includes("/admin");

  return (
    <div className="">
      {!hideHeader && <Header />}
      <main className="">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
