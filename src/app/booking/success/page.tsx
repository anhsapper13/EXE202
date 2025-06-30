"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookingService from "@/services/booking.service";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get("vnp_TxnRef");
    
    if (orderId) {
      fetchBookingDetails(orderId);
    } else {
      // Check localStorage for pending booking
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        const booking = JSON.parse(pendingBooking);
        setBookingDetails(booking);
        // Clear the pending booking
        localStorage.removeItem("pendingBooking");
      }
      setLoading(false);
    }
  }, [searchParams]);

  const fetchBookingDetails = async (orderId: string) => {
    try {
      const response = await BookingService.getBookingByOrderId(orderId);
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Payment Successful!
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Your booking has been confirmed and payment processed successfully.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {bookingDetails && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono">{bookingDetails.orderId || bookingDetails.order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-mono">{bookingDetails.bookingId || bookingDetails.booking_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span>{bookingDetails.serviceName || "Pet Service"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-semibold">{bookingDetails.totalPrice?.toLocaleString() || "N/A"} VND</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">What&apos;s Next?</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    You will receive a confirmation email shortly
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    The service provider will contact you before the appointment
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Please be available at the scheduled time
                  </li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={() => router.push("/pet-service")} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Book Another Service
                </Button>
                <Button 
                  onClick={() => router.push("/")} 
                  variant="outline" 
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
