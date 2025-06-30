"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IService } from "@/types/service.interface";
import ServiceCard from "./ServiceCard";
import Link from "next/link";
import { Button } from "../ui/Button";

export interface ServiceCardListProps {
  serviceList: IService[];
}

const ServiceCardList : React.FC<ServiceCardListProps> = ({serviceList}) => {
  return (
    <section className="py-12 flex justify-center">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Service For you</h2>
          <div className="w-48">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {serviceList.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-4">No services found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse all available services</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse All Services</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {serviceList.map((service) => (
              <Link
                href={`/pet-service/${service.service_id}`}
                key={service.service_id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <ServiceCard service={service} />
              </Link>
            ))}
          </div>
        )}

        {/* <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="px-8">
            View All Pet Sitters
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ServiceCardList;
