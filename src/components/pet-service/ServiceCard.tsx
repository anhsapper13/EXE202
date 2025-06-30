"use client";
import { IService } from "@/types/service.interface";
import { formatCurrency } from "@/ultils/formatters";
import { CalendarDays, CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { API_URL } from "@/constant/url";

export interface ServiceCardProps {
  service: IService;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div>
      <Card className="h-full flex overflow-hidden border-transparent hover:border-gray-200 transition-colors">
        <div className="relative w-[40%] bg-gray-100">
          <Image
            src={`${API_URL}${service?.image}`}
            alt="Pet photo"
            className="object-cover w-full h-52"
            fill
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <div>
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl">
                  {service.provider?.companyName}
                </h3>
                <h1>{formatCurrency(service.price)}</h1>
              </div>

              <div className="flex my-2 items-center text-[#644BAB] text-sm">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{service.provider?.address}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-1 mb-3">
            {"★".repeat(Math.round(sitter.rating))}
            <span className="text-sm text-muted-foreground ml-1">
              ({sitter.reviews} reviews)
            </span>
          </div> */}

          <div className="flex gap-3 mb-3">
            <Badge
              variant="secondary"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              {/* {sitter.completedBookings}+ completed */}
              completed bookings
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              <CalendarDays className="mr-1 h-3 w-3" />
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
