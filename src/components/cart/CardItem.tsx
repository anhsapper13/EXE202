"use client";
import CartItemService from "@/services/cartItem.service";
import { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LazyImage from "../common/LazyImage";

export default function CartItem({
  cart_id,
  image,
  name,
  price,
  description,
  productId,
  quantity,
  totalQuantity,
  id,
  sku,
  onRefetch,
  onUpdateCartItem,
  onRemoveCartItem,
}: {
  cart_id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  productId: string;
  quantity: number;
  totalQuantity: number;
  id: string;
  sku: string;
  onRefetch: () => void;
  onUpdateCartItem: (cartItemId: string, quantity: number) => void;
  onRemoveCartItem: (cartItemId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const handleRemove = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this?");
      if (confirmed) {
        // Optimistic update: Remove item from UI immediately
        onRemoveCartItem(id);
        await CartItemService.deleteCartItem(id);
        toast.success("Vật phẩm đã bị xóa khỏi giỏ hàng");
        // Refetch to ensure consistency (e.g., for cart totals or validation)
        onRefetch();
      }
    } catch (error) {
      // Revert optimistic update by refetching
      onRefetch();
      toast.error(
        (error as AxiosError).response?.data?.message || "Failed to remove item"
      );
    }
  };

  const handleUpdate = async () => {
    try {
      if (isNaN(updatedQuantity) || updatedQuantity <= 0) {
        toast.warning("Số lượng phải lớn hơn 0");
        setUpdatedQuantity(quantity);
        return;
      }
      if (updatedQuantity > totalQuantity) {
        toast.warning(`Số lượng không được vượt quá ${totalQuantity}`);
        setUpdatedQuantity(quantity);
        return;
      }

      setIsUpdating(true);
      // Optimistic update: Update UI immediately
      onUpdateCartItem(id, updatedQuantity);
      await CartItemService.updateCartItem(id, {
        cart_id,
        product_id: productId,
        quantity: updatedQuantity,
      });
      toast.success("Cập nhật số lượng sản phẩm trong giỏ hàng");
    } catch (error) {
      // Revert optimistic update
      onUpdateCartItem(id, quantity);
      setUpdatedQuantity(quantity);
      toast.error(
        (error as AxiosError).response?.data?.message ||
          "Failed to update quantity"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityInput = (value: string) => {
    const parsedValue = parseInt(value);
    const newQuantity = isNaN(parsedValue) ? quantity : parsedValue;
    setUpdatedQuantity(newQuantity);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white my-4 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="w-full md:w-1/4 flex-shrink-0">
        <LazyImage
          src={image}
          alt={`${name} product image`}
          className="w-full h-40 object-cover rounded-md"
          width={300}
          height={160}
        />
      </div>

      <div className="flex-1 mt-4 md:mt-0 md:ml-6">
        <div className="flex justify-between items-start">
          <Link href={`/products/${productId}`}>
            <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
              {name}
            </h2>
          </Link>
          <span className="text-sm text-gray-500 hidden sm:block">
            SKU: {sku.length > 10 ? `${sku.slice(0, 10)}...` : sku}
          </span>
        </div>

        <div className="mt-1 flex justify-between items-start">
          <span className="text-lg font-bold text-orange-600">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 hidden sm:block">
            In stock: {totalQuantity}
          </span>
        </div>

        <hr className="my-3 border-gray-200" />

        {/* Description */}
        <div className="text-gray-600 text-sm hidden sm:block">
          {description.length > 200 && !isExpanded ? (
            <>
              {description.slice(0, 200)}...
              <button
                onClick={toggleDescription}
                className="text-blue-600 hover:underline ml-1"
                aria-expanded={isExpanded}
              >
                Read More
              </button>
            </>
          ) : (
            <>
              {description}
              {description.length > 200 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-600 hover:underline ml-1"
                  aria-expanded={isExpanded}
                >
                  Show Less
                </button>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-row justify-between sm:justify-between sm:flex-row sm:items-center gap-3">
          <div className="flex flex-row justify-between">
            <input
              type="number"
              className="w-1/2 sm:w-24 px-3 py-2 mx-2 bg-gray-100 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedQuantity}
              min="1"
              max={totalQuantity}
              onChange={(e) => handleQuantityInput(e.target.value)}
              aria-label={`Quantity for ${name}`}
              disabled={isUpdating}
            />
            <button
              className="w-1/2 sm:w-24 bg-blue-600 mx-2 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:bg-gray-400"
              aria-label={`Save quantity for ${name}`}
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              Save
            </button>
          </div>
          <div>
            <button
              className="w-4/5 sm:w-24 bg-red-500 mx-2 text-white py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer disabled:bg-gray-400"
              aria-label={`Remove ${name} from cart`}
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
