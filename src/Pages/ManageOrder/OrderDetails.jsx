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

  return (
    <div>
      <GoBackButton text="" />
      <div key="" className="mt-10  grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <img src={AllImages.banner1} alt="" />
        </div>
        <div>
          <h1>prodict name</h1>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
