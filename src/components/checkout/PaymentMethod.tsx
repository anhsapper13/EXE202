"use client";
import React, { useState } from "react";
import {
  SelectProvince,
  SelectDistrict,
  SelectWard,
  getWardPathWithType,
} from "vn-ad";
import { paymentMethod } from "./Method";

export default function PaymentMethod({
  totalPrice,
  handleOrder,
}: {
  totalPrice: string;
  handleOrder: (
    address: string,
    paymentMethod: string,
    order_type: string
  ) => void;
}) {
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [xa, setXa] = useState("");
  const [diachi, setDiachi] = useState("");
  const [method, setMethod] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* Address Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-5 text-orange-400">
          Địa chỉ nhận hàng
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700">
              Tỉnh/Thành:
            </label>
            <SelectProvince
              value={tinh}
              onChange={setTinh}
              className="w-full sm:w-3/4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700">
              Quận/Huyện:
            </label>
            <SelectDistrict
              value={huyen}
              province={tinh}
              onChange={setHuyen}
              className="w-full sm:w-3/4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700">
              Phường/Xã:
            </label>
            <SelectWard
              value={xa}
              district={huyen}
              onChange={setXa}
              className="w-full sm:w-3/4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="w-full sm:w-1/4 text-sm font-medium text-gray-700">
              Địa chỉ:
            </label>
            <input
              type="text"
              value={diachi}
              onChange={(e) => setDiachi(e.target.value)}
              className="w-full sm:w-3/4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-5 text-orange-400">
          Phương thức thanh toán
        </h1>
        <div className="flex flex-col gap-3">
          {paymentMethod.map((method) => (
            <div
              key={method}
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <input
                disabled={method === "Khác(Chưa hỗ trợ)"}
                id={`radio-${method}`}
                type="radio"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                name="payment-method"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={`radio-${method}`}
                className="ml-3 text-sm font-medium text-gray-800"
              >
                {method}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Total Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-5 text-orange-400">
          Thành tiền
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Tạm tính</span>
            <span className="font-medium">{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Thuế</span>
            <span className="font-medium">0.00đ</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Phí vận chuyển</span>
            <span className="font-medium">0.00đ</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-3">
            <span>Tổng cộng</span>
            <span>{totalPrice}</span>
          </div>
        </div>
        <button
          className={`w-full mt-5 px-6 py-3 rounded-full text-white font-medium transition-all duration-200 ${
            totalPrice === "0.00đ" ||
            !method ||
            !diachi ||
            !tinh ||
            !huyen ||
            !xa
              ? "bg-orange-300 opacity-50 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
          }`}
          disabled={
            totalPrice === "0.00đ" ||
            !method ||
            !diachi ||
            !tinh ||
            !huyen ||
            !xa
          }
          onClick={() =>
            handleOrder(
              `${getWardPathWithType(xa)}, ${diachi}`,
              method,
              "product"
            )
          }
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
