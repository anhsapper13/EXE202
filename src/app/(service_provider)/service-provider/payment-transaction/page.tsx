"use client";
import { PaymentTransactionService } from "@/services/payment-transaction.service";
import { IPaymentTransaction, PaymentMethod, PaymentStatus } from "@/types/payment-transaction.interface";
import { formatCurrency } from "@/ultils/formatters";
import {
  CalendarOutlined,
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const PaymentTransactionHistory: React.FC = () => {
  const [payments, setPayments] = useState<IPaymentTransaction[]>([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<IPaymentTransaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [requestParam, setRequestParam] = useState({
    page: currentPage,
    limit: pageSize,
    order_id: "",
    payment_method: "",
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

  const fetchPayments = async (params: any) => {
    setLoading(true);
    try {
      const response = await PaymentTransactionService.getPaymentTransactionsBasedOnUse(params);
      const { data } = response.data;
      setPayments(data.data || []);
      setTotalPayments(data.total || 0);
    } catch (error) {
      console.error("Error fetching payments:", error);
      message.error("Failed to fetch payment transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(requestParam);
  }, [requestParam]);

  const handleOrderIdSearch = (value: string) => {
    setRequestParam((prev) => ({
      ...prev,
      order_id: value,
      page: 1,
    }));
    setCurrentPage(1);
  };

  const handlePaymentMethodChange = (value: string) => {
    setRequestParam((prev) => ({
      ...prev,
      payment_method: value,
      page: 1,
    }));
    setCurrentPage(1);
  };

  const handlePaymentStatusChange = (value: string) => {
    setRequestParam((prev) => ({
      ...prev,
      status: value,
      page: 1,
    }));
    setCurrentPage(1);
  };

  const handleViewPaymentDetails = async (payment: IPaymentTransaction) => {
    setSelectedPayment(payment);
    setIsDetailModalVisible(true);
    setModalLoading(true);
    
    try {
      // Fetch detailed payment information
      const response = await PaymentTransactionService.getPaymentTransactionDetails(payment.payment_id);
      setSelectedPayment(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      message.error("Failed to fetch payment details");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedPayment(null);
  };

  const handleClearFilters = () => {
    setRequestParam({
      page: 1,
      limit: pageSize,
      order_id: "",
      payment_method: "",
      status: "",
    });
    setCurrentPage(1);
  };

  // Status configuration for payments
  const paymentStatusConfig = {
    [PaymentStatus.PENDING]: { color: "orange", label: "Pending" },
    [PaymentStatus.COMPLETED]: { color: "green", label: "Completed" },
    [PaymentStatus.FAILED]: { color: "red", label: "Failed" },
  };

  const paymentMethodConfig = {
    [PaymentMethod.CREDIT_CARD]: { color: "blue", label: "Credit Card", icon: <CreditCardOutlined /> },
    [PaymentMethod.PAYPAL]: { color: "purple", label: "PayPal", icon: <DollarOutlined /> },
    [PaymentMethod.BANK_TRANSFER]: { color: "cyan", label: "Bank Transfer", icon: <UserOutlined /> },
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (orderId: string) => (
        <Text code>{orderId.slice(-8)}</Text>
      ),
    },
    {
      title: "Customer",
      dataIndex: ["order", "user"],
      key: "customer",
      render: (user: any) => (
        <div>
          <div><Text strong>{user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name}</Text></div>
          <div><Text type="secondary">{user?.email || ""}</Text></div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method: PaymentMethod) => {
        const config = paymentMethodConfig[method];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {config?.label || method}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: PaymentStatus) => {
        const config = paymentStatusConfig[status];
        return (
          <Tag color={config?.color}>
            {config?.label || status}
          </Tag>
        );
      },
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <Text type="secondary">
            {new Date(date).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IPaymentTransaction) => (
        <Button
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => handleViewPaymentDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Payment Transaction History</Title>
        <Text type="secondary">
          View and manage all payment transactions for your services and products.
        </Text>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Order ID">
            <Search
              placeholder="Search by order ID"
              onSearch={handleOrderIdSearch}
              style={{ width: 250 }}
              allowClear
              value={requestParam.order_id}
            //   onChange={(e) => setRequestParam(prev => ({ ...prev, order_id: e.target.value }))}
            />
          </Form.Item>
          
          <Form.Item label="Payment Method">
            <Select
              style={{ width: 200 }}
              placeholder="Select payment method"
              value={requestParam.payment_method || undefined}
              onChange={handlePaymentMethodChange}
              allowClear
            >
              <Option value={PaymentMethod.CREDIT_CARD}>Credit Card</Option>
              <Option value={PaymentMethod.PAYPAL}>PayPal</Option>
              <Option value={PaymentMethod.BANK_TRANSFER}>Bank Transfer</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Payment Status">
            <Select
              style={{ width: 150 }}
              placeholder="Select status"
              value={requestParam.status || undefined}
              onChange={handlePaymentStatusChange}
              allowClear
            >
              <Option value={PaymentStatus.PENDING}>Pending</Option>
              <Option value={PaymentStatus.COMPLETED}>Completed</Option>
              <Option value={PaymentStatus.FAILED}>Failed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={payments}
          rowKey="payment_id"
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalPayments,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} payments`,
          }}
        />
      </Spin>

      {/* Payment Details Modal */}
      <Modal
        title={
          <Space>
            <CreditCardOutlined />
            <span>Payment Transaction Details</span>
            {selectedPayment && (
              <Tag color="blue">#{selectedPayment.payment_id.slice(-8)}</Tag>
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
        {selectedPayment && (
          <Spin spinning={modalLoading}>
            <div>
              {/* Payment Information */}
              <Card style={{ marginBottom: 16 }}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Payment ID" span={1}>
                    <Text code>{selectedPayment.payment_id}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Transaction ID" span={1}>
                    <Text code>{selectedPayment.transaction_id || "N/A"}</Text>
                  </Descriptions.Item>
                   <Descriptions.Item label="Receive Money" span={1}>
                    <Text strong style={{ color: "#52c41a", fontSize: "16px" }}>
                   {selectedPayment.order?.provider?.companyName }
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount" span={1}>
                    <Text strong style={{ color: "#52c41a", fontSize: "16px" }}>
                      <DollarOutlined /> {formatCurrency(selectedPayment.amount)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Method" span={1}>
                    <Tag 
                      color={paymentMethodConfig[selectedPayment.payment_method]?.color}
                      icon={paymentMethodConfig[selectedPayment.payment_method]?.icon}
                    >
                      {paymentMethodConfig[selectedPayment.payment_method]?.label}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Status" span={1}>
                    <Tag color={paymentStatusConfig[selectedPayment.paymentStatus as PaymentStatus]?.color}>
                      {paymentStatusConfig[selectedPayment.paymentStatus as PaymentStatus]?.label}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Date" span={1}>
                    <Space direction="vertical" size={0}>
                      <Text><CalendarOutlined /> {new Date(selectedPayment.createdAt).toLocaleDateString()}</Text>
                      <Text type="secondary">{new Date(selectedPayment.createdAt).toLocaleTimeString()}</Text>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Escrow Information */}
              {selectedPayment.escrow && selectedPayment.escrow.length > 0 && (
                <Card title="Escrow Information">
                  <Table
                    dataSource={selectedPayment.escrow}
                    rowKey="escrow_id"
                    pagination={false}
                    size="small"
                    columns={[
                      {
                        title: "Escrow ID",
                        dataIndex: "escrow_id",
                        key: "escrow_id",
                        render: (id: string) => <Text code>{id.slice(-8)}</Text>,
                      },
                      {
                        title: "Amount",
                        dataIndex: "amount",
                        key: "amount",
                        render: (amount: number) => `${amount?.toLocaleString()} VND`,
                      },
                      {
                        title: "Created Date",
                        dataIndex: "createdAt",
                        key: "createdAt",
                        render: (date: string) => new Date(date).toLocaleDateString(),
                      },
                    ]}
                  />
                </Card>
              )}
            </div>
          </Spin>
        )}
      </Modal>
    </div>
  );
};

export default PaymentTransactionHistory;
