"use client";
import { use, useState } from "react";

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
                        <div className="pb-6 border-b">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                              <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Anhsapper</h4>
                                <span className="text-sm text-muted-foreground">
                                  March 06, 2025
                                </span>
                              </div>
                              <div className="flex items-center gap-1 my-1">
                                {"★".repeat(5)}
                              </div>
                              <p className="text-muted-foreground mt-2">
                                Pawpet has always been very reliable and taken
                                really good care of Archie.
                              </p>
                            </div>
                          </div>
                        </div>

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
