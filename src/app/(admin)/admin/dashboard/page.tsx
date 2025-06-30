"use client";
import {
  AnalyticsService
} from "@/services/analytics.service";
import BookingService from "@/services/booking.service";
import { OrderService } from "@/services/order.service";
import { PaymentTransactionService } from "@/services/payment-transaction.service";
import { PaymentStatus } from "@/types/payment-transaction.interface";
import {
  CheckCircleOutlined,
  CreditCardOutlined,
  DollarOutlined,
  RiseOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {
  Card,
  Col,
  Progress,
  Row,
  Space,
  Spin,
  Statistic,
  Typography
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const { Title, Text } = Typography;

interface AnalyticsData {
  totalOrders: number;
  completedOrders: number;
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalTransactions: number;
  avgOrderValue: number;
  growthRate: number;
}

interface ChartData {
  month: string;
  revenue: number;
  orders: number;
  bookings: number;
}

interface StatusDistribution {
  name: string;
  value: number;
  color: string;
}

const COLORS = ["#52c41a", "#1890ff", "#faad14", "#f5222d", "#722ed1"];

const AnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalOrders: 0,
    completedOrders: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalTransactions: 0,
    avgOrderValue: 0,
    growthRate: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<StatusDistribution[]>(
    []
  );

  const [dateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(6, "month"),
    dayjs(),
  ]);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      // Sử dụng API backend mới
      const analyticsResponse = await AnalyticsService.getDashboardAnalytics({
        startDate: dateRange[0].format("YYYY-MM-DD"),
        endDate: dateRange[1].format("YYYY-MM-DD"),
      });

      const revenueTrendResponse = await AnalyticsService.getRevenueTrend({
        months: 3,
      });

      const statusDistributionResponse =
        await AnalyticsService.getStatusDistribution();

      // Set analytics data
      if (analyticsResponse.data?.data) {
        setAnalyticsData(analyticsResponse.data.data);
      }

      // Set chart data
      if (revenueTrendResponse.data?.data) {
        const chartDataTemp: ChartData[] = revenueTrendResponse.data.data.map(
          (item) => ({
            month: item.period,
            revenue: item.revenue,
            orders: item.orders,
            bookings: item.bookings,
          })
        );
        setChartData(chartDataTemp);
      }

      // Set status distribution data
      if (statusDistributionResponse.data?.data) {
        const orderStatusDataTemp: StatusDistribution[] =
          statusDistributionResponse.data.data.orderStatus.map(
            (item, index) => ({
              name: item.name,
              value: item.value,
              color: COLORS[index % COLORS.length],
            })
          );
        setOrderStatusData(orderStatusDataTemp);

        // const bookingStatusDataTemp: StatusDistribution[] =
        //   statusDistributionResponse.data.data.bookingStatus.map(
        //     (item, index) => ({
        //       name: item.name,
        //       value: item.value,
        //       color: COLORS[index % COLORS.length],
        //     })
        //   );
        // setBookingStatusData(bookingStatusDataTemp);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);

      // Fallback to old method if new API fails
      console.log("Falling back to old analytics method...");
      await fetchAnalyticsDataFallback();
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange, fetchAnalyticsData]);

  const fetchAnalyticsDataFallback = async () => {
    try {
      // Lấy dữ liệu orders
      const ordersResponse = await OrderService.getOrdersBasedOnUse({
        page: 1,
        limit: 1000, // Lấy nhiều để tính toán
      });

      // Lấy dữ liệu payments
      const paymentsResponse =
        await PaymentTransactionService.getPaymentTransactionsBasedOnUse({
          page: 1,
          limit: 1000,
        });

      // Lấy dữ liệu bookings
      const bookingsResponse = await BookingService.getAllBookingBasedOnUser({
        page: 1,
        limit: 1000,
      });

      // Xử lý dữ liệu
      const orders = ordersResponse.data?.data || [];
      const payments = paymentsResponse.data?.data || [];
      const bookings = bookingsResponse.data?.data || [];

      // Tính toán thống kê
      const currentMonth = dayjs().format("YYYY-MM");
      const completedOrders = orders.filter(
        (order: any) => order.status === "COMPLETED"
      );
      const completedBookings = bookings.filter(
        (booking: any) => booking.status === "COMPLETED"
      );

      // const monthlyOrders = orders.filter(
      //   (order: any) =>
      //     dayjs(order.createdAt).format("YYYY-MM") === currentMonth
      // );

      const monthlyPayments = payments.filter(
        (payment: any) =>
          dayjs(payment.createdAt).format("YYYY-MM") === currentMonth
      );

      const totalRevenue = payments
        .filter((payment: any) => payment.status === "SUCCESS")
        .reduce(
          (sum: number, payment: any) =>
            sum + (parseFloat(payment.amount) || 0),
          0
        );

      const monthlyRevenue = monthlyPayments
        .filter((payment: any) => payment.status === "SUCCESS")
        .reduce(
          (sum: number, payment: any) =>
            sum + (parseFloat(payment.amount) || 0),
          0
        );

      const avgOrderValue =
        completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

      const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");
      const lastMonthRevenue = payments
        .filter(
          (payment: any) =>
            dayjs(payment.createdAt).format("YYYY-MM") === lastMonth &&
            payment.status === PaymentStatus
        )
        .reduce(
          (sum: number, payment: any) =>
            sum + (parseFloat(payment.amount) || 0),
          0
        );

      const growthRate =
        lastMonthRevenue > 0
          ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          : 0;

      setAnalyticsData({
        totalOrders: orders.length,
        completedOrders: completedOrders.length,
        totalBookings: bookings.length,
        completedBookings: completedBookings.length,
        totalRevenue,
        monthlyRevenue,
        totalTransactions: payments.length,
        avgOrderValue,
        growthRate,
      });

      // Tạo dữ liệu cho biểu đồ (6 tháng gần nhất)
      const chartDataTemp: ChartData[] = [];
      for (let i = 5; i >= 0; i--) {
        const month = dayjs().subtract(i, "month");
        const monthStr = month.format("YYYY-MM");
        const monthLabel = month.format("MMM YYYY");

        const monthOrders = orders.filter(
          (order: any) => dayjs(order.createdAt).format("YYYY-MM") === monthStr
        );

        const monthBookings = bookings.filter(
          (booking: any) =>
            dayjs(booking.createdAt).format("YYYY-MM") === monthStr
        );

        const monthRevenue = payments
          .filter(
            (payment: any) =>
              dayjs(payment.createdAt).format("YYYY-MM") === monthStr &&
              payment.status === "SUCCESS"
          )
          .reduce(
            (sum: number, payment: any) =>
              sum + (parseFloat(payment.amount) || 0),
            0
          );

        chartDataTemp.push({
          month: monthLabel,
          revenue: monthRevenue,
          orders: monthOrders.length,
          bookings: monthBookings.length,
        });
      }
      setChartData(chartDataTemp);

      // Tạo dữ liệu phân bố status cho orders
      const orderStatusCount: { [key: string]: number } = {};
      orders.forEach((order: any) => {
        orderStatusCount[order.status] =
          (orderStatusCount[order.status] || 0) + 1;
      });

      const orderStatusDataTemp: StatusDistribution[] = Object.entries(
        orderStatusCount
      ).map(([status, count], index) => ({
        name: status,
        value: count,
        color: COLORS[index % COLORS.length],
      }));
      setOrderStatusData(orderStatusDataTemp);

      // Tạo dữ liệu phân bố status cho bookings
      const bookingStatusCount: { [key: string]: number } = {};
      bookings.forEach((booking: any) => {
        bookingStatusCount[booking.status] =
          (bookingStatusCount[booking.status] || 0) + 1;
      });

      // const bookingStatusDataTemp: StatusDistribution[] = Object.entries(
      //   bookingStatusCount
      // ).map(([status, count], index) => ({
      //   name: status,
      //   value: count,
      //   color: COLORS[index % COLORS.length],
      // }));
      // setBookingStatusData(bookingStatusDataTemp);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${
                entry.dataKey === "revenue"
                  ? "Doanh thu"
                  : entry.dataKey === "orders"
                    ? "Đơn hàng"
                    : "Booking"
              }: ${
                entry.dataKey === "revenue"
                  ? formatCurrency(entry.value)
                  : entry.value
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Title level={2}>📊 Analytics Dashboard</Title>
        <Text type="secondary">
          Tổng quan về hiệu suất kinh doanh và các chỉ số quan trọng
        </Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Total Orders"
              value={analyticsData.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Competed Orders"
              value={analyticsData.completedOrders}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
              suffix={
                <Text type="secondary">/{analyticsData.totalOrders}</Text>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Metrics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={analyticsData.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a" }}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={analyticsData.monthlyRevenue}
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#1890ff" }}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Transactions"
              value={analyticsData.totalTransactions}
              prefix={<CreditCardOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Growth Rate"
              value={analyticsData.growthRate}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{
                color: analyticsData.growthRate >= 0 ? "#52c41a" : "#f5222d",
              }}
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Revenue Trend */}
        <Col xs={24} lg={12}>
          <Card title="📈 Xu Hướng Doanh Thu (6 Tháng Gần Nhất)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value: any) =>
                    `${(value / 1000000).toFixed(0)}M`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#52c41a"
                  fill="#52c41a"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Orders & Bookings Trend */}
        <Col xs={24} lg={12}>
          <Card title="📊 Xu Hướng Đơn Hàng & Booking">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#1890ff"
                  strokeWidth={2}
                  name="Đơn hàng"
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#722ed1"
                  strokeWidth={2}
                  name="Booking"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Status Distribution */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card title="🥧 Phân Bố Trạng Thái Đơn Hàng">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Performance Indicators */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="🎯 Chỉ Số Hiệu Suất">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <div className="flex justify-between mb-2">
                  <Text>Tỷ Lệ Hoàn Thành Đơn Hàng</Text>
                  <Text strong>
                    {analyticsData.totalOrders > 0
                      ? (
                          (analyticsData.completedOrders /
                            analyticsData.totalOrders) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </Text>
                </div>
                <Progress
                  percent={
                    analyticsData.totalOrders > 0
                      ? (analyticsData.completedOrders /
                          analyticsData.totalOrders) *
                        100
                      : 0
                  }
                  strokeColor="#52c41a"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Text>Tỷ Lệ Hoàn Thành Booking</Text>
                  <Text strong>
                    {analyticsData.totalBookings > 0
                      ? (
                          (analyticsData.completedBookings /
                            analyticsData.totalBookings) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </Text>
                </div>
                <Progress
                  percent={
                    analyticsData.totalBookings > 0
                      ? (analyticsData.completedBookings /
                          analyticsData.totalBookings) *
                        100
                      : 0
                  }
                  strokeColor="#1890ff"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Text>Giá Trị Đơn Hàng Trung Bình</Text>
                  <Text strong>
                    {formatCurrency(analyticsData.avgOrderValue)}
                  </Text>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="🏆 Thành Tích Nổi Bật">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <Text strong className="text-lg">
                  {analyticsData.completedOrders} Đơn Hàng Hoàn Thành
                </Text>
                <br />
                <Text type="secondary">
                  Trong tổng số {analyticsData.totalOrders} đơn hàng
                </Text>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <Text strong className="text-lg">
                  {formatCurrency(analyticsData.monthlyRevenue)}
                </Text>
                <br />
                <Text type="secondary">Doanh thu tháng này</Text>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">📈</div>
                <Text strong className="text-lg">
                  {analyticsData.growthRate >= 0 ? "+" : ""}
                  {analyticsData.growthRate.toFixed(1)}%
                </Text>
                <br />
                <Text type="secondary">Tăng trưởng so với tháng trước</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage;
