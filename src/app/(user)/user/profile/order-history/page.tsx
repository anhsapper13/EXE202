"use client";
import { OrderService } from "@/services/order.service";
import { IOrderItem } from "@/types/order-item.type";
import { IOrder, OrderStatus, OrderType } from "@/types/order.interface";
import { formatCurrency } from "@/ultils/formatters";
import {
  CheckCircleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography
} from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;
const { Text, Title } = Typography;

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [completingOrderId, setCompletingOrderId] = useState<string | null>(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [requestParam, setRequestParam] = useState({
    page: currentPage,
    limit: pageSize,
    order_id: "",
    status: "",
  });

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setRequestParam({
      ...requestParam,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const fetchOrders = async (params: any) => {
    setLoading(true);
    try {
      const response = await OrderService.getOrdersBasedOnUse(params);
      const { data } = response.data;
      setOrders(data.data || []);
      setTotalOrders(data.total || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(requestParam);
  }, [requestParam]);

  const handleSearch = (value: string) => {
    setRequestParam((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
    setCurrentPage(1);
  };

  const handleViewOrderDetails = async (order: IOrder) => {
    setSelectedOrder(order);
    setIsDetailModalVisible(true);
    setModalLoading(true);

    try {
      // Fetch order items for this order
      const response = await OrderService.getOrderDetails(order.order_id);
      setOrderItems(response.data.data.orderItems);
    } catch (error) {
      console.error("Error fetching order items:", error);
      message.error("Failed to fetch order details");
      setOrderItems([]);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const handleCompleteOrder = async (orderId: string) => {
    Modal.confirm({
      title: 'Complete Order',
      content: 'Are you sure you want to mark this order as completed? This action cannot be undone.',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      okText: 'Yes, Complete',
      cancelText: 'Cancel',
      okType: 'primary',
      onOk: async () => {
        setCompletingOrderId(orderId);
        try {
          await OrderService.completedOrderByUser(orderId, OrderStatus.COMPLETED);
          message.success("Order marked as completed successfully!");
          // Refresh the orders list
          await fetchOrders(requestParam);
        } catch (error: any) {
          console.error("Error completing order:", error);
          const errorMessage = error?.response?.data?.message || "Failed to complete order. Please try again.";
          message.error(errorMessage);
        } finally {
          setCompletingOrderId(null);
        }
      }
    });
  };

  // Status configuration for orders
  const orderStatusConfig = {
    [OrderStatus.PENDING]: { color: "orange", label: "Pending" },
    [OrderStatus.PAID]: { color: "green", label: "Paid" },
    [OrderStatus.CANCELLED]: { color: "red", label: "Cancelled" },
    [OrderStatus.COMPLETED]: { color: "blue", label: "Completed" },
  };

  const orderTypeConfig = {
    [OrderType.PRODUCT]: {
      color: "blue",
      label: "Product",
      icon: <ShoppingCartOutlined />,
    },
    [OrderType.SERVICE]: {
      color: "purple",
      label: "Service",
      icon: <UserOutlined />,
    },
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (orderId: string) => <Text code>{orderId.slice(-8)}</Text>,
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "customer",
      render: (user: any) => (
        <div>
          <div>
            <Text strong>
              {user?.firstName + " " + user?.lastName || "N/A"}
            </Text>
          </div>
          <div>
            <Text type="secondary">{user?.email || ""}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Order Type",
      dataIndex: "order_type",
      key: "order_type",
      render: (type: OrderType) => {
        const config = orderTypeConfig[type];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {config?.label || type}
          </Tag>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => {
        const config = orderStatusConfig[status];
        return <Tag color={config?.color}>{config?.label || status}</Tag>;
      },
    },
    {
      title: "Service Fee",
      dataIndex: "service_fee",
      key: "service_fee",
      render: () => <Text>10%</Text>,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <Text type="secondary">{new Date(date).toLocaleTimeString()}</Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IOrder) => (
        <div className="gap-2 flex items-center">
          <Tooltip title="View order details">
            <Button
              icon={<EyeOutlined />}
              type="default"
              onClick={() => handleViewOrderDetails(record)}
            />
          </Tooltip>
          {record.status === OrderStatus.PAID && (
            <Tooltip title="Mark this order as completed">
              <Button
                icon={<CheckCircleOutlined />}
                type="primary"
                onClick={() => handleCompleteOrder(record.order_id)}
                loading={completingOrderId === record.order_id}
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              >
                Complete
              </Button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  // Order items table columns
  const orderItemsColumns = [
    {
      title: "Item",
      key: "item",
      render: (_: any, record: IOrderItem) => (
        <div>
          <Text strong>
            {record.product?.name || record.service?.name || "Unknown Item"}
          </Text>
          <br />
          <Text type="secondary">{record.product ? "Product" : "Service"}</Text>
        </div>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price: number) => `${formatCurrency(price)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_: any, record: IOrderItem) => (
        <Text strong>{formatCurrency(record.unitPrice * record.quantity)}</Text>
      ),
    },
  ];

  return (
    <div>
      <style jsx>{`
        .order-row-paid {
          background-color: #f6ffed !important;
          border-left: 3px solid #52c41a;
        }
        .order-row-paid:hover {
          background-color: #f0f9ff !important;
        }
      `}</style>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Orders History</Title>
        <Text type="secondary">
          View and manage all orders for your services and products.
        </Text>
      </div>

      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Search
          placeholder="Search by customer name or order ID"
          onSearch={handleSearch}
          style={{ width: 400 }}
          allowClear
        />
        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#666' }}>
          <Text type="secondary">
            💡 Tip: Only orders with &quot;Paid&quot; status can be marked as completed
          </Text>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="order_id"
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalOrders,
            showSizeChanger: true,
          }}
          rowClassName={(record) => 
            record.status === OrderStatus.PAID ? 'order-row-paid' : ''
          }
        />
      </Spin>

      {/* Order Details Modal */}
      <Modal
        title={
          <Space>
            <ShoppingCartOutlined />
            <span>Order Details</span>
            {selectedOrder && (
              <Tag color="blue">#{selectedOrder.order_id.slice(-8)}</Tag>
            )}
          </Space>
        }
        open={isDetailModalVisible}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="close" onClick={handleDetailCancel}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <div>
            {/* Order Information */}
            {/* <Card title="Order Information" style={{ marginBottom: 16 }}>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Order ID" span={1}>
                  <Text code>{selectedOrder.order_id}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Order Type" span={1}>
                  <Tag 
                    color={orderTypeConfig[selectedOrder.order_type]?.color}
                    icon={orderTypeConfig[selectedOrder.order_type]?.icon}
                  >
                    {orderTypeConfig[selectedOrder.order_type]?.label}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Customer" span={1}>
                  <div>
                    <div><Text strong>{selectedOrder.user?.name || "N/A"}</Text></div>
                    <div><Text type="secondary">{selectedOrder.user?.email || ""}</Text></div>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                  <Tag color={orderStatusConfig[selectedOrder.status]?.color}>
                    {orderStatusConfig[selectedOrder.status]?.label}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Order Date" span={1}>
                  <Space direction="vertical" size={0}>
                    <Text><CalendarOutlined /> {new Date(selectedOrder.createdAt).toLocaleDateString()}</Text>
                    <Text type="secondary">{new Date(selectedOrder.createdAt).toLocaleTimeString()}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Total Amount" span={1}>
                  <Text strong style={{ color: "#52c41a", fontSize: "16px" }}>
                    <DollarOutlined /> {selectedOrder.totalAmount?.toLocaleString()} VND
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Card> */}

            {/* Order Items */}
            <Card>
              <Spin spinning={modalLoading}>
                <Table
                  columns={orderItemsColumns}
                  dataSource={orderItems}
                  rowKey="order_item_id"
                  pagination={false}
                  size="small"
                />
              </Spin>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;
