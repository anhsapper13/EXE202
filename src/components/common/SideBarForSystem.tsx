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
  const role = useSelector((state: RootState) => state.user.currentUser?.role ?? Role.CUSTOMER);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const normalizedPath = pathName.split("?")[0]; // Loại bỏ query parameters

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const sideBarAdmin = [
    { key: "/admin/dashboard", icon: <BaiduOutlined />, label: <Link href="/admin/dashboard">Dashboard</Link> },
    { key: "/admin/orders-history", icon: <DollarOutlined />, label: <Link href="/admin/orders-history">Order History</Link> },
    { key: "/admin/user-list", icon: <UserOutlined />, label: <Link href="/admin/user-list">User</Link> },
    { key: "/admin/profile", icon: <AppstoreAddOutlined />, label: <Link href="/admin/profile">Profile</Link> },
  ];

  const sideBarServiceProvider = [
    { key: "/service-provider/dashboard", icon: <LineChartOutlined />, label: <Link href="/service-provider/dashboard">Dashboard</Link> },
    { key: "/service-provider/booking", icon: <OrderedListOutlined />, label: <Link href="/service-provider/booking">Booking</Link> },
    { key: "/service-provider/service", icon: <CalendarOutlined />, label: <Link href="/service-provider/service">Service</Link> },
    { key: "/service-provider/orders-history", icon: <DollarOutlined />, label: <Link href="/service-provider/orders-history">Order History</Link> },
    { key: "/service-provider/payment-transaction", icon: <TransactionOutlined />, label: <Link href="/service-provider/payment-transaction">Payment Transaction</Link> },
    { key: "/service-provider/your-profile", icon: <UserOutlined />, label: <Link href="/service-provider/your-profile">Profile</Link> },
  ];

  const sideBarCustomer = [
    { key: "/user/profile/dashboard", icon: <BaiduOutlined />, label: <Link href="/user/profile/dashboard">Dashboard</Link> },
    { key: "/user/profile/order-history", icon: <AppstoreOutlined />, label: <Link href="/user/profile/order-history">Order History</Link> },
    { key: "/user/profile/your-appointment", icon: <FieldTimeOutlined />, label: <Link href="/user/profile/your-appointment">Your Appointment</Link> },
  ];

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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[normalizedPath]}
        defaultSelectedKeys={["/profile/dashboard"]}
        items={getSidebarItems(role as Role)}
        style={{
          flex: 1,
          borderRight: 0,
        }}
      />
      <Button
        icon={<LogoutOutlined />}
        type="link"
        danger
        style={{
          paddingLeft: "16px",
          textAlign: "left",
        }}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Layout.Sider>
  );
};

export default Sidebar;