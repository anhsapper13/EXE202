"use client";
import React, { useEffect, useState } from "react";
import LazyImage from "../common/LazyImage";
import CartItemService from "@/services/cartItem.service";
import { redirect, useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed

export default function MomoPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cartId } = useParams(); // Destructure cartId from useParams
  const [totalPrice, setTotalPrice] = useState<string>("0.00đ");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const router = useRouter();

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        setLoading(true);
        const response = await CartItemService.getCartItemsPrice(
          cartId as string
        );

        if (response.data) {
          setTotalPrice(`${response.data.data.toFixed(2)}đ`);
        } else {
          setError("Failed to fetch total price");
        }
      } catch (err) {
        setError("Error fetching cart total");
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      fetchTotalPrice();
    }
  }, [cartId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeout(() => {
        toast.error("Order expired");
      }, 5000);
      redirect("/");
    }
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-gray-100">
      {/* Order Information Section */}
      <div className="bg-white p-4 rounded-lg shadow-md w-[300px] mr-4">
        <h2 className="text-lg font-semibold mb-2">Information order</h2>
        <div className="flex flex-col items-center mb-2">
          <LazyImage
            src="/logo.png"
            alt="Paw Paradise Logo"
            width={50}
            height={50}
          />
          <span className="ml-2 text-purple-600 font-bold">Paw Paradise</span>
        </div>
        <p className="mb-2">
          <strong>Order ID</strong>
        </p>
        <p className="mb-2">31b2e8ad9e0407ae...</p>
        <p className="mb-2">
          <strong>Description</strong>
        </p>
        <p className="mb-2">Thanh toán đơn hàng 1...</p>
        <p className="mb-2">
          <strong>Price</strong>
        </p>
        <p className="mb-2 text-lg font-bold">{totalPrice}</p>
        <div className="bg-pink-100 p-2 rounded mt-2 text-center">
          <p className="text-pink-600">
            <strong>Order expired in</strong>
          </p>
          <p className="text-pink-600">{formatTime(timeLeft)}</p>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="bg-pink-600 p-6 rounded-lg shadow-md text-white text-center">
        <h2 className="text-xl mb-4">Scan QR Code to pay</h2>
        <div className="flex justify-center">
          <LazyImage
            src="https://homepage.momocdn.net/blogscontents/momo-upload-api-220715103645-637934782053464745.png"
            alt="Payment QR Code"
            width={250}
            height={250}
          />
        </div>
        <p className="mt-2">Using App MoMo or a supported camera app</p>
        <a href="#" className="text-yellow-300 underline mt-2 block">
          Having trouble paying? view guide
        </a>
      </div>
    </div>
  );
}
