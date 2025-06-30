"use client";
import { API_URL } from "@/constant/url";
import CategoryService from "@/services/category.service";
import ServiceService from "@/services/service.service";
import { IService, ServiceStatus } from "@/types/service.interface";
import { openNotificationWithIcon } from "@/ultils/notification";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Image as AntImage,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
  Upload,
  message
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const { Search } = Input;
const { Option } = Select;

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [editingService, setEditingService] =
    useState<Partial<IService> | null>(null);
  const [viewingService, setViewingService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalServices, setTotalServices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [categories, setCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form] = Form.useForm();

  const [requestParam, setRequestParam] = useState({
    page: currentPage,
    limit: pageSize,
    name: "",
    category_id: "",
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

  const fetchServices = async (params: any) => {
    setLoading(true);
    try {
      const response = await ServiceService.getService(params);
      const { data } = response.data;
      setServices(data.data);
      setTotalServices(data.total);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategoryService();
      const { data } = response.data;
      setCategories(data.data || []);
      console.log("Fetched categories:", data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchServices(requestParam);
    fetchCategories();
  }, [requestParam]);

  const handleSearch = (value: string) => {
    setRequestParam((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleAddEditService = (service?: IService) => {
    if (service) {
      setEditingService(service);
      form.setFieldsValue({
        name: service.name,
        description: service.description,
        price: service.price,
        category_id: service.category_id,
        duration: service.duration?.minutes || 60,
      });
      if (service.image) {
        setImagePreview(`${API_URL}${service.image}`);
      }
    } else {
      setEditingService(null);
      form.resetFields();
      setImagePreview("");
      setImageFile(null);
    }
    setIsModalVisible(true);
  };

  const handleViewService = (service: IService) => {
    setViewingService(service);
    setIsDetailModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingService(null);
    form.resetFields();
    setImagePreview("");
    setImageFile(null);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setViewingService(null);
  };

  const createFormData = (values: any): FormData => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("price", values.price.toString());
    formData.append("category_id", values.category_id);
    formData.append("duration", values.duration?.toString() || "60");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const formData = createFormData(values);

      if (editingService) {
        await ServiceService.updateService(
          editingService.service_id!,
          formData
        );
        openNotificationWithIcon(
          "success",
          "Cập nhật dịch vụ thành công!",
          "Dịch vụ đã được cập nhật thành công."
        );
      } else {
        await ServiceService.createService(formData);
        openNotificationWithIcon(
          "success",
          "Cập nhật dịch vụ thành công!",
          "Dịch vụ đã được cập nhật thành công."
        );
      }

      setIsModalVisible(false);
      form.resetFields();
      setImagePreview("");
      setImageFile(null);
      fetchServices(requestParam);
    } catch (error) {
      console.error("Error saving service:", error);
      message.error(
        editingService ? "Lỗi khi cập nhật dịch vụ!" : "Lỗi khi tạo dịch vụ!"
      );
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await ServiceService.deleteService(id);
      message.success("Xóa dịch vụ thành công!");
      fetchServices(requestParam);
    } catch (error) {
      console.error("Error deleting service:", error);}
  };

  // const handleStatusChange = async (
  //   service: IService,
  //   status: ServiceStatus
  // ) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("status", status);

  //     await ServiceService.updateService(service.service_id, formData);
  //     openNotificationWithIcon(
  //       "success",
  //       "Cập nhật trạng thái thành công!",
  //       `Trạng thái dịch vụ đã được cập nhật thành công thành ${status}.`
  //     );
  //     fetchServices(requestParam);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     message.error("Lỗi khi thay đổi trạng thái!");
  //   }
  // };

  const handleImageUpload: UploadProps["customRequest"] = (options) => {
    const { file } = options;
    setImageFile(file as File);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file as File);

    // Call success to mark upload as complete
    options.onSuccess?.("ok");
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ có thể upload file hình ảnh!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Hình ảnh phải nhỏ hơn 5MB!");
      return false;
    }

    return true;
  };

  // Thêm object để map status với màu sắc và icon tương ứng
  const statusConfig = {
    // [ServiceStatus.NEW]: { color: "blue", label: "New" },
    // [ServiceStatus.PENDING]: { color: "orange", label: "Pending" },
    [ServiceStatus.ACTIVE]: { color: "green", label: "Active" },
    // [ServiceStatus.APPROVED]: { color: "cyan", label: "Approved" },
    // [ServiceStatus.REJECTED]: { color: "red", label: "Rejected" },
    [ServiceStatus.INACTIVE]: { color: "default", label: "Inactive" },
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          src={
            image
              ? `${API_URL}${image}`
              : "https://placeholder.com/150"
          }
          alt="service"
          width={100}
          height={100}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: { name: string }) => {
        return category ? category.name : "N/A";
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: ServiceStatus) => {
        const config = statusConfig[status];
        return (
          <Tag
            color={config.color}
            style={{ minWidth: 80, textAlign: "center" }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    // {
    //   title: "Enable",
    //   dataIndex: "enable",
    //   key: "enable",
    //   render: (_: boolean, record: IService) => (
    //     <Switch
    //       checked={record.status === ServiceStatus.ACTIVE} // Kiểm tra trạng thái hiện tại
    //       onChange={() =>
    //         handleStatusChange(
    //           record,
    //           record.status === ServiceStatus.ACTIVE
    //             ? ServiceStatus.INACTIVE
    //             : ServiceStatus.ACTIVE
    //         )
    //       }
    //       checkedChildren="Active"
    //       unCheckedChildren="Inactive"
    //     />
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IService) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewService(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleAddEditService(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => handleDeleteService(record.service_id)}
            style={{ marginRight: 8 }}
          />
        </>
      ),
    },
  ];

  // if (loading) {
  //   return <LoadingSpin spinning={loading} />;
  // }

  return (
    <div >
      <div>
        <h1 className="text-4xl mb-4" >Service Management</h1>
        <p className="mb-4">Manage your services, and more.</p>
      </div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleAddEditService()}
          disabled={loading}
        >
          Add Service
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="service_id"
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize,
          total: totalServices,
          showSizeChanger: true,
        }}
      />

      <Modal
        title={editingService ? "Edit Service" : "Add Service"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter service name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Price (VND)"
            name="price"
            rules={[{ required: true, message: "Please enter price!" }]}
          >
            <InputNumber<number>
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value ? Number(value.replace(/\$\s?|(,*)/g, "")) : 0
              }
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: true, message: "Please enter duration!" }]}
          >
            <InputNumber<number>
              style={{ width: "100%" }}
              min={1}
              max={480}
              placeholder="Duration in minutes"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Service Image">
            <Upload
              customRequest={handleImageUpload}
              beforeUpload={beforeUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {imagePreview && (
              <div style={{ marginTop: 10 }}>
                <AntImage
                  width={200}
                  height={150}
                  src={imagePreview}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingService ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Service Details"
        open={isDetailModalVisible}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="close" onClick={handleDetailCancel}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {viewingService && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <strong>Image:</strong>
              <div style={{ marginTop: 8 }}>
                <AntImage
                  width={300}
                  height={200}
                  src={
                    viewingService.image
                      ? `${API_URL}${viewingService.image}`
                      : "https://placeholder.com/300x200"
                  }
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Name:</strong> {viewingService.name}
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Description:</strong> {viewingService.description}
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Price:</strong> {viewingService.price?.toLocaleString()}{" "}
              VND
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Duration:</strong>{" "}
              {viewingService.duration?.minutes || "N/A"} minutes
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Category:</strong>{" "}
              {viewingService.category?.name || "N/A"}
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Status:</strong>{" "}
              <Tag color={statusConfig[viewingService.status]?.color}>
                {statusConfig[viewingService.status]?.label}
              </Tag>
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>Created:</strong>{" "}
              {new Date(viewingService.createdAt).toLocaleDateString()}
            </div>

            <div>
              <strong>Updated:</strong>{" "}
              {new Date(viewingService.updatedAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServicePage;
