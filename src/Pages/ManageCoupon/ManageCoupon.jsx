/* eslint-disable no-unused-vars */
import {
  Avatar,
  ConfigProvider,
  DatePicker,
  Form,
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
import { AllImages } from "../../assets/image/AllImages";
import { useNavigate } from "react-router-dom";
import {
  useCreateCouponMutation,
  useGetCouponQuery,
} from "../../redux/api/features/couponApi/couponApi";
const ManageCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCouponModal, setAddCouponModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: couponData } = useGetCouponQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [createCoupon] = useCreateCouponMutation();
  // console.log(couponData);
  const userData = couponData?.data?.result;
  const [totalItems, setTotalItems] = useState(userData?.length);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = (record) => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const showAddCouponModal = (record) => {
    setSelectedUser(record);
    setAddCouponModal(true);
  };

  const handleAddCouponCancel = () => {
    setAddCouponModal(false);
  };

  const handleAddCoupon = async (values) => {
    // console.log("Success:", values);
    const data = {
      code: Number(values.code),
      startDate: values.startDate,
      endDate: values.endDate,
      discountPercentage: Number(values.discountPercentage),
    };
    try {
      await createCoupon(data).unwrap();
      message.success("Coupon created successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onEditFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {};

  const handleEdit = (record) => {
    // console.log(record);
  };
  const handleDelete = (record) => {
    // console.log(record);
  };

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Validity Date",
      dataIndex: "endDate",
      key: "endDate",
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
              <AiOutlineEdit className="text-2xl" />
            </button>
            <button onClick={() => handleEdit(record)}>
              <FaTrash className="text-2xl text-red-500" />
            </button>
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Coupons" />
        <button
          onClick={showAddCouponModal}
          className="bg-primary text-white py-2 px-4 rounded-md"
        >
          Create Coupon
        </button>
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
      {/* Add Modal */}
      <Modal
        open={addCouponModal}
        onCancel={handleAddCouponCancel}
        footer={null}
        title="Add Coupon code"
      >
        {selectedUser && (
          <div className="">
            <Form
              name="add-coupon"
              initialValues={{ remember: false }}
              onFinish={handleAddCoupon}
              layout="vertical"
            >
              <Form.Item
                name="code"
                label={<p className=" text-md">Coupon Code</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="discountPercentage"
                label={<p className=" text-md">Discount </p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="startDate"
                label={<p className=" text-md">Start Date</p>}
                style={{}}
              >
                <DatePicker
                  required
                  style={{ padding: "6px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                label={<p className=" text-md">End Date</p>}
                style={{}}
              >
                <DatePicker
                  required
                  style={{ padding: "6px", width: "100%" }}
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
      {/* edit Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        title="Edit Coupon code"
      >
        {selectedUser && (
          <div className="">
            <Form
              name="add-coupon"
              initialValues={{ remember: false }}
              onFinish={onEditFinish}
              layout="vertical"
            >
              <Form.Item
                name="coupon_code"
                label={<p className=" text-md">Coupon Code</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="discount"
                label={<p className=" text-md">Discount </p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="validity_date"
                label={<p className=" text-md">Validity Date</p>}
                style={{}}
              >
                <DatePicker
                  required
                  style={{ padding: "6px", width: "100%" }}
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

export default ManageCoupon;
