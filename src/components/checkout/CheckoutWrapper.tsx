"use client";
import { CartService } from "@/services/cart.service";
import CartItemService from "@/services/cartItem.service";
import { OrderService } from "@/services/order.service";
import { ICartItem } from "@/types/cart-item.type";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { sampleData } from "../cart/data/sampleData";
import BreadCrumb, { BreadcrumbItem } from "../common/BreadCrumb";
import Pagination from "../common/Pagination";
import PaymentMethod from "./PaymentMethod";
import ProductList from "./ProductList";
import { log } from "node:console";

export default function CheckoutWrapper() {
  const [cartItems, setCartItems] = useState<ICartItem[]>(sampleData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState<string>("$0.00");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    maxPage: 1,
  });

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

      fetchTotalPrice();
    
  }, []);

  const onCreateOrder = async (
    address: string,
    paymentMethod: string,
    order_type: string
  ) => {
    switch (paymentMethod) {
      case "Trả tiền khi nhận hàng":
        if (!address) {
          toast.error("Vui lòng điền địa chỉ nhận hàng");
          return;
        }
        if (order_type !== "product") {
          toast.error("Chưa được tích hợp");
        }
        try {
          const response = await OrderService.createOrderForCash({
            address,
            order_type,
          });
          console.log("Order Response:", response);
          
          toast.success("Đặt hàng thành công");
        } catch (error) {
          toast.error(
          "Đặt hàng thất bại"
          );
          console.log("Order Error:", error);
          
        }
        setTimeout(() => {
          redirect("/");
        }, 5000);
        break;

      case "Momo":
        redirect(`/checkout/momo/${cartId}`);
        break;
      default:
        break;
    }
  };

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

      setPagination({
        ...pagination,
        maxPage: cartItemsResponse.data.data.totalPages,
      });
      setCartItems(cartItemsResponse.data.data.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const BreadCrumbList: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout" },
  ];
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading cart items...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchCartItems}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <BreadCrumb lists={BreadCrumbList} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ProductList items={cartItems} />
          <div className="flex justify-center mt-6">
            <Pagination pagination={pagination} setPagination={setPagination} />
          </div>
        </div>
        {totalPrice && (
          <PaymentMethod totalPrice={totalPrice} handleOrder={onCreateOrder} />
        )}
      </div>
    </div>
  );
}
