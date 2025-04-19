/* eslint-disable no-unused-vars */
import {
  Avatar,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { useState } from "react";

import { Modal } from "antd";
import {
  FaCamera,
  FaCheck,
  FaEye,
  FaImage,
  FaPlus,
  FaUser,
} from "react-icons/fa";

import { SearchOutlined } from "@ant-design/icons";
import { MdBlock } from "react-icons/md";
import user from "../../assets/image/user.png";
import { useForm } from "antd/es/form/Form";
const AddClients = () => {
  const userData = [
    {
      job_id: "#1239",
      name: "Mr. Mahmud",
      profileImage: user,
      email: "mr101@mail.ru",
      total_booking: 20,
      contact: "(+33) 7 00 55 59 27",
      location: "Corona, Michigan",
      address: "76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris",
      dob: "17 Dec, 2024",
      gender: "Male",
      action: "↗",
      status: "true",
      designation: "Project Manager",
    },
    {
      job_id: "#1238",
      name: "Lily",
      email: "xterris@gmail.com",
      profileImage: user,
      total_booking: 20,
      contact: "(+33) 7 00 55 59 27",
      location: "Great Falls, Maryland",
      address: "123 Rue des Lilas, Paris, 75008",
      dob: "15 Jan, 2022",
      gender: "Female",
      action: "↗",
      status: "true",
      designation: "Software Engineer",
    },
    {
      job_id: "#1237",
      name: "Kathry",
      profileImage: user,
      email: "irnabela@gmail.com",
      total_booking: 20,
      contact: "(+33) 7 00 55 59 27",
      location: "Syracuse, Connecticut",
      address: "45 Avenue des Champs, Paris, 75001",
      dob: "11 Jul, 2021",
      gender: "Female",
      action: "↗",
      status: "false",
      designation: "Data Analyst",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(userData.length);
  const [addClientModal, setAddClientModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const form = useForm();

  const handleProfileImageChange = (e) => {
    setProfileImage(e.file.originFileObj);
  };

  const handleAddClient = () => {
    setAddClientModal(true);
  };

  const handleAddClientCancel = () => {
    setAddClientModal(false);
  };

  const handleAddClientOk = () => {
    setAddClientModal(false);
  };

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
          <Avatar size={40} className="shadow-md" src={record?.profileImage} />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Job Id",
      dataIndex: "job_id",
      key: "job_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      key: "contact",
      render: (_, record) => {
        const contact = record.contact || "N/A";
        return <p>{contact}</p>;
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <p className="flex items-center gap-2">
          {record.status === "true" ? (
            <FaCheck className="text-green-500 text-2xl" />
          ) : (
            <MdBlock className="text-red-500 text-2xl" />
          )}
        </p>
      ),
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
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  const onFinish = () => {
    console.log("Success");
  };
  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div>
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
                  placeholder="Search "
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
          </div>
        </div>
        <button
          onClick={handleAddClient}
          className="px-10 py-3    rounded-xl bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center gap-2"
        >
          <FaPlus></FaPlus>
          Add Client
        </button>
      </div>
      <div className=" overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#d51920",
                colorText: "rgb(0,0,0)",
                colorTextHeading: "rgb(255,255,255)",
                headerSortActiveBg: "#d51920",
                headerFilterHoverBg: "#d51920",
              },
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
                <p>{selectedUser.job_id}</p>
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

      <Modal
        open={addClientModal}
        onCancel={handleAddClientCancel}
        footer={null}
        title="Add Client"
      >
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="image">
              <div className="h-20 w-full border border-dashed border-gray-400 flex flex-col justify-center items-center ">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={(file) => {
                    form.setFieldsValue({ img: [file] });
                    setProfileImage(file.name);
                    return false;
                  }}
                  className=" px-2 py-1 rounded-full cursor-pointer"
                >
                  <FaImage className="text-neutral-400 h-10 w-10" />
                </Upload>
                {/* <p className="mt-2 text-sm text-gray-700">
                  {profileImage ? profileImage : "No file uploaded"}
                </p> */}
              </div>
            </Form.Item>
            <Form.Item name="name" label={<p>Name</p>}>
              <Input placeholder="Name"></Input>
            </Form.Item>
            <Form.Item name="jobId" label={<p>Job Id</p>}>
              <Input placeholder="Job Id"></Input>
            </Form.Item>
            <Form.Item name="number" label={<p>Phone Number</p>}>
              <Input placeholder="Phone Number"></Input>
            </Form.Item>
            <Form.Item name="location" label={<p>Location</p>}>
              <Input placeholder="Location"></Input>
            </Form.Item>
          </Form>
          <Form.Item name={"submit"}>
            <button
              onClick={handleAddClient}
              className="w-full py-2    rounded-xl bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center gap-2"
            >
              Submit
            </button>
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};

export default AddClients;
