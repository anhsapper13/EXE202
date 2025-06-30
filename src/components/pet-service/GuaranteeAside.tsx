"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { BadgeCheck, Clock, Shield } from "lucide-react";
import Image from "next/image";

const GuaranteeAside = () => {
  return (
    <div>
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto border-none bg-blue-50 p-6">
          <CardContent className="space-y-4 pt-4">
            <div className="bg-yellow-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/1190804/pexels-photo-1190804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Trophy"
                className="w-12 h-12 object-cover rounded-full"            
              />
            </div>
            <CardTitle>
              Pay via PetBacker to enjoy the following benefits
            </CardTitle>
            <ul className="text-left space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Free Premium Protection</span>
                  <p className="text-sm text-muted-foreground">
                    Enjoy peace of mind with free veterinary coverage for your
                    pet with every booking.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Payment Protection</span>
                  <p className="text-sm text-muted-foreground">
                    Payments are only released when bookings are completed
                    without major disputes.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Reservation Guarantee</span>
                  <p className="text-sm text-muted-foreground">
                    We help find a replacement sitter for last minute
                    cancellations or you get a full refund.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuaranteeAside;
