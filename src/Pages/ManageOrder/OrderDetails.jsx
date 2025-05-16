/* eslint-disable no-unused-vars */
import { useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { useNewOrderOnDashboardQuery } from "../../redux/api/features/orderApi/orderApi";
import { AllImages } from "../../assets/image/AllImages";

const OrderDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: newOrderData } = useNewOrderOnDashboardQuery({
    page: currentPage,
    limit: pageSize,
  });

  console.log("newOrderData", newOrderData?.data?.result);
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
