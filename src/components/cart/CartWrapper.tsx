"use client";
import React, { useCallback, useEffect, useState } from "react";
import Checkout from "./Checkout";
import Promotion from "./Promotion";
import BreadCrumb, { BreadcrumbItem } from "../common/BreadCrumb";
import CardItem from "./CardItem";
import Pagination from "../common/Pagination"; // Import the Pagination component
import { CartService } from "@/services/cart.service";
import CartItemService from "@/services/cartItem.service";
import { ToastContainer } from "react-toastify";
import { ICartItem } from "@/types/cart-item.type";

export default function CartWrapper() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState<string>("$0.00");
  const [error, setError] = useState<string | null>(null);
  const [cartId, setCartId] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    maxPage: 1,
  });

  const fetchCartItems = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const cartResponse = await CartService.getCartByUserId();
      const cart = cartResponse.data.data;

      if (!cart?.cart_id) {
        throw new Error("No cart found for the user");
      }

      setCartId(cart.cart_id);
      const cartItemsResponse = await CartItemService.getCartItems(
        cart.cart_id,
        { page: pagination.page, limit: pagination.limit }
      );

      // Debug API response
      console.log("Cart Items Response:", cartItemsResponse.data);

      setPagination((prev) => ({
        ...prev,
        maxPage: cartItemsResponse.data.data.totalPages,
      }));
      setCartItems(cartItemsResponse.data.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch cart items");
      } else {
        setError("Failed to fetch cart items");
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        setLoading(true);
        const response = await CartItemService.getCartItemsPrice(cartId);

        if (response.data) {
          setTotalPrice(`$${response.data.data.toFixed(2)}`);
        } else {
          setError("Failed to fetch total price");
        }
      } catch (err) {
        setError("Error fetching cart total");
        console.log("Error fetching cart total:", err);
        
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      fetchTotalPrice();
    }
  }, [cartId]);

  const handleUpdateCartItem = useCallback(
    (cartItemId: string, newQuantity: number) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_item_id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    },
    []
  );

  const handleRemoveCartItem = useCallback((cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cart_item_id !== cartItemId)
    );
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const BreadCrumbList: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Cart" },
  ];

  return (
    <div className="bg-white text-black p-4 sm:p-5">
      <BreadCrumb lists={BreadCrumbList} />
      <ToastContainer />
      <div className="flex flex-col">
        <h1 className="text-orange-500 font-semibold text-3xl text-center mb-4 md:text-4xl lg:text-5xl">
          My Cart
        </h1>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-[68%] xl:w-[72%]">
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : error ? (
              <div className="text-center p-4 text-red-500">{error}</div>
            ) : (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center p-4 text-2xl">
                    No items in cart
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CardItem
                      key={item.cart_item_id}
                      cart_id={cartId}
                      name={item.product?.name as string}
                      price={parseFloat(item.unitPrice as string)}
                      description={item.product?.description as string}
                      totalQuantity={item.product?.stockQuantity as number}
                      image={item.product?.image as string}
                      quantity={item.quantity}
                      productId={item.product?.id as string}
                      id={`${item.cart_item_id}`}
                      sku={item.product?.id as string}
                      onRefetch={fetchCartItems}
                      onUpdateCartItem={handleUpdateCartItem}
                      onRemoveCartItem={handleRemoveCartItem}
                    />
                  ))
                )}
                <div className="flex justify-center items-center">
                  {cartItems && cartItems.length > 0 && (
                    <Pagination
                      pagination={pagination}
                      setPagination={setPagination}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="hidden lg:block lg:w-[32%] xl:w-[28%]">
            <Promotion />
          </div>
        </div>
        <div className="mt-6 lg:mt-8">
          <Checkout totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}
