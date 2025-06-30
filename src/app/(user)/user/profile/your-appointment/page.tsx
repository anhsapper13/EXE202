"use client";
import PaginationCustom from "@/components/common/PaginationCustom";
import BookingService from "@/services/booking.service";
import {
  BookingRequestPram,
  BookingStatus,
  IBooking,
} from "@/types/booking.interface";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Modal,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  AlertCircle,
  Calendar,
  Check,
  Eye,
  Search,
  Trash2,
  XCircle
} from "lucide-react";
import React, { useEffect, useState } from "react";

// Initialize dayjs plugins
dayjs.extend(utc);

// Set default timezone to UTC+7

const { Title: AntTitle } = Typography;

const Booking: React.FC = () => {
  const [bookings, setBooking] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [detailBooking, setDetailBooking] = useState<IBooking | null>(null);

  const [requestParam, setRequestParam] = useState<BookingRequestPram>({
    page: currentPage,
    limit: pageSize,
    status: "",
  });

  const fetchBooking = async (params: BookingRequestPram) => {
    setLoading(true);
    try {
      const response = await BookingService.getAllBookingBasedOnUser(params);
      const { data } = response;
      //sort by created date
      setBooking(data?.data.data || []);
      setTotalItems(data?.data.total || 0);
    } catch (error) {
      console.log("error", error);
      // Set to empty array on error to prevent undefined
      setBooking([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking(requestParam);
  }, [requestParam]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    setRequestParam({
      ...requestParam,
      title: value,
      page: 1,
    });
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setRequestParam({
      ...requestParam,
      status,
      page: 1,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    setRequestParam({
      ...requestParam,
      page: page,
      limit: pageSize,
    });
  };

  const handleDeleteClick = (id: string) => {
    setBookingToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (bookingToDelete) {
      try {
        await BookingService.deleteBookingService(bookingToDelete);
        fetchBooking(requestParam);
        setDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const handleChangeStatusBooking = async (
    id: string,
    status: BookingStatus
  ) => {
    try {
      await BookingService.updateBookingStatus(id, status);
      // Refresh bookings after update
      await fetchBooking(requestParam);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Handle view detail click
  const handleViewDetailClick = (booking: IBooking) => {
    setDetailBooking(booking);
    setIsDetailModalVisible(true);
  };

  // Function to get status badge color - Adding this function if it doesn't exist
  const getStatusBadgeColor = (status?: string) => {
    const colorMap: Record<string, string> = {
      pending: "orange",
      confirmed: "blue",
      completed: "green",
      cancelled: "red",
    };

    return colorMap[status || ""] || "default";
  };

  // Find the function that formats dates and modify it to handle UTC properly
  const formatDisplayDate = (date: string | Date) => {
    if (!date) return "Not specified";

    // Create a date object from the input
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Format the date part
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format the time part using UTC hours
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const displayHours = hours.toString().padStart(2, "0"); // 24-hour format
    const displayMinutes = minutes.toString().padStart(2, "0");
    const timeStr = `${displayHours}:${displayMinutes}`; // 24-hour format (e.g., "13:00")

    return `${dateFormatter.format(dateObj)} at ${timeStr}`;
  };

  // If there's another place showing the time incorrectly, find and fix that too
  // For example, if there's a detailModal showing the meeting time
  const renderBookingTime = (dateTime: string | Date) => {
    if (!dateTime) return "Not specified";

    const dateObj =
      typeof dateTime === "string" ? new Date(dateTime) : dateTime;

    // Use UTC hours to ensure correct display regardless of local timezone
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
  };

  return (
    <div className="max-w-full !m-0 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Booking</h1>
        <p className="text-gray-600">
          Manage and track all your scheduled bookings
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchText}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusFilter("")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusFilter("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStatusFilter("confirmed")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === "confirmed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => handleStatusFilter("cancelled")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === "cancelled"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {booking.service.name || "No service specified"}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {booking.description || "No description provided"}
                </p>

                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {booking.bookingTime
                      ? formatDisplayDate(booking.bookingTime)
                      : "No date/time specified"}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                {/* View Details button - always visible for all booking statuses */}
                <button
                  className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
                  onClick={() => handleViewDetailClick(booking)}
                  title="View details"
                >
                  <Eye className="h-5 w-5" />
                </button>

                {booking.status === "pending" && (
                  <>
                    <button
                      className="p-2 rounded-full text-green-500 hover:bg-green-100 transition-colors"
                      onClick={() =>
                        handleChangeStatusBooking(
                          booking.booking_id,
                          BookingStatus.COMPLETED
                        )
                      }
                      title="Complete booking"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 rounded-full text-orange-500 hover:bg-orange-100 transition-colors"
                      onClick={() =>
                        handleChangeStatusBooking(
                          booking.booking_id,
                          BookingStatus.CANCELLED
                        )
                      }
                      title="Cancel booking"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </>
                )}


                <button
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                  onClick={() => handleDeleteClick(booking.booking_id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">
            No bookings found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <PaginationCustom
        totalItems={totalItems}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Confirm Deletion
            </h3>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Date Modal */}

      <Modal
        title={
          <div className="flex items-center gap-3">
            <AntTitle level={4} className="!mb-0">
              Booking Details
            </AntTitle>

            {detailBooking && (
              <div>
                <Tag
                  color={getStatusBadgeColor(detailBooking.status)}
                  className="uppercase"
                >
                  {detailBooking.status}
                </Tag>
                <Tag
                  color={getStatusBadgeColor(detailBooking.booking_id)}
                  className="uppercase"
                >
                  {detailBooking.booking_id}
                </Tag>
              </div>
            )}
          </div>
        }
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
        className="booking-detail-modal"
      >
        {detailBooking && (
          <div className="space-y-6">
            <Divider orientation="left">
              <p className="font-bold mb-0">Client Information</p>
            </Divider>
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="ID">
                {detailBooking.user?.firstName + " " + detailBooking.user?.lastName  || "Nguyen Truong Anh"}
              </Descriptions.Item>
                            <Descriptions.Item label="ID">
                {detailBooking.pet?.name || "Nguyen Truong Anh"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Phone">
                {detailBooking.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {detailBooking.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {typeof detailBooking.user_id === "object"
                    ? (detailBooking.user_id as any)._id
                    : String(detailBooking.user_id)}
                </p>
              </Descriptions.Item> */}
            </Descriptions>

            <Divider orientation="left">
              <p className="font-bold mb-0">Service Information</p>
            </Divider>
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Service">
                {typeof detailBooking.service.name === "string"
                  ? detailBooking.service.name
                  : "Not specified"}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {typeof detailBooking.service.price === "string"
                  ? detailBooking.service.price
                  : "Not specified"}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">
              <p className="font-bold mb-0">Booking Details</p>
            </Divider>
            <Descriptions
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Date & Time">
                {detailBooking.bookingTime ? (
                  <p>{renderBookingTime(detailBooking.bookingTime)}</p>
                ) : (
                  <p className="text-gray-500">Not scheduled</p>
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Order ID">
                <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {typeof detailBooking.order_item_id === "object"
                    ? (detailBooking.order_item_id as any)._id
                    : detailBooking.order_item_id || "No order linked"}
                </p>
              </Descriptions.Item>
            </Descriptions>

            <>
              <Card className="bg-gray-50">
               
                  <div className="mb-4">
                    <p className="font-bold mb-0">Notes</p>
                    <p>{detailBooking.description || "No description provided"}</p>
                  </div>
               
                {/* {detailBooking.comment && (
                  <div>
                    <p className="font-bold block mb-2">Comments</p>
                    <p>{detailBooking.comment}</p>
                  </div>
                )} */}
              </Card>
            </>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
