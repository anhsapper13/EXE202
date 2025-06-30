"use client";

import { Card, CardContent } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { ICategory } from "@/types/category.interface";
import { MapPin, PawPrint } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


interface HeroProps {
  categories?: ICategory[];
  // onSearch?: (searchParams: {
  //   category_id?: string;
  //   location?: string;
  //   petType?: string;
  //   searchTerm?: string;
  // }) => void;
}

export default function Hero({ categories = []}: HeroProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [petType, setPetType] = useState("");
  const [searchTerm] = useState("");


  // const getCategoryIcon = (name: string) => {
  //   const nameLower = name.toLowerCase();
  //   if (nameLower.includes('boarding')) return '🏠';
  //   if (nameLower.includes('sitting')) return '🏡';
  //   if (nameLower.includes('walking')) return '🦮';
  //   if (nameLower.includes('daycare')) return '🐶';
  //   if (nameLower.includes('groom')) return '✂️';
  //   if (nameLower.includes('transport') || nameLower.includes('taxi')) return '🚕';
  //   return '🐾'; // Default icon
  // };

  // const serviceCategories = categories.length > 0
  //   ? categories.map(cat => ({ id: cat.id, name: cat.name, icon: getCategoryIcon(cat.name) }))
  //   : defaultServices;

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useEffect(() => {
  //   if (onSearch) {
  //     onSearch({
  //       category_id: selectedCategory || undefined,
  //       location: location || undefined,
  //       petType: petType || undefined,
  //       searchTerm: debouncedSearchTerm || undefined,
  //     });
  //   }
  // }, [selectedCategory, location, petType, debouncedSearchTerm, onSearch]);

  // const handleSearchButtonClick = () => {
  //   if (onSearch) {
  //     onSearch({
  //       category_id: selectedCategory || undefined,
  //       location: location || undefined,
  //       petType: petType || undefined,
  //       searchTerm: searchTerm || undefined,
  //     });
  //   }
  // };

  return (
    <div className="relative flex justify-center bg-blue-100 py-14">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-100/90 to-blue-100/80 z-10"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="container relative z-20">
        <div></div>
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="text-gray-900">Compare </span>
            {/* <span className="text-orange-500">{serviceCategories.length} Pet Services</span> */}
            <span className="text-orange-500">49 Pet Services</span>

            <span className="text-gray-900"> near you in </span>
            <span className="text-orange-500">Ho Chi Minh City</span>
          </h1>
          <p className="text-xl text-gray-700">
            Get the best nearby Pet Services with just one request.
          </p>
        </div>

        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search term input */}
              {/* <div>
                <h3 className="text-lg font-medium mb-4">
                  Search for services
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-none"
                  />
                </div>
              </div> */}

              {/* Service categories */}
              <div>
                <h3 className="text-lg font-medium mb-4">I am looking for</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "outline"
                      }
                      className={`h-12 flex flex-col justify-center rounded-none text-[#644BAB] border-[#644BAB] ${
                        selectedCategory === category.id
                          ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          category.id === selectedCategory ? null : category.id
                        )
                      }
                    >
                      <div className="flex justify-center items-center gap-2">
                        <PawPrint />
                        <span className="text-sm">{category.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Near me in</h3>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">My pet type</h3>
                  <Select value={petType} onValueChange={setPetType}>
                    <SelectTrigger className="w-full rounded-none">
                      <SelectValue placeholder="Select a pet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pet Types</SelectLabel>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search button */}
              {/* <div className="pt-4">
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
                  onClick={handleSearchButtonClick}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Pet Services
                </Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
