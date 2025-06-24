/* eslint-disable no-unused-vars */
import {
  Avatar,
  ConfigProvider,
  Input,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { FaEye } from "react-icons/fa";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllClassesQuery } from "../../redux/api/features/classApi/classApi";
const ManageClass = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allClassesData, isLoading } = useGetAllClassesQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm,
  });
  // console.log("allClassesData", allClassesData?.data?.result);
  const classData = allClassesData?.data?.result;
  const [totalItems, setTotalItems] = useState(classData?.length);

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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSession = (record) => {
    console.log(record);
  };
  const handleEdit = (record) => {
    navigate("/edit-class");
  };
  const hnadleAddClass = () => {
    navigate("/add-class");
  };
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Class Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.class_banner}
            alt=""
            className="w-14 h-14 rounded-md "
          />
          <span>{record.title}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Class Type",
      dataIndex: "classType",
      key: "classType",
    },
    {
      title: "Total Seat",
      dataIndex: "totalSeat",
      key: "totalSeat",
    },

    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "rgb(47,84,235)",
                defaultHoverColor: "rgb(47,84,235)",
                defaultBorderColor: "rgb(47,84,235)",
              },
            },
          }}
        >
          <Space size="middle">
            <button onClick={() => showModal(record)}>
              <FaEye className="text-2xl"></FaEye>
            </button>
            <button onClick={() => handleEdit(record)}>
              <AiOutlineEdit className="text-2xl" />
            </button>
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Class" />
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
                  placeholder="Search Class"
                  allowClear
                  size="large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onPressEnter={handleSearch}
                  // prefix={
                  //   <SearchOutlined
                  //     style={{ cursor: "pointer" }}
                  //     onClick={handleSearch}
                  //   />
                  // }
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg bg-primary"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
            <div className="">
              <Select
                placeholder="Add Class"
                size="large"
                style={{ width: 200 }}
              >
                <Select.Option value="Scheduled Class">
                  <Link
                    to="/add-schedule-class"
                    state={{ classType: "Scheduled Class" }}
                  >
                    Scheduled Class
                  </Link>
                </Select.Option>
                <Select.Option
                  value="Non Scheduled Class"
                  state={{ classType: "Non Scheduled Class" }}
                >
                  <Link to="/add-non-schedule-class">Non Scheduled Class</Link>
                </Select.Option>
              </Select>
            </div>
            {/* <button
              onClick={hnadleAddClass}
              className="bg-primary text-white py-2 px-4 rounded-md"
            >
              Add New Class
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
            dataSource={classData || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allClassesData?.data?.meta?.total}
          onChange={handlePageChange}
        ></Pagination>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <div className="">
            <div className="flex items-center justify-center ">
              <img
                src={selectedUser?.class_banner}
                alt=""
                className="w-full h-60 rounded-md "
              />
            </div>

            <div className="mt-4">
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Name :</p>
                <p>{selectedUser.title}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Instructor Name :</p>
                <p>{selectedUser.instructorName}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Description</p>
                <p>{selectedUser.description}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Class Type :</p>
                <p>{selectedUser?.classType || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Total Seat:</p>
                <p>{selectedUser?.totalSeat || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Location:</p>
                <p>{selectedUser?.location || "N/A"}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Token Need For Booking:</p>
                <p>{selectedUser.tokenNeedForBook}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Class Duration:</p>
                <p>{selectedUser.durationInMinutes} Minutes</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Date:</p>
                <p>{selectedUser.date} </p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Time:</p>
                <p>{selectedUser.time} </p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Is Scheduled :</p>
                <p
                  className={selectedUser?.isScheduled ? "text-green-600" : ""}
                >
                  {selectedUser?.isScheduled ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">Is Available :</p>
                <p
                  className={selectedUser?.isAvailable ? "text-green-600" : ""}
                >
                  {selectedUser?.isAvailable ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2 mb-4">
                <p className=" font-bold">class Schedule :</p>
                <div>
                  {selectedUser?.classSchedule?.map((data) => (
                    <div key={data._id} className="mb-2 border-b p-2">
                      <p>Day: {data.day}</p>
                      <p>Time: {data.time}</p>
                      <p>Duration: {data.durationInMinutes} Minutes</p>
                    </div>
                  )) || "N/A"}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageClass;
