import {
  BookingRequestBody,
  BookingRequestPram,
  BookingStatus,
} from "@/types/booking.interface";
import { BaseService } from "./base.service";

const BookingService = {
  bookingWithPayment: async (body?: BookingRequestBody) => {
    return await BaseService.post({
      url: "/service-bookings/create-with-payment",
      payload: body,
    });
  },
  getBookingByOrderId: async (orderId: string) => {
    return await BaseService.get({
      url: `/service-bookings/order/${orderId}`,
    });
  },
  getAllBookingBasedOnUser: async (params?: BookingRequestPram) => {
    return await BaseService.get({
      url: `/service-bookings`,
      payload: params,
    });
  },
  deleteBookingService: async (bookingId: string) => {
    return await BaseService.delete({
      url: `/service-bookings/${bookingId}`,
    });
  },
  updateBookingStatus: async (bookingId: string, status: BookingStatus) => {
    return await BaseService.patch({
      url: `/service-bookings/${bookingId}`,
      payload: { status },
    });
  },
};
export default BookingService;
