"use client";
import { use, useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Snail,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import ServiceService from "@/services/service.service";
import { formatCurrency } from "@/ultils/formatters";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { API_URL } from "@/constant/url";

const petServiceReviews = {
  // Service ID: 8f863dcc-be01-4389-8c1a-bd1bd7fe5e2b
  "8f863dcc-be01-4389-8c1a-bd1bd7fe5e2b": [
    {
      id: 1,
      userName: "Nguyễn Minh Anh",
      avatar:
        "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 15, 2025",
      rating: 5,
      comment:
        "Absolutely amazing service! My Golden Retriever Max had the best time. The staff was so caring and professional. Highly recommend!",
    },
    {
      id: 2,
      userName: "Trần Văn Dũng",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 12, 2025",
      rating: 5,
      comment:
        "My cat Luna was initially nervous, but the team handled her with such patience. She came home relaxed and happy. Will definitely book again!",
    },
    {
      id: 3,
      userName: "Phạm Thị Hương",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 08, 2025",
      rating: 4,
      comment:
        "Great experience overall. My dog Charlie seemed to enjoy the grooming session. The price is reasonable and the results were fantastic.",
    },
    {
      id: 4,
      userName: "Lê Hoàng Nam",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 05, 2025",
      rating: 5,
      comment:
        "Exceptional care for my elderly Beagle. The team was gentle and understanding of his special needs. Thank you for treating him like family!",
    },
    {
      id: 5,
      userName: "Vũ Thị Mai",
      avatar:
        "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 02, 2025",
      rating: 5,
      comment:
        "Perfect service! My two cats were well taken care of while I was traveling. Got daily photo updates which put my mind at ease. Highly professional!",
    },
    {
      id: 6,
      userName: "Đỗ Minh Tuấn",
      avatar:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 28, 2025",
      rating: 4,
      comment:
        "Good service and fair pricing. My Labrador puppy was energetic but they managed him well. Only minor suggestion would be more play time.",
    },
    {
      id: 7,
      userName: "Hoàng Thị Lan",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 25, 2025",
      rating: 5,
      comment:
        "Outstanding! My Persian cat has never looked better after grooming. The staff clearly loves what they do. Will be a regular customer for sure!",
    },
  ],

  // Service ID: c5320402-72c8-4d56-b8b0-e165d5a40739
  "c5320402-72c8-4d56-b8b0-e165d5a40739": [
    {
      id: 1,
      userName: "Bùi Văn Khải",
      avatar:
        "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 14, 2025",
      rating: 5,
      comment:
        "Incredible walking service! My Husky Rex got the exercise he needed. The walker sent me photos and updates throughout. Very trustworthy!",
    },
    {
      id: 2,
      userName: "Nguyễn Thị Oanh",
      avatar:
        "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 11, 2025",
      rating: 4,
      comment:
        "Good training session for my stubborn Bulldog. The trainer was patient and used positive reinforcement. Seeing improvements already!",
    },
    {
      id: 3,
      userName: "Lý Thanh Hải",
      avatar:
        "https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 09, 2025",
      rating: 5,
      comment:
        "Amazing pet sitting service! My Border Collie was in great hands while I was at work. She was tired and happy when I got home. Perfect!",
    },
    {
      id: 4,
      userName: "Cao Thị Nhung",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 06, 2025",
      rating: 5,
      comment:
        "Excellent overnight care for my rescue dog Buddy. He has anxiety issues but the sitter was so understanding and gentle. Highly recommend!",
    },
    {
      id: 5,
      userName: "Tạ Văn Đức",
      avatar:
        "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 03, 2025",
      rating: 4,
      comment:
        "Great daycare service. My energetic Jack Russell had a blast playing with other dogs. Staff was attentive and professional throughout.",
    },
    {
      id: 6,
      userName: "Phan Thị Thúy",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 29, 2025",
      rating: 5,
      comment:
        "Fantastic experience! My senior German Shepherd was treated with such care and respect. The team really understands different dog needs.",
    },
    {
      id: 7,
      userName: "Đinh Minh Quang",
      avatar:
        "https://images.pexels.com/photos/1805602/pexels-photo-1805602.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 26, 2025",
      rating: 5,
      comment:
        "Top-notch pet transportation service! My anxious Chihuahua was handled with care during the vet visit. Professional and reliable!",
    },
  ],

  // Service ID: b3c3590e-84d3-4e81-99f8-e223ede3889e
  "b3c3590e-84d3-4e81-99f8-e223ede3889e": [
    {
      id: 1,
      userName: "Võ Thị Kim Loan",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 13, 2025",
      rating: 5,
      comment:
        "Absolutely love this grooming service! My Poodle Coco looks like a show dog now. The attention to detail is incredible. Worth every penny!",
    },
    {
      id: 2,
      userName: "Hồ Văn Tùng",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 10, 2025",
      rating: 4,
      comment:
        "Good nail trimming service for my nervous cat Whiskers. The groomer was very patient and gentle. My cat didn't stress out at all.",
    },
    {
      id: 3,
      userName: "Trịnh Thị Hạnh",
      avatar:
        "https://images.pexels.com/photos/1193942/pexels-photo-1193942.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 07, 2025",
      rating: 5,
      comment:
        "Excellent bathing service! My muddy Retriever was transformed into a clean, fluffy angel. The staff even cleaned up after themselves. Amazing!",
    },
    {
      id: 4,
      userName: "Lương Minh Đạt",
      avatar:
        "https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 04, 2025",
      rating: 5,
      comment:
        "Professional teeth cleaning for my old Cocker Spaniel. The dental care was thorough and my dog's breath is so much fresher now. Highly recommended!",
    },
    {
      id: 5,
      userName: "Đặng Thị Bích",
      avatar:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "March 01, 2025",
      rating: 4,
      comment:
        "Great ear cleaning service for my Basset Hound. His chronic ear issues have improved significantly after regular cleanings here. Very satisfied!",
    },
    {
      id: 6,
      userName: "Quách Văn Long",
      avatar:
        "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 27, 2025",
      rating: 5,
      comment:
        "Outstanding full grooming package! My Maltese looks and smells amazing. The team uses high-quality products and treats pets like royalty.",
    },
    {
      id: 7,
      userName: "Mai Thị Thu Hà",
      avatar:
        "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "February 24, 2025",
      rating: 5,
      comment:
        "Perfect spa day for my Persian cat Princess! She was pampered and relaxed. The groomers clearly have experience with long-haired breeds. Fantastic service!",
    },
  ],
};

const serviceByIDFetcher = async (id: string) => {
  const response = await ServiceService.getServiceByIdClient(id);
  return response.data;
};

const PetServiceInfo = ({ params }: { params: Promise<{ id: string }> }) => {
  const currentParams = use(params);
  const [activeTab, setActiveTab] = useState("about");
  const { data } = useSWR(
    currentParams.id ? `service/${currentParams.id}` : null,
    () => serviceByIDFetcher(currentParams.id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );
  console.log("Service Data:", data);
  const serviceId = currentParams.id?.toLowerCase();
  const reviews =
    petServiceReviews[serviceId as keyof typeof petServiceReviews] || [];
  useEffect(() => {
    // Log service id and its reviews on load/param change
    console.log("PetServiceInfo -> serviceId:", serviceId);
    console.log(
      "PetServiceInfo -> matched reviews:",
      Array.isArray(reviews) ? reviews : []
    );
  }, [serviceId, reviews]);
  console.log("Service Data:", data);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow justify-center bg-gray-50">
        <div className="container py-8">
          <Card className="border-none shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={`${API_URL}${data?.data?.provider?.avatar_url}`}
                  />
                  <AvatarFallback>{data?.data.provider?.name}</AvatarFallback>
                </Avatar>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{data?.data.name}</h1>
                      <p className="text-muted-foreground">
                        By {data?.data.provider?.companyName}
                      </p>

                      <div className="flex items-center text-yellow-400 gap-1 my-2">
                        {"★".repeat(5)}
                        <span className="text-sm text-muted-foreground ml-1">
                          (100 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span>{data?.data.provider?.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {/* {sitterData.completedBookings} */}+ completed bookings
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      {/* {sitterData.repeatedBookings} */}+ repeated bookings
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full bg-white border-b rounded-none justify-start h-auto p-0">
                  <TabsTrigger
                    value="about"
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger
                    value="photos"
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Photos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {data?.data.description ||
                          "".split("\n\n").map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <Card className="border-none shadow-sm mb-6">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-xl">Reviews</CardTitle>
                      <Button className="bg-[#6739AB] hover:bg-[#6739AB]">
                        Write a review
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {reviews.length > 0 ? (
                          reviews.map((review: any) => (
                            <div
                              key={review.id}
                              className="pb-6 border-b last:border-0"
                            >
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarImage src={review.avatar} />
                                  <AvatarFallback>
                                    {review.userName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">
                                      {review.userName}
                                    </h4>
                                    <span className="text-sm text-muted-foreground">
                                      {review.date}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 my-1">
                                    {"★".repeat(review.rating)}
                                  </div>
                                  <p className="text-muted-foreground mt-2">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted-foreground py-6">
                            No reviews available.
                          </div>
                        )}

                        <div className="text-center py-4">
                          {/* <Button variant="outline">
                            View all {sitterData.reviews} reviews
                          </Button> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="photos" className="mt-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">Photos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Image
                          src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                        <Image
                          src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                        <Image
                          src="https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                        <Image
                          src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                        <Image
                          src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                        <Image
                          src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Pet photo"
                          className="rounded-md aspect-square object-cover"
                          width={500}
                          height={500}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader className="bg-[#FF782C] text-white p-4 rounded-t-lg">
                  <CardTitle className="text-2xl font-medium text-center">
                    Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col py-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-full">
                          <Snail />
                        </div>
                        <span>{data?.data.name}</span>
                      </div>

                      <div className=" flex items-center justify-between ">
                        <div className="text-right font-black">
                          From {formatCurrency(data?.data.price)}
                        </div>

                        <Link
                          href={`/booking/${data?.data.service_id}`}
                          className="bg-white font-black text-lg shadow-none hover:bg-white hover:text-orange-500 text-[#6739AB] "
                        >
                          Make Reservation
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Book via PawPet to enjoy
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span>
                          Premium Insurance, 24/7 support, booking guarantee
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span>
                          Safe cashless payments, photo updates and more!
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex mb-4">
                    <Image
                      src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Visa"
                      className="h-8 w-auto mx-1"
                      width={32}
                      height={32}
                    />
                    <Image
                      src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Mastercard"
                      className="h-8 w-auto mx-1"
                      width={32}
                      height={32}
                    />
                    <Image
                      src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="PayPal"
                      className="h-8 w-auto mx-1"
                      width={32}
                      height={32}
                    />
                  </div>
                  <Button className="w-full bg-[#6739AB] text-xl mt-3 py-6 hover:bg-[#FF782C] mb-2">
                    <MessageSquare className="mr-2  h-4 w-4" />
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetServiceInfo;
