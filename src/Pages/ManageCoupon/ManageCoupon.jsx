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
} from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { FaTrash } from "react-icons/fa";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { AiOutlineEdit } from "react-icons/ai";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useEditCouponMutation,
  useGetCouponQuery,
} from "../../redux/api/features/couponApi/couponApi";
import dayjs from 'dayjs';
import swal from "sweetalert";

const ManageCoupon = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCouponModal, setAddCouponModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: couponData } = useGetCouponQuery({
    page: currentPage,
    limit: pageSize,
  });
  const _id = selectedUser?._id;
  console.log(_id);
  const [createCoupon] = useCreateCouponMutation();
  const [editCoupon] = useEditCouponMutation({ _id });
  const [deleteCoupon] = useDeleteCouponMutation();

  // console.log(selectedUser);
  const userData = couponData?.data?.result;
  const [totalItems, setTotalItems] = useState(userData?.length);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };



const showModal = (record = null) => {
  if (record) {
    setSelectedUser(record);
    form.setFieldsValue({
      code: Number(record.code),
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
      discountPercentage: Number(record.discountPercentage),
    });
  } else {
    setSelectedUser(null);
    form.resetFields();
  }

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
    const data = {
      code: Number(values.code),
      startDate: values.startDate,
      endDate: values.endDate,
      discountPercentage: Number(values.discountPercentage),
    };
    try {
      await createCoupon(data).unwrap();
      form.resetFields();
      setAddCouponModal(false);
      message.success("Coupon created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const onEditFinish = async (values) => {
    const data = {
      code: Number(values.code),
      startDate: values.startDate,
      endDate: values.endDate,
      discountPercentage: Number(values.discountPercentage),
    };
    try {
      await editCoupon({ _id: selectedUser._id, data }).unwrap();
      setAddCouponModal(false);
      form.resetFields();
      message.success("Coupon Updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (_id) => {
    console.log("_id", _id);
    setSelectedUser(_id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCoupon(_id).unwrap();
        message.success("Coupon Deleted Successfully");
      }
    });
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
            <button onClick={() => handleDelete(record?._id)}>
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
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={couponData?.data?.meta?.total || 0}
          onChange={handlePageChange}
        />
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
              form={form}
              name="add-coupon"
              initialValues={{ remember: false }}
              onFinish={handleAddCoupon}
              layout="vertical"
            >
              <Form.Item
                name="code"
                label={<p className=" text-md">Coupon Code</p>}
                style={{}}
                rules={[
                  {
                    required: true,
                    message: "Code must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="discountPercentage"
                label={<p className=" text-md">Discount </p>}
                rules={[
                  {
                    required: true,
                    message: "Code must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="startDate"
                label={<p className=" text-md">Start Date</p>}
                required
              >
                <DatePicker
                  style={{ padding: "6px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                label={<p className=" text-md">End Date</p>}
                required
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
              name="edit-coupon"
              initialValues={{ remember: false }}
              onFinish={onEditFinish}
              layout="vertical"
              form={form}
            >
              <Form.Item
                name="code"
                label={<p className=" text-md">Coupon Code</p>}
                rules={[
                  {
                    // required: true,
                    message: "Code must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="discountPercentage"
                label={<p className=" text-md">Discount </p>}
                rules={[
                  {
                    // required: true,
                    message: "Discount must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  required
                  style={{ padding: "3px", width: "100%" }}
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
    </div>
  );
};

export default ManageCoupon;
