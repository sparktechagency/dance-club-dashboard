/* eslint-disable no-unused-vars */
import {
  Avatar,
  ConfigProvider,
  Input,
  message,
  Pagination,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../redux/api/features/productApi/productApi";
import { useAllBookingQuery } from "../../redux/api/features/bookingApi/bookingApi";
const ManageBookings = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("681832ec69fcb6bc2e271f8c");
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingData } = useAllBookingQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm,
  });

  const allBookings = bookingData?.data?.result;
  // console.log("Allbookings", allBookings);

  const [deleteProduct] = useDeleteProductMutation();

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
    setCurrentPage(1);
  };

  const handleSession = (record) => {
    console.log(record);
  };
  const handleDelete = (_id) => {
    Swal({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProduct(_id);
        message.success("Product deleted successfully!");
      }
    });
  };
  const handleAddProduct = () => {
    navigate("/add-product");
  };
  const handleEditProduct = (_id) => {
    navigate(`/edit-product/${_id}`, { state: { _id } });
  };
  const columns = [
    {
      title: "Sl No.",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      key: "title",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-1">
          <img
            src={record?.classDetails?.[0]?.class_banner}
            alt=""
            className="h-10 w-10 rounded-md"
          />
          <span>{record?.classDetails?.[0]?.title || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Description",
      key: "description",
      render: (_, record) => (
        <span>{record?.classDetails?.[0]?.description || "N/A"}</span>
      ),
    },
    {
      title: "Class Date",
      key: "classDate",
      render: (_, record) => (
        <span>{new Date(record?.classDate).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Total Student",
      dataIndex: "totalStudent",
      key: "totalStudent",
    },
    {
      title: "Total Token Used",
      dataIndex: "totalTokenUsed",
      key: "totalTokenUsed",
    },
    {
      title: "Total Earning",
      dataIndex: "totalEarning",
      key: "totalEarning",
    },

    // {
    //   title: "Action",
    //   key: "view",
    //   render: (_, record) => (
    //     <Space size="middle">
        
    //       <button onClick={() => handleDelete(record?._id)}>
    //         <FaTrash className="text-lg text-red-500" />
    //       </button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Bookings" />
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: "none",
                    activeBorderColor: "none",
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search by booking name"
                  allowClear
                  size="large"
                  style={{ width: "300px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                  }
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary text-white  p-2 rounded-r-lg"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
            {/* <button
              onClick={handleAddProduct}
              className="bg-primary text-white py-2 px-4 rounded-md"
            >
              Add New Product
            </button> */}
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              // Table: {
              //   headerBg: "#d51920",
              //   colorText: "rgb(0,0,0)",
              //   colorTextHeading: "rgb(255,255,255)",
              //   headerSortActiveBg: "#d51920",
              //   headerFilterHoverBg: "#d51920",
              // },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={allBookings || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={bookingData?.data?.meta?.total || 0}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedUser && (
          <div className="">
            <div className="text-lg mb-4">
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Product Name :</p>
                <p>{selectedUser.name}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Product Description:</p>
                <p>{selectedUser.description}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Product Category:</p>
                <p>{selectedUser?.category?.name || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Available Color :</p>
                <p>{selectedUser.color?.map((color) => color).join(", ")}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Available Size :</p>
                <p>{selectedUser?.size.join(", ") || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold"> Available stock :</p>
                <p>{selectedUser?.stock || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Price :</p>
                <p>{selectedUser.price || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Availablity :</p>
                <p>
                  {selectedUser?.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="">
                <p className=" font-bold my-2">Product Images:</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUser?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageBookings;
