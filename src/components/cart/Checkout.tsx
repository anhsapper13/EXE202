import React from "react";
import Link from "next/link";

export default function Checkout({ totalPrice }: { totalPrice: string }) {
  return (
    <div className="flex flex-row justify-center items-center mx-45 my-2 sm:flex-row sm:justify-end">
      <div>
        <h2 className="text-2xl text-center">
          Total:
          <span className="text-2xl font-bold text-orange-600 bg-gray-100 rounded-xl px-4 py-2">
            {totalPrice}
          </span>
        </h2>
        <Link href="/checkout">
          <button
            className={`px-15 py-3 my-5 rounded-3xl text-white ${
              totalPrice === "$0.00"
                ? "bg-orange-300 opacity-50 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            }`}
            disabled={totalPrice === "$0.00"}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
