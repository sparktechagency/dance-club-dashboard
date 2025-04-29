/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Form, Input, Pagination, Table } from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";

import { useNavigate } from "react-router-dom";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
const Feedback = () => {
  const navigate = useNavigate();
  const userData = [
    {
      employee_id: "#1239",
      name: "The Buzz Spot",
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      time: "8:00am",
      status: "Pending",
    },
    {
      employee_id: "#1239",
      name: "The Buzz Spot",
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      time: "8:00am",
      status: "Replied",
    },
    {
      employee_id: "#1239",
      name: "The Buzz Spot",
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      time: "8:00am",
      status: "Pending",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(userData.length);
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const handleOk = () => {};

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
       <div className="flex gap-5 justify-start items-center">
         <p
          onClick={showModal}
          className={`flex items-center justify-center gap-2 border rounded-md px-3 py-1  ${
            record.status === "Pending" ? "text-red-500" : "text-green-500"
          }`}
        >
          <IoArrowUndoSharp />
          {record.status}
        </p>
        <FaTrashAlt className="text-red-500 text-xl"/>
       </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Products" />
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
            dataSource={userData || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination onChange={handlePageChange}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
        </Pagination>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <div className="">
            <h1 className="text-xl font-bold">Feedback Reply</h1>
            <p>Feedback form: Jullu Jalal</p>
            <p className="border p-2 rounded-xl">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure{" "}
            </p>
            <Form
              name="add-product"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="description"
                label={<p className=" text-md">Description</p>}
                style={{}}
              >
                <Input.TextArea
                  rows={4}
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <div className="flex justify-center ">
                <Form.Item>
                  <button
                    onClick={handleOk}
                    className="px-5 py-3 bg-green-500 text-white  rounded-lg"
                    type="submit"
                  >
              Save
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Feedback;
