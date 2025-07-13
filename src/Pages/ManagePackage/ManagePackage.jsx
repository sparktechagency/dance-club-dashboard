/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { FaPen, FaTrash } from "react-icons/fa";
import {
  Form,
  InputNumber,
  message,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetAllPackageQuery,
  useGetSInglePackageQuery,
  useUpdatePackageMutation,
  // useGetSInglePackageQuery,
} from "../../redux/api/features/packageApi/PackageApi";
import swal from "sweetalert";

const ManagePackage = () => {
  const [form] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [packageId, setPackageId] = useState("");
  // console.log("packageId", packageId);
  const { data: packageData } = useGetAllPackageQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [createPackage] = useCreatePackageMutation();
  const { data: getSInglePackageData } = useGetSInglePackageQuery(packageId, {
    skip: !packageId || packageId.length !== 24,
  });
  // console.log("getSInglePackageData", getSInglePackageData);

  const [updatePackage] = useUpdatePackageMutation(packageId);

  const [deletePackage] = useDeletePackageMutation();

  useEffect(() => {
    if (getSInglePackageData?.data) {
      form.setFieldsValue({
        totalToken: getSInglePackageData.data.totalToken,
        price: getSInglePackageData.data.price,
        validityInWeeks: getSInglePackageData.data.validityInWeeks,
        packageType: getSInglePackageData.data.packageType,
      });
    }
  }, [form, getSInglePackageData]);

  const handleAddPackage = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleEDitPackage = (_id) => {
    console.log("record", _id);
    setPackageId(_id);
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };

  const onFinish = (values) => {
    const data = {
      totalToken: values.totalToken,
      price: values.price,
      validityInWeeks: values.validityInWeeks,
      packageType: values.packageType,
    };
    // console.log("data", data);
    createPackage(data)
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        message.success("Package created successfully!");

        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onEditFInish = (values) => {
    const data = {
      totalToken: values.totalToken,
      price: values.price,
      validityInWeeks: values.validityInWeeks,
      packageType: values.packageType,
    };
    updatePackage({ _id: packageId, data })
      .unwrap()
      .then((res) => {
        console.log("res", res);
        message.success("Package updated successfully!");
        form.resetFields();
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async (_id) => {
    const confirm = await swal({
      title: "Are you sure you want to delete this package?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirm) {
      try {
        await deletePackage(_id).unwrap();
        message.success("Package deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        message.error("Failed to delete package.");
      }
    }
  };
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const columns = [
    {
      title: "Token No",
      dataIndex: "token_number",
      key: "token_number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_, record) => (
        <span className=" px-2  py-2 rounded-lg font-bold ">
          ${record?.price}
        </span>
      ),
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      render: (_, record) => (
        <span className=" px-4 py-2 rounded-lg font-bold">
          {record.packageType}
        </span>
      ),
    },
    {
      title: "Total Token",
      dataIndex: "totalToken",
      render: (_, record) => (
        <span className=" px-4 py-2 rounded-lg font-bold">
          {record.totalToken}
        </span>
      ),
    },
    {
      title: "Validity In Weeks",
      dataIndex: "validityInWeeks",
      render: (_, record) => (
        <span className=" px-4 py-2 rounded-lg font-bold">
          {record.validityInWeeks}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEDitPackage(record._id)}
            className="text-primary"
          >
            <FaPen />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="text-primary"
          >
            <FaTrash className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <GoBackButton text={"Package Management"} />
        <button
          onClick={handleAddPackage}
          className="px-4 py-2 rounded-md bg-primary text-white"
        >
          Add New Package
        </button>
      </div>
      <div className="mt-10 max-w-screen-xl mx-auto">
        <Table
          columns={columns}
          dataSource={packageData?.data?.result || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={packageData?.data?.meta?.total}
          onChange={handlePageChange}
        ></Pagination>
      </div>
      <Modal
        title="Add New Package"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleAddModalClose}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          name="add-package"
          initialValues={{ remember: false }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="packageType"
            label={<p className=" text-md">Package Type</p>}
            required
          >
            <Select className=" text-md" placeholder="Select Package Type">
              <Select.Option value="NORMAL_CLASS">NORMAL_CLASS</Select.Option>
              <Select.Option value="POPUP_CLASS">POPUP_CLASS</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label={<p className=" text-md">Package Price</p>}
            rules={[
              {
                required: true,
                message: "Price must be at least 1",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Package Price"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="validityInWeeks"
            label={<p className=" text-md">Validity In Weeks</p>}
            rules={[
              {
                required: true,
                message: "Week can not be a negative number.",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Validity In Weeks"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="totalToken"
            label={<p className=" text-md">Total Token</p>}
            rules={[
              {
                required: true,
                message: "Token must be at least 1.",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Total Token"
            ></InputNumber>
          </Form.Item>
          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        form={form}
        title="Edit Token"
        open={isEditModalOpen}
        onOk={handlEditeOk}
        onCancel={handleEditModalClose}
        footer={false}
      >
        <Form
          form={form}
          onFinish={onEditFInish}
          name="add-package"
          layout="vertical"
        >
          <Form.Item
            name="packageType"
            label={<p className=" text-md">Package Type</p>}
          >
            <Select className=" text-md" placeholder="Select Package Type">
              <Select.Option value="NORMAL_CLASS">NORMAL_CLASS</Select.Option>
              <Select.Option value="POPUP_CLASS">POPUP_CLASS</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label={<p className=" text-md">Package Price</p>}
            rules={[
              {
                // required: true,
                message: "Price must be at least 1.",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Package Price"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="validityInWeeks"
            label={<p className=" text-md">Validity In Weeks</p>}
            rules={[
              {
                // required: true,
                message: "Week can not be a negative Number.",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Validity In Weeks"
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="totalToken"
            label={<p className=" text-md">Total Token</p>}
            rules={[
              {
                // required: true,
                message: "Total Token must be at least 1.",
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              className=" text-md"
              placeholder="Type Total Token"
            ></InputNumber>
          </Form.Item>
          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white cursor-pointer">
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePackage;
