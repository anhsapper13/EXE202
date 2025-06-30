"use client";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BaiduOutlined,
  CalendarOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

import { Role } from "@/types/user.type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUser } from "@/store/slices/userSlice";

const Sidebar = () => {
  // const role = "service_provider"; // Replace with actual role from context or props
  const role = useSelector((state: RootState) => state.user.currentUser?.role);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
    router.push("/login");
  };
  // Sidebar configurations
  // const role = Role.CUSTOMER;
  // const role = Role.SERVICE_PROVIDER;

  const pathName = usePathname();
  const sideBarAdmin = [
    {
      key: "/admin/dashboard",
      icon: <BaiduOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "/admin/orders-history",
      icon: <DollarOutlined />,
      label: <Link href="/admin/orders-history">Order History</Link>,
    },
    {
      key: "/admin/user-list",
      icon: <UserOutlined />,
      label: <Link href="/admin/user-list">User</Link>,
    },
    {
      key: "/admin/profile",
      icon: <AppstoreAddOutlined />,
      label: <Link href="/admin/profile">Profile</Link>,
    },
  ];

  const sideBarServiceProvider = [
    {
      key: "/service-provider/dashboard",
      icon: <LineChartOutlined />,
      label: <Link href="/service-provider/dashboard">Dashboard</Link>,
    },
    {
      key: "/service-provider/booking",
      icon: <OrderedListOutlined />,
      label: <Link href="/service-provider/booking">Booking</Link>,
    },
    {
      key: "/service-provider/service",
      icon: <CalendarOutlined />,
      label: <Link href="/service-provider/service">Service</Link>,
    },

    {
      key: "/service-provider/orders-history",
      icon: <DollarOutlined />,
      label: <Link href="/service-provider/orders-history">Order History</Link>,
    },
    {
      key: "/service-provider/payment-transaction",
      icon: <TransactionOutlined />,
      label: (
        <Link href="/service-provider/payment-transaction">
          Payment Transaction
        </Link>
      ),
    },
    {
      key: "/service-provider/your-profile",
      icon: <UserOutlined />,
      label: <Link href="/service-provider/your-profile">Profile</Link>,
    },
  ];

  const sideBarCustomer = [
    {
      key: "/profile/dashboard",
      icon: <BaiduOutlined />,
      label: <Link href="/profile/dashboard">Dashboard</Link>,
    },
    {
      key: "/user/order-history",
      icon: <AppstoreOutlined />,
      label: <Link href="/profile/order-history">Order History</Link>,
    },
    {
      key: "/profile/your-appointment",
      icon: <FieldTimeOutlined />,
      label: <Link href="/profile/your-appointment">Your Appointment</Link>,
    },
  ];
  // const sideBarForumStaff = [
  //   {
  //     key: "1",
  //     icon: <BaiduOutlined />,
  //     label: <Link href="/forum-staff/dashboard">Dashboard</Link>,
  //   },
  //   {
  //     key: "2",
  //     icon: <AuditOutlined />,
  //     label: <Link href="/forum-staff/pending-list">Pending Forum Post</Link>,
  //   },
  //   {
  //     key: "3",
  //     icon: <ReconciliationOutlined />,
  //     label: <Link href="/forum-staff/manage-forum">Manage Forum</Link>,
  //   },
  //   {
  //     key: "4",
  //     icon: <AndroidOutlined />,
  //     label: <Link href="/forum-staff/ai-settings">AI Setting</Link>,
  //   },
  // ];

  // Determine sidebar items based on role
  const getSidebarItems = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return sideBarAdmin;
      case Role.SERVICE_PROVIDER:
        return sideBarServiceProvider;
      case Role.CUSTOMER:
        return sideBarCustomer;
      default:
        return [];
    }
  };

  return (
    <Layout.Sider
      theme="light"
      width={200}
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "25px",
        height: "100vh",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[pathName]}
        defaultSelectedKeys={["/profile/dashboard"]}
        items={getSidebarItems(role as Role)}
        style={{
          height: "100%",
          borderRight: 0,
          position: "fixed",
          width: "200px",
        }}
      />
      <Button
        icon={<LogoutOutlined />}
        type="link"
        danger
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
        }}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Layout.Sider>
  );
};

export default Sidebar;
