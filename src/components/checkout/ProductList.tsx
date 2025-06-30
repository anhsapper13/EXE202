import React from "react";
import Link from "next/link";
import { ICartItem } from "@/types/cart-item.type";
import LazyImage from "../common/LazyImage";

export default function ProductList({ items }: { items: ICartItem[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 text-orange-400">
        Danh sách sản phẩm
      </h1>
      {items && items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 hidden sm:table-cell">
                  Hình ảnh
                </th>
                <th scope="col" className="px-6 py-4">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-4">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-4 hidden sm:table-cell">
                  Giá
                </th>
                <th scope="col" className="px-6 py-4">
                  Tổng
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.product?.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <LazyImage
                      src={item.product?.image as string}
                      alt={item.product?.name as string}
                      className="w-16 h-16 object-cover rounded-lg"
                      width={120}
                      height={65}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/products/${item.product?.id}`}>
                      <h2 className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
                        {item.product?.name}
                      </h2>
                    </Link>
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {parseFloat(item.product?.price as string).toLocaleString(
                      "en-US",
                      { style: "currency", currency: "USD" }
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {(
                      parseFloat(item.product?.price as string) * item.quantity
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">
          Không có sản phẩm trong giỏ hàng
        </div>
      )}
    </div>
  );
}
