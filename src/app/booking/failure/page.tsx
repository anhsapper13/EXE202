"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RotateCcw, Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentFailurePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<{
    message?: string;
    code?: string;
  }>({});

  useEffect(() => {
    // Extract error information from search params
    const errorCode = searchParams.get("vnp_ResponseCode");
    
    let message = "Payment was not completed successfully.";
    
    if (errorCode === "24") {
      message = "Transaction was cancelled by user.";
    } else if (errorCode === "15") {
      message = "Incorrect OTP or authentication failed.";
    } else if (errorCode === "51") {
      message = "Insufficient account balance.";
    } else if (errorCode === "65") {
      message = "Daily transaction limit exceeded.";
    } else if (errorCode && errorCode !== "00") {
      message = "Payment failed due to technical issues.";
    }
    
    setErrorDetails({
      message,
      code: errorCode || undefined,
    });
  }, [searchParams]);

  const handleRetryPayment = () => {
    // Get the service ID from pending booking if available
    const pendingBooking = localStorage.getItem("pendingBooking");
    if (pendingBooking) {
      const booking = JSON.parse(pendingBooking);
      router.push(`/booking/${booking.serviceId}`);
    } else {
      router.push("/pet-service");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Payment Failed
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {errorDetails.message}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {errorDetails.code && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Error Details</h3>
                  <p className="text-sm text-red-700">
                    Error Code: {errorDetails.code}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">What You Can Do</h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Check your account balance and try again</li>
                  <li>• Verify your banking credentials</li>
                  <li>• Contact your bank if the issue persists</li>
                  <li>• Try a different payment method</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={handleRetryPayment}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => router.push("/pet-service")} 
                  variant="outline" 
                  className="w-full"
                >
                  Browse Services
                </Button>
                <Button 
                  onClick={() => router.push("/")} 
                  variant="ghost" 
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
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

export default PaymentFailurePage;
