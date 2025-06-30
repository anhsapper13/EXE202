"use client";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import BookingService from "@/services/booking.service";
import ServiceService from "@/services/service.service";
import { BookingRequestBody } from "@/types/booking.interface";
import { IService } from "@/types/service.interface";
import { openNotificationWithIcon } from "@/ultils/notification";
import { DatePicker, DatePickerProps } from "antd";
import { CreditCard, Loader2, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useMemo, useState } from "react";
import useSWR from "swr";
// import { z } from "zod";

// Form validation schema
// const bookingFormSchema = z.object({
//   petName: z.string().min(1, "Pet name is required"),
//   petCount: z
//     .number()
//     .min(1, "At least 1 pet required")
//     .max(10, "Maximum 10 pets allowed"),
//   petType: z.string().min(1, "Pet type is required"),
//   petBreed: z.string().optional(),
//   description: z.string().optional(),
//   bookingDateTime: z.date({
//     required_error: "Booking date and time is required",
//   }),
//   termsAccepted: z.boolean().refine((val) => val === true, {
//     message: "You must accept the terms and conditions",
//   }),
// });

// type BookingFormData = z.infer<typeof bookingFormSchema>;

const fetcherServiceById = async (id: string) => {
  const res = await ServiceService.getServiceByIdClient(id);
  console.log(`Fetched service with ID ${id}:`, res);
  return res.data;
};

const BookingServicePage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const router = useRouter();
  console.log(`Booking service for pet with ID: ${id}`);

  const [bookingDateTime, setBookingDateTime] = useState<Date | undefined>(
    undefined
  );
  const [petName, setPetName] = useState("");
  const [petCount, setPetCount] = useState("1");
  const [petType, setPetType] = useState("Dog");
  const [petBreed, setPetBreed] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("full");
  const [paymentType, setPaymentType] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Age state for pet
  const [petAge, setPetAge] = useState<number>(1);

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };
  // get service by id
  const {
    data: serviceData,
    error,
    isLoading,
  } = useSWR<{ data: IService }>(
    `service/${id}`,
    () => fetcherServiceById(id),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );
  console.log(`Service data for booking:`, serviceData?.data);

  // Dynamic price calculation
  const { basePrice, serviceFee, totalPrice } = useMemo(() => {
    if (!serviceData) return { basePrice: 0, serviceFee: 0, totalPrice: 0 };

    const quantity = parseInt(petCount) || 1;
    const base = serviceData.data.price * quantity;
    const fee = Math.round(base * 0.1);
    const total = base + fee;

    return {
      basePrice: base,
      serviceFee: fee,
      totalPrice: total,
    };
  }, [serviceData, petCount]);

  // Validate form data
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!petName.trim()) errors.petName = "Pet name is required";
    if (!bookingDateTime)
      errors.bookingDateTime = "Booking date and time is required";
    if (parseInt(petCount) < 1 || parseInt(petCount) > 10) {
      errors.petCount = "Pet count must be between 1 and 10";
    }
    if (!termsAccepted)
      errors.termsAccepted = "You must accept the terms and conditions";

    // Check if booking date is in the future
    if (bookingDateTime && bookingDateTime <= new Date()) {
      errors.bookingDateTime = "Booking date must be in the future";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle booking submission
  const handleBookingSubmit = async () => {
    if (!validateForm() || !serviceData) {
      // toast.error("Please fix the form errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const bookingData: BookingRequestBody = {
        service_id: serviceData?.data.service_id,
        provider_id: serviceData?.data.provider_id,
        booking_time: bookingDateTime!.toISOString(),
        quantity: parseInt(petCount),
        total_price: totalPrice,
        pet_name: petName,
        species: petType,
        breed: petBreed || undefined,
        age: petAge,
      };

      console.log("Submitting booking data:", bookingData);

      const response = await BookingService.bookingWithPayment(bookingData);

      if (response.data.data.success && response.data.data.payment_url) {
        console.log("Booking created successfully:", response.data.data);
        openNotificationWithIcon(
          "success",
          "Booking Created",
          "Redirecting to payment..."
        );
        // Store booking info in localStorage for potential return
        localStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            orderId: response.data.data?.order_id,
            bookingId: response.data.data?.booking_id,
            serviceId: response.data.data?.service_id,
            serviceName: response.data.data?.name,
            totalPrice: totalPrice,
          })
        );

        // Redirect to VNPay payment
        window.location.href = response.data.data?.payment_url;
      }
    } catch (error: any) {
      console.error("Booking submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading service details...</span>
        </div>
      </div>
    );
  }

  if (error || !serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested service could not be loaded.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="flex justify-center flex-grow bg-gray-50 py-8">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Book Your Pet Services</h1>
            <p className="text-gray-600 mt-2">
              Service: {serviceData.data.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Pet Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="">
                      <Label htmlFor="pet-name">Pet Name *</Label>
                      <Input
                        id="pet-name"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Enter your pet's name"
                        className={formErrors.petName ? "border-red-500" : ""}
                      />
                      {formErrors.petName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.petName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pet-count">Number of Pets *</Label>
                      <Input
                        id="pet-count"
                        type="number"
                        value={petCount}
                        onChange={(e) => setPetCount(e.target.value)}
                        min="1"
                        max="10"
                        className={formErrors.petCount ? "border-red-500" : ""}
                      />
                      {formErrors.petCount && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.petCount}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="date-time">Booking Date & Time *</Label>
                      <DatePicker
                        showTime
                        className={`w-full ${formErrors.bookingDateTime ? "border-red-500" : ""}`}
                        onChange={(value, dateString) => {
                          console.log("Selected Time: ", value);
                          console.log("Formatted Selected Time: ", dateString);
                          if (value) {
                            setBookingDateTime(value.toDate());
                          }
                        }}
                        onOk={onOk}
                        placeholder="Select date and time"
                        disabledDate={(current) => {
                          return current && current.isBefore(new Date(), "day");
                        }}
                      />
                      {formErrors.bookingDateTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.bookingDateTime}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pet-type">Pet Type *</Label>
                      <select
                        id="pet-type"
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Small Animal">Small Animal</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Fish">Fish</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="pet-breed">Pet Breed</Label>
                      <Input
                        id="pet-breed"
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        placeholder="e.g. Labrador, Siamese"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pet-age">Pet Age (years)</Label>
                      <Input
                        id="pet-age"
                        type="number"
                        value={petAge}
                        onChange={(e) =>
                          setPetAge(parseInt(e.target.value) || 1)
                        }
                        min="0"
                        max="30"
                        placeholder="Pet age in years"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Additional Information</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Special instructions, medical conditions, or other details about your pet"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-start space-x-2 mb-4 p-4 border rounded-md bg-white">
                      <RadioGroupItem
                        value="full"
                        id="payment-full"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="payment-full"
                        className="flex-grow cursor-pointer"
                      >
                        <div className="font-medium">
                          Pay {totalPrice.toLocaleString()} VND now
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Complete payment upfront
                        </p>
                      </Label>
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentType}
                    onValueChange={setPaymentType}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-md bg-white">
                      <RadioGroupItem id="payment-method-vnpay" value="vnpay" />
                      <Label
                        htmlFor="payment-method-vnpay"
                        className="flex-grow cursor-pointer"
                      >
                        VNPay - Online Banking
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="w-12 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">
                          VNPay
                        </span>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Secure Payment with VNPay
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-blue-600 font-medium">
                            Payment Protection
                          </span>
                          <span>
                            {" "}
                            - Secure payment processing with VNPay gateway
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-blue-600 font-medium">
                            Service Guarantee
                          </span>
                          <span>
                            {" "}
                            - Money held in escrow until service completion
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-blue-600 font-medium">
                            24/7
                          </span>
                          <span> - Customer care support</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-blue-600 font-medium">
                            Booking Confirmation
                          </span>
                          <span>
                            {" "}
                            - Instant booking confirmation after payment
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => {
                        setTermsAccepted(checked as boolean);
                      }}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and authorize the
                      payment
                    </Label>
                  </div>
                  {formErrors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.termsAccepted}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    disabled={!termsAccepted || loading}
                    onClick={handleBookingSubmit}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Book & Pay ${totalPrice.toLocaleString()} VND`
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="shadow-sm sticky top-4">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {serviceData.data.image && (
                      <Image
                        src={
                          serviceData.data.provider?.avatar || "https://via.placeholder.com/64"
                        }
                        alt="Provider Avatar"
                        className="w-16 h-16 rounded-lg object-cover"
                        height={64}
                        width={64}
                      />
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {serviceData.data.provider?.companyName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Provider: {serviceData.data.provider?.companyName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Duration: ${serviceData.data?.duration.minutes} minutes
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium text-lg">Price Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Service price ({petCount}x)</span>
                      <span>{basePrice.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee (10%)</span>
                      <span>{serviceFee.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between items-center py-2 mt-2 border-t">
                      <span className="font-medium text-lg">Total</span>
                      <span className="text-xl font-semibold text-purple-600">
                        {totalPrice.toLocaleString()} VND
                      </span>
                    </div>
                  </div>

                  {bookingDateTime && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">
                        Booking Summary
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {bookingDateTime.toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {bookingDateTime.toLocaleTimeString()}
                        </p>
                        <p>
                          <span className="font-medium">Pet:</span>{" "}
                          {petName || "Not specified"} ({petType})
                        </p>
                        <p>
                          <span className="font-medium">Quantity:</span>{" "}
                          {petCount} pet(s)
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingServicePage;
