"use client";
import { UpdateUserProfileRequest, UserService } from "@/services/user.service";
import { User } from "@/types/user.type";
import {
  CalendarOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  EditOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { FormInstance, UploadProps } from "antd";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  message,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  Upload,
} from "antd";
import { useEffect, useRef, useState } from "react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [form] = Form.useForm<UpdateUserProfileRequest>();

  const formRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUserProfile();
        const userData = response.data.data || response.data;
        setUser(userData as User);

        // Delay until form rendered
        if (formRef.current) {
          form.setFieldsValue(userData);
        } else {
          setTimeout(() => form.setFieldsValue(userData), 0);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        message.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [form]);

  const handleUpdateProfile = async (values: UpdateUserProfileRequest) => {
    setLoading(true);
    try {
      const response = await UserService.updateUserProfile(values);
      const updatedUser = response.data.data || response.data;
      setUser(updatedUser as User);
      setEditMode(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    setAvatarLoading(true);
    try {
      const response = await UserService.uploadAvatar(file as File);
      const avatarUrl =
        (response.data as any).avatar_url || (response.data as any).avatar;

      // Update user avatar
      if (user) {
        setUser({ ...user, avatar: avatarUrl });
      }

      message.success("Avatar uploaded successfully!");
      onSuccess?.(response);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      message.error("Failed to upload avatar");
      onError?.(error as Error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const roleConfig = {
    service_provider: { color: "blue", label: "Service Provider" },
    customer: { color: "green", label: "Customer" },
    product_provider: { color: "purple", label: "Product Provider" },
    admin: { color: "red", label: "Admin" },
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200 }}>
      <Card>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Space direction="vertical" size="large">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    size={120}
                    src={user.avatar}
                    icon={<UserOutlined />}
                    style={{ border: "4px solid #f0f0f0" }}
                  />
                  <Upload
                    showUploadList={false}
                    customRequest={handleAvatarUpload}
                    accept="image/*"
                  >
                    <Button
                      icon={<CameraOutlined />}
                      loading={avatarLoading}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        padding: 0,
                      }}
                    />
                  </Upload>
                </div>

                <div>
                  <Title level={2} style={{ margin: 0 }}>
                    {user.firstName} {user.lastName}
                  </Title>
                  <Space>
                    <Tag
                      color={
                        roleConfig[user.role as keyof typeof roleConfig]?.color
                      }
                      style={{ marginTop: 8 }}
                    >
                      {roleConfig[user.role as keyof typeof roleConfig]?.label}
                    </Tag>
                    {user.isVerified && (
                      <Tag color="green" icon={<CheckCircleOutlined />}>
                        Verified
                      </Tag>
                    )}
                  </Space>
                </div>
              </Space>
            </div>
          </Col>

          {/* Profile Information */}
          <Col span={24}>
            <Card
              title={
                <Space>
                  <UserOutlined />
                  <span>Profile Information</span>
                </Space>
              }
              extra={
                <Button
                  type={editMode ? "default" : "primary"}
                  icon={editMode ? <SaveOutlined /> : <EditOutlined />}
                  onClick={() => {
                    if (editMode) {
                      form.submit();
                    } else {
                      setEditMode(true);
                    }
                  }}
                  loading={loading}
                >
                  {editMode ? "Save Changes" : "Edit Profile"}
                </Button>
              }
            >
              {editMode ? (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                  initialValues={user}
                  ref={formRef}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter first name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your last name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter last name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Company Name" name="companyName">
                        <Input placeholder="Enter company name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Age" name="age">
                        <Input placeholder="Enter age" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Phone Number" name="phone">
                    <Input placeholder="Enter phone number" />
                  </Form.Item>

                  <Form.Item label="Address" name="address">
                    <Input placeholder="Enter address" />
                  </Form.Item>

                  <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Tell us about yourself" />
                  </Form.Item>

                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Save Changes
                    </Button>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                  </Space>
                </Form>
              ) : (
                <div>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item
                      label={
                        <>
                          <MailOutlined /> Email
                        </>
                      }
                    >
                      {user.email}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <>
                          <PhoneOutlined /> Phone
                        </>
                      }
                    >
                      {user.phone || "Not provided"}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <>
                          <TeamOutlined /> Company
                        </>
                      }
                    >
                      {user.companyName || "Not provided"}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <>
                          <CalendarOutlined /> Age
                        </>
                      }
                    >
                      {user.age || "Not provided"}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <>
                          <HomeOutlined /> Address
                        </>
                      }
                    >
                      {user.address || "Not provided"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Verification Status">
                      {user.isVerified ? (
                        <Tag color="green" icon={<CheckCircleOutlined />}>
                          Verified
                        </Tag>
                      ) : (
                        <Tag color="orange">Pending Verification</Tag>
                      )}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={
                        <>
                          <DollarOutlined /> Balance
                        </>
                      }
                    >
                      <Text strong style={{ color: "#52c41a" }}>
                        {parseFloat(String(user.balance || 0)).toLocaleString()}{" "}
                        VND
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      <div style={{ whiteSpace: "pre-wrap" }}>
                        {user.description || "No description provided"}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;
