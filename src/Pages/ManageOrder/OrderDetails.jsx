/* eslint-disable no-unused-vars */
import { useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { useGetSingleOrderQuery } from "../../redux/api/features/orderApi/orderApi";
import { AllImages } from "../../assets/image/AllImages";
import { useLocation, useParams } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const selectedOrderId = location.state?._id;

  const { _id } = useParams();
  console.log("_id", _id);

  const { data: singleOderData } = useGetSingleOrderQuery(_id);
  console.log("newOrderData", singleOderData?.data);
  const data = singleOderData?.data;
  return (
    <div>
      <GoBackButton text="" />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10  p-8 rounded-3xl shadow-2xl border border-gray-100">
        {/* Left side: Product Images */}
        <div className="grid grid-cols-2 gap-4">
          {data.items[0].product.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Product Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-xl border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Right side: Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {data.items[0].product.name}
            </h1>
            <p className="text-lg text-gray-500 mt-1">
              A high-quality product chosen just for you.
            </p>
          </div>

          <div className="space-y-2 text-base text-gray-600">
            <p>
              <span className="font-semibold text-gray-700">Price:</span> $
              {data.items[0].product.price}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Quantity:</span>{" "}
              {data.items[0].quantity}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Size:</span>{" "}
              {data.items[0].selectedSize}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Color:</span>{" "}
              {data.items[0].selectedColor}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                  data.status === "WAITING_FOR_PICK"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {data.status.replaceAll("_", " ")}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Payment:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                  data.paymentStatus === "UNPAID"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {data.paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Subtotal:</span> $
              {data.subTotal}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Total Price:</span>{" "}
              ${data.totalPrice}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Customer Info
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={data.user.profile_image}
                alt="User Profile"
                className="w-14 h-14 rounded-full border border-gray-300 shadow-sm"
              />
              <div>
                <p className="font-medium text-gray-800">{data.user.name}</p>
                <p className="text-sm text-gray-500">{data.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
