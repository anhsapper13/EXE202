"use client";

import { Layout } from "antd";
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
