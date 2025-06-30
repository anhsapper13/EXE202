"use client";
import { Search, Calendar, MessageSquare, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-orange-500" />,
      title: "1. Search for local sitters",
      description: "Find trusted pet sitters near you with verified reviews and complete profiles."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-orange-500" />,
      title: "2. Connect with sitters",
      description: "Message sitters to discuss your pet's needs and schedule a meet & greet if desired."
    },
    {
      icon: <Calendar className="h-10 w-10 text-orange-500" />,
      title: "3. Book & pay securely",
      description: "Book your preferred dates and pay through our secure platform with payment protection."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-orange-500" />,
      title: "4. Enjoy peace of mind",
      description: "Receive updates during your pet's stay and know they're in good hands."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How PawPet Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding the perfect pet sitter has never been easier. Our simple process helps you connect with trusted local pet care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}