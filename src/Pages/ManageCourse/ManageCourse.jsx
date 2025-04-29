/* eslint-disable no-unused-vars */
import {
  Avatar,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { AiOutlineEdit } from "react-icons/ai";
import { AllImages } from "../../assets/image/AllImages";
const ManageCourse = () => {
  const userData = [
    {
      employee_id: "#1239",
      name: "The Buzz Spot",
      subName: "Non-Scheduled",
      classImg: AllImages.image1,
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      price: "$1000",
    },
    {
      employee_id: "#1239",
      name: "Club Pulse",
      subName: "Non-Scheduled",
      classImg: AllImages.image2,
      location: "Corona, Michigan",
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      price: "$1000",
    },
    {
      employee_id: "#1239",
      name: "Vibe Loungge",
      subName: "Scheduled",
      classImg: AllImages.image3,
      location: "Corona, Michigan",
      description: "Our Bachelor of Commerce program is ACBSP-accredited.",
      price: "$1000",
    },
  ];
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(userData.length);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = () => {
    // refetc();
  };

  const showModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    message.success("Deleted Successfully");
  };

  const handleProfilePicUpload = () => {};

  const onFinish = () => {};
  const onEditFInish = () => {};
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img src={record.classImg} alt="" />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
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
            <button onClick={() => handleEdit(record)}>
              <AiOutlineEdit className="text-2xl" />
            </button>
            <button onClick={handleDelete}>
              <FaTrashAlt className="text-2xl"></FaTrashAlt>
            </button>
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Course" />
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
                  placeholder="Search course"
                  allowClear
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
            <button
              onClick={showModal}
              className="bg-primary text-white py-2 px-4 rounded-md"
            >
              Add new course
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <Table
          columns={columns}
          dataSource={userData || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination onChange={handlePageChange}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
        </Pagination>
      </div>

      <Modal
        title="Add New Course"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleAddModalClose}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="title"
              label={<p className=" text-md">Add Product image</p>}
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className=" "
                >
                  <FaImage className="text-secondary h-10 w-10" />
                  <p className="text-secondary">Upload Image</p>
                </Upload>
              </div>
            </Form.Item>
          </div>
          <Form.Item
            name="course_name"
            label={<p className=" text-md">Course Name</p>}
          >
            <Input className=" text-md" placeholder="Type Course Name"></Input>
          </Form.Item>
          <Form.Item
            name="duration"
            label={<p className=" text-md">Duration</p>}
          >
            <Input className=" text-md" placeholder="Type  duration"></Input>
          </Form.Item>
          <Form.Item
            name="expiry"
            label={<p className=" text-md">Start Date</p>}
          >
            <DatePicker style={{ width: "100%" }}></DatePicker>
          </Form.Item>
          <Form.Item name="price" label={<p className=" text-md">Price</p>}>
            <InputNumber
              min={0}
              placeholder="Type Price"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<p className=" text-md">Description</p>}
          >
            <Input.TextArea rows={4}></Input.TextArea>
          </Form.Item>
          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
              <button className="px-6 py-2 rounded-md border border-primary text-primary">
                cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        title="Edit Course"
        open={isEditModalOpen}
        onOk={handlEditeOk}
        onCancel={handleEditModalClose}
        footer={false}
      >
        <Form
          onFinish={onEditFInish}
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="title"
              label={<p className=" text-md">Add Product image</p>}
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className=" "
                >
                  <FaImage className="text-secondary h-10 w-10" />
                  <p className="text-secondary">Upload Image</p>
                </Upload>
              </div>
            </Form.Item>
          </div>
          <Form.Item
            name="course_name"
            label={<p className=" text-md">Course Name</p>}
          >
            <Input className=" text-md" placeholder="Type Course Name"></Input>
          </Form.Item>
          <Form.Item
            name="duration"
            label={<p className=" text-md">Duration</p>}
          >
            <Input className=" text-md" placeholder="Type  duration"></Input>
          </Form.Item>
          <Form.Item
            name="expiry"
            label={<p className=" text-md">Start Date</p>}
          >
            <DatePicker style={{ width: "100%" }}></DatePicker>
          </Form.Item>
          <Form.Item name="price" label={<p className=" text-md">Price</p>}>
            <InputNumber
              min={0}
              placeholder="Type Price"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<p className=" text-md">Description</p>}
          >
            <Input.TextArea rows={4}></Input.TextArea>
          </Form.Item>
          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
              <button className="px-6 py-2 rounded-md border border-primary text-primary">
                cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCourse;
