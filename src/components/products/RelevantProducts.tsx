"use client";
import React from "react";
import ProductService from "@/services/product.service";
import { IProduct } from "@/types/product.interface";
import { ApiResponse } from "@/types/request-response.interface";
import Loading from "../common/Loading";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon as ChevronLeftArrowIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { PaginatedResponse } from "@/types/pagination.interface";

const RelevantProducts: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ProductService.getAllProducts({ page: 1, limit: 10 });
        const items = Array.isArray(response.data.items) ? response.data.items : [];
        setProducts(items);
      } catch (err) {
        console.error("Error fetching relevant products:", err);
        setError("Failed to load relevant products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll(".product-card");
      if (cards.length > 0) {
        const containerRect = carouselRef.current.getBoundingClientRect();

        if (direction === "right") {
          for (let i = 0; i < cards.length; i++) {
            const cardRect = cards[i].getBoundingClientRect();
            if (cardRect.right > containerRect.right) {
              cards[i].scrollIntoView({ behavior: "smooth", inline: "start" });
              break;
            }
          }
        } else {
          for (let i = cards.length - 1; i >= 0; i--) {
            const cardRect = cards[i].getBoundingClientRect();
            if (cardRect.left < containerRect.left) {
              cards[i].scrollIntoView({ behavior: "smooth", inline: "start" });
              break;
            }
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loading />
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Relevant Products</h2>
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="product-card flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-tertiary shadow-md rounded-xl p-4 snap-start hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={product.image || "/placeholder-image.svg"}
                alt={product.name || "product"}
                width={200}
                height={200}
                className="w-full h-40 rounded-lg object-cover mb-3"
              />
              <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {product.description || "No description available."}
              </p>
              <p className="text-base font-semibold text-secondary mt-2">
                {parseFloat(product.price as string).toFixed(2)} ₫
              </p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-full cursor-pointer"
        >
          <ChevronLeftArrowIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-full cursor-pointer"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default RelevantProducts;