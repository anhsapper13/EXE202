"use client";
import { IProduct } from "@/types/product.interface";
import LazyImage from "../common/LazyImage";

const ProductCard = ({ name, price, image }: Partial<IProduct>) => (
  <div
    className={`bg-tertiary text-white shadow-md rounded-xl cursor-pointer transition-all duration-300 hover:scale-105`}
  >
    <div className="group relative w-full flex justify-center items-center">
      <LazyImage
        src={image || "/placeholder-image.svg"}
        alt={name || "product"}
        width={400}
        height={200}
        className="w-full h-48 rounded-t-xl"
        objectFit="cover"
      />
      <button className="absolute bottom-3 w-[95%] opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 bg-tertiary text-white border border-foreground hover:border-secondary rounded-lg px-4 py-2 text-sm font-medium">
        Add to Cart
      </button>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <p className="text-lg text-gray-500 dark:text-gray-400">
        {parseFloat(price as string).toFixed(2)} ₫
      </p>
    </div>
  </div>
);

export default ProductCard;
