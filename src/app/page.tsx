
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "./globals.css";
import LazyImage from "@/components/common/LazyImage";

const services = [
  {
    title: "Accessories",
    icon: "/toy.png",
    desc: "Stylish leashes, comfy beds, and toys that’ll make your pet wag with joy.",
  },
  {
    title: "Food",
    icon: "/food.png",
    desc: "Nutritious meals & treats tailored to every breed and dietary need.",
  },
  {
    title: "Fashion",
    icon: "/collar.png",
    desc: "Stylish outfits and accessories to keep your pet looking fabulous.",
  },
  {
    title: "Hygiene",
    icon: "/grooming.png",
    desc: "Clean and care for your pet with top-quality hygiene products and grooming tools.",
  },
];

const locationCategories = [
  {
    title: "Veterinary Clinic",
    icon: "/icons/vet.png",
    desc: "Expert health check-ups, vaccinations, and emergency care for your beloved pets.",
  },
  {
    title: "Pet Spa & Grooming",
    icon: "/icons/spa.png",
    desc: "Full-service grooming, nail trimming, and pampering sessions for a clean and happy pet.",
  },
  {
    title: "Pet Shop",
    icon: "/icons/shop.png",
    desc: "Wide selection of pet food, accessories, toys, and essentials for all kinds of pets.",
  },
  {
    title: "Pet Café",
    icon: "/icons/cafe.png",
    desc: "A cozy place where you and your pet can relax together and enjoy pet-friendly treats.",
  },
  {
    title: "Dog Park",
    icon: "/icons/park.png",
    desc: "Open spaces for your furry friends to play, socialize, and burn off some energy.",
  },
  {
    title: "Training Center",
    icon: "/icons/training.png",
    desc: "Obedience training, behavior correction, and skill-building for dogs of all ages.",
  },
  {
    title: "Pet Hotel",
    icon: "/icons/hotel.png",
    desc: "Comfortable overnight boarding and daycare facilities when you’re away from home.",
  },
  {
    title: "Adoption Center",
    icon: "/icons/adoption.png",
    desc: "Find your next furry friend or support rehoming efforts in your local community.",
  },
];

const locations = [
  // Veterinary Clinics
  {
    type: "Veterinary Clinic",
    name: "Happy Paws Veterinary",
    rating: 4.7,
    openHours: "8:00 AM - 7:00 PM",
    reviews: 120,
    image: "/mock-location.jpg",
  },
  {
    type: "Veterinary Clinic",
    name: "PawCare Animal Hospital",
    rating: 4.8,
    openHours: "9:00 AM - 6:00 PM",
    reviews: 98,
    image: "/mock-location.jpg",
  },
  {
    type: "Veterinary Clinic",
    name: "All Pets Vet Clinic",
    rating: 4.6,
    openHours: "8:30 AM - 5:30 PM",
    reviews: 76,
    image: "/mock-location.jpg",
  },
  {
    type: "Veterinary Clinic",
    name: "WellPet Veterinary Center",
    rating: 4.9,
    openHours: "24/7",
    reviews: 203,
    image: "/mock-location.jpg",
  },

  // Pet Spa & Grooming
  {
    type: "Pet Spa & Grooming",
    name: "Fluffy Tails Spa",
    rating: 4.5,
    openHours: "10:00 AM - 8:00 PM",
    reviews: 85,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Spa & Grooming",
    name: "BubblePaws Grooming",
    rating: 4.6,
    openHours: "9:00 AM - 7:00 PM",
    reviews: 102,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Spa & Grooming",
    name: "Glamour Pet Spa",
    rating: 4.4,
    openHours: "10:00 AM - 6:00 PM",
    reviews: 67,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Spa & Grooming",
    name: "Royal Paws",
    rating: 4.8,
    openHours: "9:30 AM - 7:30 PM",
    reviews: 140,
    image: "/mock-location.jpg",
  },

  // Pet Shops
  {
    type: "Pet Shop",
    name: "Pawfect Pets",
    rating: 4.6,
    openHours: "9:00 AM - 9:00 PM",
    reviews: 220,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Shop",
    name: "The Pet Den",
    rating: 4.7,
    openHours: "8:00 AM - 8:00 PM",
    reviews: 190,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Shop",
    name: "Furry Friends Market",
    rating: 4.5,
    openHours: "10:00 AM - 10:00 PM",
    reviews: 156,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Shop",
    name: "Pet Planet",
    rating: 4.8,
    openHours: "9:00 AM - 9:00 PM",
    reviews: 210,
    image: "/mock-location.jpg",
  },

  // Pet Cafés
  {
    type: "Pet Café",
    name: "Whiskers & Lattes",
    rating: 4.6,
    openHours: "11:00 AM - 9:00 PM",
    reviews: 88,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Café",
    name: "The Barkery",
    rating: 4.7,
    openHours: "10:00 AM - 8:00 PM",
    reviews: 73,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Café",
    name: "Furends Café",
    rating: 4.5,
    openHours: "12:00 PM - 10:00 PM",
    reviews: 65,
    image: "/mock-location.jpg",
  },
  {
    type: "Pet Café",
    name: "Pawffee Time",
    rating: 4.8,
    openHours: "10:00 AM - 9:00 PM",
    reviews: 95,
    image: "/mock-location.jpg",
  },
];

const products = [
  // Accessories
  {
    title: "Pet Bed",
    image: "/mock-product.jpg",
    price: 29.99,
    service: "Accessories",
    brand: "CozyPaws",
    link: "/products/bed",
  },
  {
    title: "Dog Leash",
    image: "/mock-product.jpg",
    price: 12.99,
    service: "Accessories",
    brand: "LeashLab",
    link: "/products/leash",
  },
  {
    title: "Cat Toy",
    image: "/mock-product.jpg",
    price: 8.99,
    service: "Accessories",
    brand: "WhiskerPlay",
    link: "/products/toy",
  },
  {
    title: "Grooming Kit",
    image: "/mock-product.jpg",
    price: 24.99,
    service: "Accessories",
    brand: "PawGroom",
    link: "/products/grooming",
  },
  {
    title: "Pet Collar",
    image: "/mock-product.jpg",
    price: 9.99,
    service: "Accessories",
    brand: "CollarCraft",
    link: "/products/collar",
  },
  {
    title: "Water Bowl",
    image: "/mock-product.jpg",
    price: 14.99,
    service: "Accessories",
    brand: "HydroPet",
    link: "/products/bowl",
  },
  {
    title: "Treats Pack",
    image: "/mock-product.jpg",
    price: 7.99,
    service: "Accessories",
    brand: "TreatTales",
    link: "/products/treats",
  },
  {
    title: "Chew Rope",
    image: "/mock-product.jpg",
    price: 11.49,
    service: "Accessories",
    brand: "TugBuddy",
    link: "/products/rope",
  },

  // Food
  {
    title: "Dry Dog Food",
    image: "/mock-product.jpg",
    price: 34.99,
    service: "Food",
    brand: "BarkBites",
    link: "/products/drydog",
  },
  {
    title: "Wet Cat Food",
    image: "/mock-product.jpg",
    price: 19.49,
    service: "Food",
    brand: "MeowMeals",
    link: "/products/wetcat",
  },
  {
    title: "Puppy Formula",
    image: "/mock-product.jpg",
    price: 25.99,
    service: "Food",
    brand: "YoungTails",
    link: "/products/puppy",
  },
  {
    title: "Kitten Formula",
    image: "/mock-product.jpg",
    price: 26.99,
    service: "Food",
    brand: "KittyKare",
    link: "/products/kitten",
  },
  {
    title: "Organic Pet Food",
    image: "/mock-product.jpg",
    price: 29.99,
    service: "Food",
    brand: "NatureNibbles",
    link: "/products/organic",
  },
  {
    title: "Senior Dog Food",
    image: "/mock-product.jpg",
    price: 31.99,
    service: "Food",
    brand: "ElderPaws",
    link: "/products/senior",
  },
  {
    title: "Grain-Free Kibble",
    image: "/mock-product.jpg",
    price: 27.99,
    service: "Food",
    brand: "GrainGuard",
    link: "/products/grainfree",
  },
  {
    title: "Pet Snack Sticks",
    image: "/mock-product.jpg",
    price: 6.99,
    service: "Food",
    brand: "SnackWhisk",
    link: "/products/snacksticks",
  },

  // Hygiene
  {
    title: "Pet Shampoo",
    image: "/mock-product.jpg",
    price: 10.99,
    service: "Hygiene",
    brand: "ShinyPaws",
    link: "/products/shampoo",
  },
  {
    title: "Toothbrush Set",
    image: "/mock-product.jpg",
    price: 9.99,
    service: "Hygiene",
    brand: "SmilePet",
    link: "/products/toothbrush",
  },
  {
    title: "Pet Wipes",
    image: "/mock-product.jpg",
    price: 5.99,
    service: "Hygiene",
    brand: "FreshFur",
    link: "/products/wipes",
  },
  {
    title: "Nail Clippers",
    image: "/mock-product.jpg",
    price: 13.99,
    service: "Hygiene",
    brand: "ClipClaw",
    link: "/products/nails",
  },
  {
    title: "Ear Cleaner",
    image: "/mock-product.jpg",
    price: 8.49,
    service: "Hygiene",
    brand: "HearWell",
    link: "/products/ear",
  },
  {
    title: "Pet Cologne",
    image: "/mock-product.jpg",
    price: 14.49,
    service: "Hygiene",
    brand: "ScentPup",
    link: "/products/cologne",
  },
  {
    title: "Tear Stain Remover",
    image: "/mock-product.jpg",
    price: 11.99,
    service: "Hygiene",
    brand: "BrightEyes",
    link: "/products/tearstain",
  },
  {
    title: "Tick & Flea Spray",
    image: "/mock-product.jpg",
    price: 17.99,
    service: "Hygiene",
    brand: "FleaFree",
    link: "/products/fleaspray",
  },

  // Fashion
  {
    title: "Winter Pet Sweater",
    image: "/mock-product.jpg",
    price: 18.99,
    service: "Fashion",
    brand: "CozyTailor",
    link: "/products/sweater",
  },
  {
    title: "Raincoat for Dogs",
    image: "/mock-product.jpg",
    price: 21.49,
    service: "Fashion",
    brand: "PuddlePaws",
    link: "/products/raincoat",
  },
  {
    title: "Pet Bandana Set",
    image: "/mock-product.jpg",
    price: 7.49,
    service: "Fashion",
    brand: "StylePup",
    link: "/products/bandana",
  },
  {
    title: "Pet Sunglasses",
    image: "/mock-product.jpg",
    price: 9.99,
    service: "Fashion",
    brand: "SunPaws",
    link: "/products/sunglasses",
  },
  {
    title: "Holiday Costume",
    image: "/mock-product.jpg",
    price: 14.99,
    service: "Fashion",
    brand: "FestiveFur",
    link: "/products/costume",
  },
  {
    title: "Bow Tie Collar",
    image: "/mock-product.jpg",
    price: 6.99,
    service: "Fashion",
    brand: "DapperPets",
    link: "/products/bowtie",
  },
  {
    title: "Pet Shoes Set",
    image: "/mock-product.jpg",
    price: 16.99,
    service: "Fashion",
    brand: "PawSteps",
    link: "/products/shoes",
  },
  {
    title: "Fluffy Hoodie",
    image: "/mock-product.jpg",
    price: 19.99,
    service: "Fashion",
    brand: "SnugTail",
    link: "/products/hoodie",
  },
];

const Home: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const [activeService, setActiveService] = useState(services[0]?.title || "");
  const [activeLocationCategory, setActiveLocationCategory] = useState(
    locationCategories[0]?.title || ""
  );

  // Filter products by selected service
  const filteredProducts = products.filter(
    (product) => product.service === activeService
  );
  const filteredLocations = locations.filter(
    (location) => location.type === activeLocationCategory
  );

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/bg-home.png')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center bottom-[20%]">
          <h1
            className={`text-5xl md:text-7xl font-bold text-white mb-8 ${
              theme.animations ? "animate-fade-in" : ""
            }`}
          >
            Everything Your Pet Needs
          </h1>
          <p
            className={`text-xl md:text-2xl text-white mb-8 ${
              theme.animations ? "animate-fade-in" : ""
            }`}
          >
            Shop, Book & Pamper with Trusted Providers
          </p>
          <Link href="/services">
            <button
              className={`px-6 py-3 text-xl font-extralight cursor-pointer rounded-full bg-background text-foreground hover:bg-secondary hover:text-foreground transition-all duration-300 ${
                theme.animations ? "hover:scale-105" : ""
              }`}
            >
              Explore Services
            </button>
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-3xl font-extralight text-foreground text-center mb-5">
            — What we offer —
          </p>
          <p className="text-4xl font-bold text-foreground text-center mb-10">
            Our Services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-4xl font-bold text-foreground">
                Quality Services
              </p>
              <p className="text-lg text-foreground">
                Discover a seamless way to care for your cats, dogs, and other
                beloved pets through our marketplace. We connect you with
                trusted providers offering fast, convenient, and stress-free
                services, making pet care simple and accessible.
                <br />
                <br />
                From grooming and wellness checkups to other essential services,
                our platform ensures you find quality and reliable options to
                keep your pets happy and healthy.
              </p>
              <div>
                <div className="py-2">
                  <Link href="/contact">
                    <button
                      className={`text-xl px-6 py-3 rounded-full cursor-pointer bg-tertiary text-white hover:bg-secondary hover:text-foreground hover:scale-105 transition-all duration-300 ${
                        theme.animations ? "" : "hover:scale-100"
                      }`}
                    >
                      Become a provider
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <LazyImage
                src="/intro.png"
                alt="Cat in Our Services"
                width={600}
                height={400}
                className="w-full max-w-md object-contain mx-auto"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-tertiary mx-auto w-full"></div>

      {/* Introduction Section */}
      <section className="py-16 bg-background px-4">
        <div className="container mx-auto text-center mb-5 max-w-7xl">
          <p className="text-4xl font-bold text-foreground text-center mb-10">
            Products
          </p>
          <div className="grid grid-cols-1 bg-background sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {services.map(({ title, icon, desc }) => {
              return (
                <div key={title}>
                  <div
                    className={`h-full text-center text-white shadow-md p-6 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 ${
                      theme.animations
                        ? "hover:scale-105 hover:bg-secondary"
                        : "hover:bg-secondary"
                    } ${activeService === title ? "bg-secondary" : "bg-tertiary"}`}
                    onClick={() => setActiveService(title)}
                  >
                    <div className="flex justify-center mb-4">
                      <LazyImage
                        src={icon}
                        alt={title}
                        width={100}
                        height={100}
                        className="bg-white p-4 rounded-xl"
                        objectFit="contain"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-lg text-white">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mb-5 max-w-7xl flex items-center justify-between">
          <p className="text-3xl font-bold text-foreground text-left">
            Featured
          </p>
          <Link href={"/"} className="text-foreground text-lg">
            See all
          </Link>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(
              ({ title, brand, image, price, link }, idx) => (
                <Link key={idx} href={link}>
                  <div
                    className={`bg-tertiary text-white shadow-md rounded-xl cursor-pointer transition-all duration-300 hover:scale-105`}
                  >
                    <div className="group relative w-full flex justify-center items-center">
                      <LazyImage
                        src={image}
                        alt={title}
                        width={700}
                        height={300}
                        className="w-full h-full rounded-t-xl"
                        objectFit="cover"
                      />
                      <button className="absolute bottom-2 w-[90%] opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-secondary hover:text-foreground transition-all duration-300 bg-background text-foreground border border-foreground hover:border-secondary rounded-lg px-4 py-2 text-sm font-medium">
                        Add to Cart
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-extralight mb-2">{brand}</h3>
                      <h3 className="text-xl font-medium mb-2">{title}</h3>
                      <p className="text-lg text-gray-500 dark:text-gray-400">
                        ${price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

          {filteredProducts.length === 0 && (
            <p className="bg-tertiary text-foreground shadow-md p-6 rounded-xl text-lg">
              No products found.
            </p>
          )}
        </div>

        <div className="container mx-auto text-center mb-5 max-w-7xl">
          <p className="text-4xl font-bold text-foreground text-center my-10">
            Locations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 items-stretch">
            {locationCategories.map(({ title }) => (
              <div key={title}>
                <div
                  className={`flex justify-center items-center h-full text-center border border-tertiary text-foreground shadow-md p-2 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 ${
                    theme.animations
                      ? "hover:scale-105 hover:bg-secondary hover:text-foreground hover:border-none"
                      : "hover:bg-secondary"
                  } ${
                    activeLocationCategory === title
                      ? "bg-secondary text-foreground border-none"
                      : ""
                  }`}
                  onClick={() => setActiveLocationCategory(title)}
                >
                  <h3 className="text-md font-medium">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {filteredLocations.map(
              ({ name, rating, reviews, openHours, image }, idx) => (
                <Link key={idx} href={"/"}>
                  <div className="flex flex-col bg-tertiary text-white shadow-md rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden">
                    {/* Image Section */}
                    <div className="w-full flex justify-center items-center">
                      <LazyImage
                        src={image}
                        alt={name}
                        width={650}
                        height={500}
                        className="w-full h-full rounded-t-xl"
                        objectFit="cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="basis-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{name}</h3>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-muted">{openHours}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-md"> {rating}</span>
                        <span className="text-foreground text-md">
                          ({reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

          {filteredLocations.length === 0 && (
            <p className="bg-tertiary w-full text-foreground shadow-md p-6 rounded-xl text-lg text-center">
              No locations found.
            </p>
          )}
        </div>
      </section>

      <div className="h-px bg-tertiary mx-auto w-full"></div>

      {/* Our Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-extralight text-foreground mb-5">
            — Benefits —
          </h2>
          <h3 className="text-4xl font-bold text-foreground mb-10">
            Our Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="flex flex-col justify-around items-end gap-8 text-left md:text-right">
              {[
                {
                  title: "Medical Care",
                  text: "Schedule a vet booking for checkups, treatments, and expert pet care through trusted medical centers.",
                  image: "/healthcare.png",
                },
                {
                  title: "Pet Profiles",
                  text: "Track and manage your pets’ profiles effortlessly, storing medical records and vaccination history for vet visits.",
                  image: "/pet-love.png",
                },
              ].map(({ title, text, image }, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col gap-4 shadow-md md:items-end items-start md:text-right text-left w-full max-w-full md:max-w-md group overflow-hidden rounded-xl p-4 self-end"
                >
                  <div className="absolute inset-0 bg-secondary rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -translate-x-full md:translate-x-full group-hover:translate-x-0 z-0" />
                  <div className="flex flex-row md:flex-row-reverse gap-4 items-center">
                    <LazyImage
                      src={image}
                      alt={title}
                      width={50}
                      height={50}
                      className="w-full mb-4 object-cover"
                      objectFit="cover"
                    />
                    <h4 className="relative text-2xl font-semibold text-foreground my-2 group-hover:text-foreground z-10 transition-colors duration-400">
                      {title}
                    </h4>
                  </div>
                  <p className="relative text-lg text-foreground group-hover:text-foreground z-10 transition-colors duration-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <LazyImage
                src="/features.png"
                alt="Features Illustration"
                width={400}
                height={670}
                className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg rounded-lg object-contain"
                objectFit="contain"
              />
            </div>

            <div className="flex flex-col justify-around items-start gap-8">
              {[
                {
                  title: "Adoption",
                  text: "Discover your perfect pet and open your heart to a new friend through our community.",
                  image: "/save-animals.png",
                },
                {
                  title: "Pet Essentials",
                  text: "Purchase high-quality pet food and toys from trusted third-party providers.",
                  image: "/food.png",
                },
              ].map(({ title, text, image }, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-start gap-4 shadow-md text-left w-full max-w-full md:max-w-md group overflow-hidden rounded-xl p-4 self-start"
                >
                  <div className="absolute inset-0 bg-secondary rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -translate-x-full group-hover:translate-x-0 z-0" />
                  <div className="flex gap-4 items-center">
                    <LazyImage
                      src={image}
                      alt={title}
                      width={50}
                      height={50}
                      className="w-full mb-4 object-cover"
                      objectFit="cover"
                    />
                    <h4 className="relative text-2xl font-semibold text-foreground my-2 group-hover:text-foreground z-10 transition-colors duration-400">
                      {title}
                    </h4>
                  </div>
                  <p className="relative text-lg text-foreground group-hover:text-foreground z-10 transition-colors duration-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
