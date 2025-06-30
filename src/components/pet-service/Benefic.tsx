"use client";
import { Shield, Heart, Clock, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Benefits() {
  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-chart-2" />,
      title: "Free Premium Protection",
      description: "Every booking includes our premium protection with free veterinary coverage for your pet."
    },
    {
      icon: <BadgeCheck className="h-10 w-10 text-chart-2" />,
      title: "Payment Protection",
      description: "Payments are only released to sitters after services are completed without major disputes."
    },
    {
      icon: <Clock className="h-10 w-10 text-chart-2" />,
      title: "Reservation Guarantee",
      description: "We help find replacement sitters for last-minute cancellations or provide a full refund."
    },
    {
      icon: <Heart className="h-10 w-10 text-chart-2" />,
      title: "Verified Reviews",
      description: "Real reviews from pet owners who've actually used the service help you make confident choices."
    },
  ];

  return (
    <section className="py-16 flex justify-center bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The PawPet Advantage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to providing the safest and most reliable pet care experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2">{benefit.icon}</div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        

      </div>
    </section>
  );
}