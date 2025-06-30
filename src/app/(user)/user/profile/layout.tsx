"use client";

// import { useState } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/store/store";

import { Layout } from "antd";
import Sidebar from "@/components/common/SideBarForSystem";
import HeaderDashboard from "@/components/common/HeaderForSystem";

interface ServiceProviderLayoutProps {
  children: React.ReactNode;
}

export default function UserProfileLayout({ children }: ServiceProviderLayoutProps) {

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
