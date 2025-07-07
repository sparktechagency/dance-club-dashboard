import {
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/features/usersApi/usersApi";
import { MdBlockFlipped } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { data: allUsersData } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  // console.log("allUsersData", allUsersData?.data?.result);

  const showDeleteModal = (record) => {
    console.log("_id:", record?.user?._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, blcok it!",
    }).then((result) => {
      if (result.isConfirmed) {
        blockUser(record?.user?._id).unwrap();
        Swal.fire({
          title: "blocked!",
          text: "Your file has been blocked.",
          icon: "success",
        });
      }
    });
  };

  // form modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // form Modal
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  // table data:

  const data = allUsersData?.data?.result;

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.profile_image || <FaUser></FaUser>}
            alt="User Image"
            className="h-10 w-10 rounded-full"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Token",
      dataIndex: "totalToken",
      key: "totalToken",
    },
    {
      title: "Is Blocked",
      dataIndex: "totalToken",
      render: (_, item) => {
        return (
          <p
            className={`${
              item?.user?.isBlocked === true ? "text-green-500" : "text-red-500"
            }`}
          >
            {item?.user?.isBlocked === true ? "Active" : "Blocked"}
          </p>
        );
      },
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
            <button onClick={() => showDeleteModal(record)} className="">
              <MdBlockFlipped className="text-red-500" />
            </button>
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="mx-2">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 my-6">
        <GoBackButton text="Manage users" />

        {/* <button onClick={showModal} className="flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-md text-white ">
                    <FaPlus className="text-white" />
                    Make Admin
                </button> */}
      </div>

      <div className="bg-white">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
          className="overflow-x-auto"
        />
      </div>
      {/* modal for add admin */}
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
        <Modal
          title="Make Admin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="contact"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="">
              <Form.Item
                name="name"
                label={<p className=" text-md">Full Name</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="John Doe"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<p className=" text-md">E-mail</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="abcd@gmail.com"
                />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item
                name="user_type"
                label={<p className=" text-md">User Type</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="Admin"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={<p className=" text-md">Password</p>}
              >
                <Input.Password
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="******"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <button
                onClick={handleOk}
                className=" w-full py-2 bg-primary text-white font-semiboldbold rounded-lg text-xl  shadow-lg"
                type="submit"
              >
                Confirm
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ManageUsers;
