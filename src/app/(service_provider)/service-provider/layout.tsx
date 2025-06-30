"use client";

// import { useState } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/store/store";
// import Header from "@/components/common/Header";
// import Sidebar from "@/components/common/SideBar";
// import { cn } from "@/lib/utils";
import { Layout } from "antd";
// import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/common/SideBarForSystem";
import HeaderDashboard from "@/components/common/HeaderForSystem";

interface ServiceProviderLayoutProps {
  children: React.ReactNode;
}

export default function ServiceProviderLayout({ children }: ServiceProviderLayoutProps) {

  return (
    <main>
      <HeaderDashboard />
      <Layout>
        <Sidebar />
        <div className="p-6 w-full">{children}</div>
      </Layout>
    </main>
  );
}
