"use client";
import ProductService from "@/services/product.service";
import { IProduct } from "@/types/product.interface";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronLeftIcon,
  ClipboardIcon,
  ShareIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Loading from "../common/Loading";
import RelevantProducts from "./RelevantProducts";
import { CartService } from "@/services/cart.service";
import { openNotificationWithIcon } from "@/ultils/notification";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] =
    React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [modalPosition, setModalPosition] = React.useState<{
    top: number;
    right: number;
  }>({ top: 0, right: 0 });
  const shareButtonRef = React.useRef<HTMLButtonElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Construct the current page URL
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${id}`
      : "";

  // Fetch product details on mount
  React.useEffect(() => {
    const fetchProduct = async () => {
      if (!id || typeof id !== "string") {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await ProductService.getProductById(id);
        if (!response.data) {
          throw new Error("Product data not found");
        }
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Update modal position when it opens
  React.useEffect(() => {
    if (isShareModalOpen && shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - (rect.right + window.scrollX),
      });
    }
  }, [isShareModalOpen]);

  // Handle click outside to close modal
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isShareModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsShareModalOpen(false);
        setIsCopied(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShareModalOpen]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      return newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 1)
        ? newQuantity
        : prev;
    });
  };

  const handleAddToCart = async () => {
    try {
      await CartService.addToCart({
        product_id: id as string,
        quantity,
      });
      openNotificationWithIcon(
        "success",
        "Success",
        "Product added to cart successfully!"
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add product to cart");
      return;
    }
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of ${product?.name} now`);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
    setIsCopied(false); // Reset copy state when modal opens/closes
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-tertiary text-white shadow-md p-6 rounded-xl text-center max-w-3xl mx-auto mt-8">
        <p className="text-lg font-medium text-white">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 inline-flex items-center bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg px-4 py-2 text-base font-medium cursor-pointer"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mt-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/products"
          className="hover:text-secondary transition-colors"
        >
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Product Image - Sticky on large screens */}
        <div className="lg:sticky lg:top-0">
          <Image
            src={product.image || "/placeholder-image.svg"}
            alt={product.name || "product"}
            width={500}
            height={500}
            className="w-full h-128 lg:h-96 rounded-xl object-cover shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="bg-tertiary shadow-md rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {product.name}
            </h1>
            <button
              ref={shareButtonRef}
              onClick={toggleShareModal}
              className="p-2 bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-full cursor-pointer"
              title="Share this product"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-8 text-white">
            <p className="text-sm">
              Provider: {product.provider.name || "N/A"}
            </p>
            <p className="text-sm">
              Status: {product.stockQuantity > 0 ? "Available" : "Out of stock"}
            </p>
            <p className="text-sm">In stock: {product.stockQuantity}</p>
          </div>
          <p className="text-xl sm:text-2xl text-secondary font-semibold">
            {parseFloat(product.price as string).toFixed(2)} ₫
          </p>

          {/* Divider */}
          <div className="border-t border-gray-300"></div>

          {/* Free Delivery and Return Policy */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-white" />
              <p className="text-sm text-white">Free Delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <ArrowPathIcon className="h-5 w-5 text-white" />
              <p className="text-sm text-white">30-Day Return Policy</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="quantity"
              className="text-base font-medium text-white"
            >
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-white hover:bg-secondary hover:text-white transition-all duration-300 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={quantity <= 1}
              >
                –
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  if (value >= 1 && value <= (product.stockQuantity || 1)) {
                    setQuantity(value);
                  }
                }}
                className="w-16 text-center bg-tertiary text-white border-x border-gray-300 py-1 focus:outline-none appearance-none"
                style={{ MozAppearance: "textfield", appearance: "none" }}
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-white hover:bg-secondary hover:text-white transition-all duration-300 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={quantity >= (product.stockQuantity || 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={handleAddToCart}
              className={`flex-1/2 flex justify-center gap-3 w-full sm:w-auto bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg px-6 py-3 text-base font-medium cursor-pointer ${
                product.stockQuantity === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={product.stockQuantity === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={`flex-1/2 flex justify-center gap-3 w-full sm:w-auto bg-primary text-white border-1 hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg px-6 py-3 text-base font-medium cursor-pointer ${
                product.stockQuantity === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={product.stockQuantity === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
              Buy Now
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300"></div>

          {/* Product Description */}
          <div className="flex flex-col gap-4 text-white">
            <p className="text-xl font-bold">Product Information</p>
            <p className="text-base sm:text-lg text-white">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8"></div>

      <RelevantProducts />

      {/* Share Modal */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50"
          onClick={toggleShareModal}
        >
          <div
            ref={modalRef}
            className="absolute bg-tertiary rounded-lg p-6 w-full max-w-md border border-foreground"
            style={{
              top: `${modalPosition.top}px`,
              right: `${modalPosition.right}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-white">
                Copy this URL to clipboard
              </h2>
              <button
                onClick={toggleShareModal}
                className="p-1 text-white hover:text-secondary transition-all duration-300 cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 bg-foreground text-background border border-gray-300 rounded-lg py-2 px-3 focus:outline-none"
              />
              <button
                onClick={handleCopyUrl}
                className="p-2 bg-secondary text-white hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg cursor-pointer"
                title={isCopied ? "Copied!" : "Copy URL"}
              >
                {isCopied ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <ClipboardIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
