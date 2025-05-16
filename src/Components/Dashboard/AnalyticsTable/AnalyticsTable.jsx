/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Select, Table } from "antd";
import { useState } from "react";

import { Modal } from "antd";
import user from "../../../assets/image/p1.png";
import { Link, useNavigate } from "react-router-dom";
import { useNewOrderOnDashboardQuery } from "../../../redux/api/features/orderApi/orderApi";
const AnalyticsTable = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { data: newOrderData } = useNewOrderOnDashboardQuery({
    page: currentPage,
    limit: 3,
  });
  const userData = newOrderData?.data?.result;
  // const [totalItems, setTotalItems] = useState(userData.length);

  console.log("selectedOrderId", selectedOrderId);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = () => {
    // refetc();
  };

  const handleSession = (record) => {
    console.log(record);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleDetails = (_id) => {
    console.log(_id);
    navigate(`/order-details/${_id}`);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md"
            src={record?.items?.[0]?.product?.images?.[0]}
          />
          <span>{record?.items?.map((item) => item?.product?.name)}</span>
        </div>
      ),
    },

    {
      title: "Price",
      key: "price",
      render: (_, record) => {
        const price = record?.items?.map((item) => item?.product?.price);
        return <p>$ {price}</p>;
      },
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => {
        const contact = record?.user?.email;
        return <p>{contact}</p>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span
            className="text-primary cursor-pointer"
            onClick={() => handleDetails(record?._id)}
          >
            View
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        {/* ?TODO */}
        <h3 className="text-xl  font-semibold text-textColor px-2 md:px-0">
          New Order
        </h3>
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <Link to="/manage-order">
            <p className="text-sm text-primary underline">View All</p>
          </Link>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              //   Table: {
              //     headerBg: "#d51920",
              //     colorText: "rgb(0,0,0)",
              //     colorTextHeading: "rgb(255,255,255)",
              //     headerSortActiveBg: "#d51920",
              //     headerFilterHoverBg: "#d51920",
              //   },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={userData || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      {/* <div className="mt-10 flex justify-center items-center">
        <Pagination onChange={handlePageChange}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
        </Pagination>
      </div> */}

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <div className="">
            <div className="bg-red-100  text-center relative h-[100px] w-full flex flex-col justify-center items-center">
              <Avatar
                className="shadow-md h-32 w-32 absolute top-[20px] left-[50%] translate-x-[-50%]"
                src={selectedUser?.profileImage}
              />
            </div>

            <div className="mt-16">
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Name :</p>
                <p>{selectedUser.name}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Employee Id :</p>
                <p>{selectedUser.employee_id}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Designation:</p>
                <p>{selectedUser?.designation || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Email :</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Contact No :</p>
                <p>{selectedUser?.contact || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Member Since :</p>
                <p>{selectedUser?.member_since || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Address :</p>
                <p>{selectedUser.address || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Qualification :</p>
                <p>{selectedUser.qualification || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AnalyticsTable;
