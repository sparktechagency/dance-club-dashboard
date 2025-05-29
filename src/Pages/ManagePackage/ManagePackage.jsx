import { useEffect, useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { FaPen, FaTrash } from "react-icons/fa";
import { Form, InputNumber, message, Modal, Select, Table } from "antd";
import {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useGetSInglePackageQuery,
  useUpdatePackageMutation,
} from "../../redux/api/features/packageApi/PackageApi";

const ManagePackage = () => {
  const [form] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  // console.log("packageId", packageId);
  const { data: packageData } = useGetAllPackageQuery();
  const [createPackage] = useCreatePackageMutation();
  const { data: getSInglePackageData } = useGetSInglePackageQuery(packageId);
  const [updatePackage] = useUpdatePackageMutation();
  // const [deletePackage] = useDeletePackageMutation(packageId);

  console.log("getSInglePackageData", getSInglePackageData?.data);

  useEffect(() => {
    form.setFieldValue({
      totalToken: getSInglePackageData?.data?.totalToken,
      price: getSInglePackageData?.data?.price,
      validityInWeeks: getSInglePackageData?.data?.validityInWeeks,
      packageType: getSInglePackageData?.data?.packageType,
    });
  }, [form, getSInglePackageData?.data]);

  const handleAddPackage = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleEDitPackage = (_id) => {
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
        console.log("res", res);
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
    // console.log("data", data);
    updatePackage({ _id: packageId, data })
      .unwrap()
      .then((res) => {
        console.log("res", res);
        message.success("Package updated successfully!");
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (_id) => {
    console.log(_id);
    message.error("Deleted Successfully");
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
    </div>
  );
};

export default ManagePackage;
